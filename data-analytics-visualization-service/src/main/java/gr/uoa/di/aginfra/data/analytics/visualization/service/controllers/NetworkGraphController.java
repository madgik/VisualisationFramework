package gr.uoa.di.aginfra.data.analytics.visualization.service.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.graph.Network;
import gr.uoa.di.aginfra.data.analytics.visualization.model.config.NetworkGraphConfig;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.HasWeight;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.NetworkGraph;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.Node;
import gr.uoa.di.aginfra.data.analytics.visualization.model.helpers.GraphVisualizationHelper;
import gr.uoa.di.aginfra.data.analytics.visualization.model.services.NetworkGraphService;
import gr.uoa.di.aginfra.data.analytics.visualization.service.dtos.netgraph.NetworkGraphDto;
import gr.uoa.di.aginfra.data.analytics.visualization.service.dtos.netgraph.PropertyValuesDto;
import gr.uoa.di.aginfra.data.analytics.visualization.service.mappers.EntityMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.async.DeferredResult;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.ForkJoinPool;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Controller
@CrossOrigin(exposedHeaders = "Location")
@RequestMapping("/" + NetworkGraphController.NETWORK_GRAPH_BASE_PATH)
public class NetworkGraphController {
	private static final Logger logger = LogManager.getLogger(NetworkGraphController.class);

	protected static final String NETWORK_GRAPH_BASE_PATH = "graph";
	private NetworkGraphService networkGraphService;
	private EntityMapper modelMapper;
	private static final ObjectMapper mapper = new ObjectMapper();
	private NetworkGraphConfig networkGraphConfig;

	@Autowired
	public NetworkGraphController(NetworkGraphService networkGraphService, EntityMapper modelMapper, NetworkGraphConfig networkGraphConfig) {
		this.networkGraphService = networkGraphService;
		this.modelMapper = modelMapper;
		this.networkGraphConfig = networkGraphConfig;
	}


	@RequestMapping(value = "file", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> importDataFile(@RequestParam("file") MultipartFile file,
											@RequestParam("name") String graphName,
											@RequestParam("privacy") String privacy,
											@RequestParam("username") String username
	) throws Exception {

		DeferredResult<ResponseEntity<?>> output = new DeferredResult<>();
		ForkJoinPool.commonPool().submit(() -> {
			try {

				NetworkGraphDto networkGraphDto = mapper.readValue(file.getBytes(), NetworkGraphDto.class);

				NetworkGraph networkGraph = modelMapper.map(networkGraphDto, graphName, username, privacy);

				int results = 0;

				results = networkGraphService.storeNetworkGraph(networkGraph);

				if (results > 0) {

				}
				System.out.println("Im here but after");

				UriComponents uriComponents = UriComponentsBuilder.newInstance()
						.path(NETWORK_GRAPH_BASE_PATH + "/{id}")
						.buildAndExpand(networkGraph.getGraphId());
			} catch (Exception e) {
				e.printStackTrace();
			}

		});
		System.out.println("servlet thread freed");

		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequestMapping(value = "graphs", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	ResponseEntity<?> getAvailableGraphs() {

		try {
			List<Map<String, String>> result = networkGraphService.getAllGraphsByTenant("tenant");
			return new ResponseEntity<>(result, HttpStatus.OK);

		} catch (IOException e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping(value = "graphs/{subGraphId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	ResponseEntity<?> getTopNodes(@PathVariable String subGraphId, @RequestParam("number") int number) {

		try {
			List<Node> results = networkGraphService.getTopNodesOfGraph(subGraphId, number);
			Map<String, Object> d3Results = GraphVisualizationHelper.nodesToD3Format(results, true);
			System.out.println(d3Results);
			return new ResponseEntity<>(d3Results, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


	@RequestMapping(value = "neighbors/{subGraphId}/{nodeId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	ResponseEntity<?> getNeighbors(@PathVariable String subGraphId, @PathVariable String nodeId) {

		try {
			List<Node> results = networkGraphService.getNeighborNodes(subGraphId, nodeId);
			Map<String, Object> d3Results = GraphVisualizationHelper.neighborsNodesToD3Format(results, nodeId, false);
			return new ResponseEntity<>(d3Results, HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping(value = "next/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	ResponseEntity<?> getNextTimeSubgraph(@PathVariable("id") String graphId, @RequestParam("nodes[]") String[] nodes, @RequestParam("date") String currentDate) {

		List<String> nodeList = Arrays.asList(nodes);
		try {
			Map<String, Object> result = networkGraphService.getNextTimestampSubGraph(graphId, nodeList, currentDate);
			return new ResponseEntity<>(result, HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


	@RequestMapping(value = "dates/{id}", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	ResponseEntity<?> getCurrentTimeSubgraph(@PathVariable("id") String graphId, @RequestBody Map<String, Object> request){ //@RequestParam("nodes") String[] nodes,@RequestParam("date") String date

		try {
			List<String> nodeList = Arrays.asList(mapper.convertValue(request.get("nodes"), new TypeReference<String[]>(){}));
			List<HasWeight> result = networkGraphService.getCurrentTimestampGraph(graphId, nodeList, request.get("date").toString());
			Map<String, Object> d3Results = GraphVisualizationHelper.hasWeightToD3Format(result, graphId, networkGraphService, networkGraphConfig);
//            System.out.println(d3Results.get("nodes"));
//            System.out.println(d3Results.get("links"));
			return new ResponseEntity<>(d3Results, HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping(value = "timestamps/{graphId}", method = RequestMethod.GET)
	ResponseEntity<?> getTimestamps(@PathVariable("graphId") String graphId) {

		List<String> results = null;
		try {
			results = networkGraphService.getAllTimestamps(graphId);
			results = GraphVisualizationHelper.datesToDateStrings(results);
			return new ResponseEntity<>(results, HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

		}

	}

	@RequestMapping(value = "filtered/{graphId}", method = RequestMethod.GET)
	ResponseEntity<?> getFilteredGraph(@PathVariable("graphId") String graphId, @RequestParam Map<String, String> allRequestParams) {

		try {
			List<Node> result = networkGraphService.getFilteredGraph(graphId, allRequestParams);
			Map<String, Object> d3Results = GraphVisualizationHelper.nodesToD3Format(result, true);
			System.out.println(d3Results.get("nodes"));
			System.out.println(d3Results.get("links"));
			return new ResponseEntity<>(d3Results, HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping(value = "properties/{graphId}")
	ResponseEntity<?> getPropertyValues(@PathVariable("graphId") String graphId, @RequestParam("property")String property) {
		List<String> result = networkGraphService.getPropertyValues(property, graphId);

		List<PropertyValuesDto> resultProperties = IntStream.range(0, result.size())
				.mapToObj(i -> new PropertyValuesDto(i, result.get(i), result.get(i)))
				.collect(Collectors.toList());

		return new ResponseEntity<>(resultProperties, HttpStatus.OK);
	}


}
