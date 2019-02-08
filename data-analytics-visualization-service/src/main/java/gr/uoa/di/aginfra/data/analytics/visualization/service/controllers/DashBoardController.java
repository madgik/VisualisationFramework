package gr.uoa.di.aginfra.data.analytics.visualization.service.controllers;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.GeometryType;
import gr.uoa.di.aginfra.data.analytics.visualization.model.helpers.DashBoardMapConverter;
import gr.uoa.di.aginfra.data.analytics.visualization.model.services.DashBoardService;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.TimeSeries;
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

import java.util.ArrayList;
import java.util.List;
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

        FeatureCollection stats = dashBoardService.get(gCubeUrl, params, GeometryType.Polygon);

        return ResponseEntity.ok(stats);
    }

    @RequestMapping(value = "getCropHistory", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getCropHistory(@RequestBody  Map<String, String> params) throws Exception {
        logger.debug("Retrieving visualization usage statistics");

        FeatureCollection cropHistory = dashBoardService.get(gCubeUrl, params, GeometryType.Point);
        List<DashBoardMapConverter.CropDetails> cropDetails = DashBoardMapConverter.cropDetailsConvert(cropHistory.getFeatures());

        return ResponseEntity.ok(cropDetails);
    }

    @RequestMapping(value = "field/{id}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getFieldCharacteristics(@PathVariable("id") String fieldId, @RequestBody  Map<String, String> params) throws Exception {
        logger.debug("Retrieving visualization usage statistics");

        FeatureCollection fieldDetailsFeatureCollection = dashBoardService.getFieldDetails(gCubeUrl + "/" + fieldId, params);
        List<DashBoardMapConverter.FieldDetails> fieldDetails = DashBoardMapConverter.fieldInfoConvert(fieldDetailsFeatureCollection.getFeatures().get(0).getProperties());

        return ResponseEntity.ok(fieldDetails);
    }

    @RequestMapping(value = "field/{id}/{info}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getFieldCharacteristics(@PathVariable("id") String fieldId, @PathVariable("info") String altitude, @RequestBody  Map<String, String> params) throws Exception {
        logger.debug("Retrieving visualization usage statistics");

        FeatureCollection fieldDetailsFeatureCollection = dashBoardService.getFieldDetails(gCubeUrl + "/" + fieldId +"/" + altitude, params);
        List<DashBoardMapConverter.FieldDetails> fieldDetails = DashBoardMapConverter.fieldInfoConvert(fieldDetailsFeatureCollection.getFeatures().get(0).getProperties());

        if(fieldDetailsFeatureCollection.getFeatures().get(0).getProperties().get("soilid") != null) {
            FeatureCollection soilDetails = dashBoardService.getFieldDetails(gCubeUrlSoil + fieldDetailsFeatureCollection.getFeatures().get(0).getProperties().get("soilid"), params);
            List<DashBoardMapConverter.FieldDetails> soil = DashBoardMapConverter.soilDetailsConvert(soilDetails.getFeatures().get(0).getProperties());
            fieldDetails.addAll(soil);
        }
        return ResponseEntity.ok(fieldDetails);
    }

    @RequestMapping(value = "soilInfo/{id}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getSoilTypeInfo(@PathVariable("id") String fieldId, @RequestBody  Map<String, String> params) throws Exception {
        logger.debug("Retrieving visualization usage statistics");

        FeatureCollection fieldDetails = dashBoardService.getFieldDetails(gCubeUrlSoil + fieldId , params);

        return ResponseEntity.ok(fieldDetails);
    }

    @RequestMapping(value = "meteostation/{id}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getNearestMeteoStations(@PathVariable("id") String fieldId, @RequestBody  Map<String, String> params) throws Exception {
        logger.debug("Retrieving visualization usage statistics");

        FeatureCollection fieldDetails = dashBoardService.getFieldDetails(gCubeUrl + "/" + fieldId +"/" + "meteostations", params);

        if(fieldDetails.getFeatures().isEmpty())
            return ResponseEntity.ok(null);
        return ResponseEntity.ok(fieldDetails.getFeatures().get(fieldDetails.getFeatures().size() -1).getProperties().get("meteostationid"));
    }

    @RequestMapping(value = "meteodata/{yAxisColumn}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getMeteoData(@PathVariable("yAxisColumn") String yAxisColumn, @RequestBody  Map<String, String> params) throws Exception {
        logger.debug("Retrieving visualization usage statistics");

        FeatureCollection fieldDetails = dashBoardService.get(gCubeUrlMeteoData  , params, GeometryType.Polygon);
        List<TimeSeries> timeSeriesList = new ArrayList<>();
        TimeSeries timeSeries = dashBoardService.getTimeSeries(yAxisColumn, fieldDetails);
        timeSeriesList.add(timeSeries);
        return ResponseEntity.ok(timeSeriesList);
    }

    @RequestMapping(value = "ndvi/{id}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getNdviData(@PathVariable("id") String fieldId, @RequestBody  Map<String, String> params) throws Exception {
        logger.debug("Retrieving visualization usage statistics");

        FeatureCollection fieldDetails = dashBoardService.get(gCubeUrl +"/" + fieldId + "/ndvi"  , params, GeometryType.Polygon);

        return ResponseEntity.ok(fieldDetails);
    }

}
