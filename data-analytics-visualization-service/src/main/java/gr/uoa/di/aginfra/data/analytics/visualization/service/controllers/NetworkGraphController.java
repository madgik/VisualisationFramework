package gr.uoa.di.aginfra.data.analytics.visualization.service.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.NetworkGraph;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.Node;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.SubGraphEntity;
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


    @RequestMapping(value = "neighbors/{subGraphId}/{nodeId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<?> getNeighbors(@PathVariable String subGraphId, @PathVariable String nodeId ) {

        try {
            List<Node> result = networkGraphService.getNeighborNodes(subGraphId, nodeId);
            return new ResponseEntity<>(result, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>( HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "next/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<?> getNextTimeSubgraph(@PathVariable("id") String graphId, @RequestParam("nodes") List<String> nodes, @RequestParam("date") String currentDate ) {

        try {
            Map<String, Object> result = networkGraphService.getNextTimestampSubGraph(graphId, nodes, currentDate);
            return new ResponseEntity<>(result, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>( HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
