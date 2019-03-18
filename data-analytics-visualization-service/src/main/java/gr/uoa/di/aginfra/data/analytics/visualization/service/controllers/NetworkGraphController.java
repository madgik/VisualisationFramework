package gr.uoa.di.aginfra.data.analytics.visualization.service.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataType;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.NetworkGraph;
import gr.uoa.di.aginfra.data.analytics.visualization.model.services.ConfigurationService;
import gr.uoa.di.aginfra.data.analytics.visualization.model.services.NetworkGraphService;
import gr.uoa.di.aginfra.data.analytics.visualization.service.dtos.NetworkGraphDto;
import gr.uoa.di.aginfra.data.analytics.visualization.service.mappers.EntityMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

@Controller
@RequestMapping("/" + GraphQLController.GRAPHQL_BASE_PATH)
public class NetworkGraphController {
    private static final Logger logger = LogManager.getLogger(NetworkGraphController.class);

    protected static final String NETWORK_GRAPH_BASE_PATH = "ngraph";
    private NetworkGraphService networkGraphService;
    private EntityMapper modelMapper;
    private static final ObjectMapper mapper = new ObjectMapper();


    @Autowired
    public NetworkGraphController(NetworkGraphService networkGraphService){
        this.networkGraphService = networkGraphService;
        this.modelMapper = modelMapper;

    }

    @RequestMapping(value = "graph/data", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> importData(@RequestBody String data) {

        return null;
    }

    @RequestMapping(value = "graph/file", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> importDataFile(@RequestParam("file") MultipartFile file,
                                            String name,
                                            Boolean isDataReference) throws Exception {

        NetworkGraphDto networkGraphDto = mapper.readValue(file.getBytes(), NetworkGraphDto.class);


        String id = networkGraphService.storeNetworkGraph(null);

        UriComponents uriComponents = UriComponentsBuilder.newInstance()
                .path(NETWORK_GRAPH_BASE_PATH + "/{id}")
                .buildAndExpand(id);

        return ResponseEntity.created(uriComponents.toUri()).body(id);
    }

    

}
