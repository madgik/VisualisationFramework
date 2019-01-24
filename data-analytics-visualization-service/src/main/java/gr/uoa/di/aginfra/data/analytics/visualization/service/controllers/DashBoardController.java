package gr.uoa.di.aginfra.data.analytics.visualization.service.controllers;

import gr.uoa.di.aginfra.data.analytics.visualization.model.services.DashBoardService;
import gr.uoa.di.aginfra.data.analytics.visualization.service.mappers.EntityMapper;
import gr.uoa.di.aginfra.data.analytics.visualization.service.vres.VREResolver;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.geojson.FeatureCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@CrossOrigin(exposedHeaders = "Location")
@RequestMapping("/" + DashBoardController.DASHBOARD_BASE_PATH)
public class DashBoardController {

    @Value("${gr.uoa.di.aginfra.agrodatacubeapi.baseUrl.fields}")
    private String gCubeUrl;

    @Value("${gr.uoa.di.aginfra.agrodatacubeapi.baseUrl.soiltypes}")
    private String gCubeUrlSoil;

    @Value("${gr.uoa.di.aginfra.agrodatacubeapi.baseUrl.meteodata}")
    private String gCubeUrlMeteoData;

    private static final Logger logger = LogManager.getLogger(DashBoardController.class);

    protected static final String DASHBOARD_BASE_PATH = "dashboard";

    private DashBoardService dashBoardService;

    private EntityMapper modelMapper;

    private VREResolver vreResolver;


    @Autowired
    public DashBoardController(DashBoardService dashBoardService,
                                   EntityMapper modelMapper,
                                   VREResolver vreResolver) {
        this.dashBoardService = dashBoardService;
        this.modelMapper = modelMapper;
        this.vreResolver = vreResolver;
    }


    @RequestMapping(value = "get", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> get(@RequestBody  Map<String, String> params) throws Exception {
        logger.debug("Retrieving visualization usage statistics");

        FeatureCollection stats = dashBoardService.get(gCubeUrl, params);

        return ResponseEntity.ok(stats);
    }

    @RequestMapping(value = "field/{id}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getFieldCharacteristics(@PathVariable("id") String fieldId, @RequestBody  Map<String, String> params) throws Exception {
        logger.debug("Retrieving visualization usage statistics");

        FeatureCollection fieldDetails = dashBoardService.getFieldDetails(gCubeUrl + "/" + fieldId, params);

        return ResponseEntity.ok(fieldDetails);
    }

    @RequestMapping(value = "field/{id}/{info}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getFieldCharacteristics(@PathVariable("id") String fieldId, @PathVariable("info") String altitude, @RequestBody  Map<String, String> params) throws Exception {
        logger.debug("Retrieving visualization usage statistics");

        FeatureCollection fieldDetails = dashBoardService.getFieldDetails(gCubeUrl + "/" + fieldId +"/" + altitude, params);

        return ResponseEntity.ok(fieldDetails);
    }

    @RequestMapping(value = "soilInfo/{id}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getSoilTypeInfo(@PathVariable("id") String fieldId, @RequestBody  Map<String, String> params) throws Exception {
        logger.debug("Retrieving visualization usage statistics");

        FeatureCollection fieldDetails = dashBoardService.getFieldDetails(gCubeUrlSoil + fieldId , params);

        return ResponseEntity.ok(fieldDetails);
    }

    @RequestMapping(value = "meteostations/{id}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getNearestMeteoStations(@PathVariable("id") String fieldId, @RequestBody  Map<String, String> params) throws Exception {
        logger.debug("Retrieving visualization usage statistics");

        FeatureCollection fieldDetails = dashBoardService.getFieldDetails(gCubeUrl + "/" + fieldId +"/" + "meteostations", params);

        return ResponseEntity.ok(fieldDetails);
    }

    @RequestMapping(value = "meteodata", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getMeteoData( @RequestBody  Map<String, String> params) throws Exception {
        logger.debug("Retrieving visualization usage statistics");

        FeatureCollection fieldDetails = dashBoardService.get(gCubeUrlMeteoData  , params);

        return ResponseEntity.ok(fieldDetails);
    }

    @RequestMapping(value = "ndvi/{id}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getMeteoData(@PathVariable("id") String fieldId, @RequestBody  Map<String, String> params) throws Exception {
        logger.debug("Retrieving visualization usage statistics");

        FeatureCollection fieldDetails = dashBoardService.get(gCubeUrl +"/" + fieldId + "/ndvi"  , params);

        return ResponseEntity.ok(fieldDetails);
    }

}