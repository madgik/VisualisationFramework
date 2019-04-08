package gr.uoa.di.aginfra.data.analytics.visualization.service.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.HasWeight;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.NetworkGraph;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.Node;
import gr.uoa.di.aginfra.data.analytics.visualization.model.helpers.D3Helper;
import gr.uoa.di.aginfra.data.analytics.visualization.model.services.NetworkGraphService;
import gr.uoa.di.aginfra.data.analytics.visualization.service.dtos.netgraph.NetworkGraphDto;
import gr.uoa.di.aginfra.data.analytics.visualization.service.mappers.EntityMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Controller
@CrossOrigin(exposedHeaders = "Location")
@RequestMapping("/" + NetworkGraphController.NETWORK_GRAPH_BASE_PATH)
public class NetworkGraphController {
    private static final Logger logger = LogManager.getLogger(NetworkGraphController.class);

    protected static final String NETWORK_GRAPH_BASE_PATH = "graph";
    private NetworkGraphService networkGraphService;
    private EntityMapper modelMapper;
    private static final ObjectMapper mapper = new ObjectMapper();


    @Autowired
    public NetworkGraphController(NetworkGraphService networkGraphService,  EntityMapper modelMapper){
        this.networkGraphService = networkGraphService;
        this.modelMapper = modelMapper;

    }


    @RequestMapping(value = "file", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> importDataFile(@RequestParam("file") MultipartFile file,
                                            @RequestParam("name") String graphName
                                           ) throws Exception {

        NetworkGraphDto networkGraphDto = mapper.readValue(file.getBytes(), NetworkGraphDto.class);
        String tenantName= "testTenant";

        NetworkGraph networkGraph = modelMapper.map(networkGraphDto, graphName, tenantName);

        int results= networkGraphService.storeNetworkGraph(networkGraph);

        if (results > 0) {

        }

        UriComponents uriComponents = UriComponentsBuilder.newInstance()
                .path(NETWORK_GRAPH_BASE_PATH + "/{id}")
                .buildAndExpand(networkGraph.getGraphId());

        return ResponseEntity.created(uriComponents.toUri()).body(results);
    }

    @RequestMapping(value = "graphs", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<?> getAvailableGraphs() {

        try {
            List<Map<String, String>> result = networkGraphService.getAllGraphsByTenant("tenant");
            return new ResponseEntity<>(result, HttpStatus.OK);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>( HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(value = "graphs/{subGraphId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<?> getTopNodes(@PathVariable String subGraphId, @RequestParam("number") int number) {

        try {
            List<Node> results = networkGraphService.getTopNodesOfGraph(subGraphId, number);
            Map<String, Object> d3Results = D3Helper.nodesToD3Format(results, true);

            return new ResponseEntity<>(d3Results, HttpStatus.OK);


        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>( HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }


    @RequestMapping(value = "neighbors/{subGraphId}/{nodeId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<?> getNeighbors(@PathVariable String subGraphId, @PathVariable String nodeId ) {

        try {
            List<Node> results = networkGraphService.getNeighborNodes(subGraphId, nodeId);
            Map<String, Object> d3Results = D3Helper.neighborsNodesToD3Format(results,nodeId, false);
            return new ResponseEntity<>(d3Results, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>( HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "next/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<?> getNextTimeSubgraph(@PathVariable("id") String graphId, @RequestParam("nodes[]") String [] nodes, @RequestParam("date") String currentDate ) {

        List<String> nodeList = Arrays.asList(nodes);
        try {
            Map<String, Object> result = networkGraphService.getNextTimestampSubGraph(graphId, nodeList, currentDate);
            return new ResponseEntity<>(result, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>( HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @RequestMapping(value = "dates/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<?> getCurrentTimeSubgraph(@PathVariable("id") String graphId, @RequestParam("nodes[]") String[] nodes, @RequestParam("date") String currentDate ) {

        try {
            List<String> nodeList = Arrays.asList(nodes);
            List<HasWeight> result = networkGraphService.getCurrentTimestampGraph(graphId, nodeList, currentDate);
            Map<String, Object> d3Results = D3Helper.hasWeightToD3Format(result, graphId, networkGraphService);
//            List<Node> result = networkGraphService.getCurrentTimestampSubGraph(graphId, nodeList, currentDate);
//            System.out.println("RESULTS:"+result.size());
//            Map<String, Object> d3Results = D3Helper.nodesToD3Format(result, false);
//            System.out.println(d3Results.get("nodes"));
//            System.out.println(d3Results.get("links"));

            return new ResponseEntity<>(d3Results, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>( HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "timestamps/{graphId}")
    ResponseEntity<?> getTimestamps(@PathVariable("graphId") String graphId) {

        List<String> results = null;
        try {
            results = networkGraphService.getAllTimestamps(graphId);
            results = D3Helper.datesToDateStrings(results);
            return new ResponseEntity<>(results, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>( HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }
}
