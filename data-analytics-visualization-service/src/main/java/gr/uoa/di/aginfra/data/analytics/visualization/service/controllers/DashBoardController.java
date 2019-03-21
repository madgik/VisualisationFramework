package gr.uoa.di.aginfra.data.analytics.visualization.service.controllers;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DropdownProperties;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.GeometryType;
import gr.uoa.di.aginfra.data.analytics.visualization.model.helpers.DashBoardMapConverter;
import gr.uoa.di.aginfra.data.analytics.visualization.model.services.DashBoardService;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.TimeSeries;
import gr.uoa.di.aginfra.data.analytics.visualization.service.mappers.EntityMapper;
import gr.uoa.di.aginfra.data.analytics.visualization.service.vres.VREResolver;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.geojson.Feature;
import org.geojson.FeatureCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
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
    public ResponseEntity<?> get(@RequestBody  Map<String, Object> params) throws Exception {
        logger.debug("Retrieving visualization usage statistics");

        FeatureCollection stats = dashBoardService.get(gCubeUrl, params, GeometryType.Polygon);

        return ResponseEntity.ok(stats);
    }

    @RequestMapping(value = "getCropHistory", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getCropHistory(@RequestBody  Map<String, Object> params) throws Exception {
        logger.debug("Retrieving visualization usage statistics");

        FeatureCollection cropHistory = dashBoardService.get(gCubeUrl, params, GeometryType.Point);
        List<DashBoardMapConverter.CropDetails> cropDetails = DashBoardMapConverter.cropDetailsConvert(cropHistory.getFeatures(), dashBoardService, gCubeUrl, params);

        return ResponseEntity.ok(cropDetails);
    }

    @RequestMapping(value = "field/{id}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getFieldCharacteristics(@PathVariable("id") String fieldId, @RequestBody  Map<String, Object> params) throws Exception {
        logger.debug("Retrieving visualization usage statistics");

        FeatureCollection fieldDetailsFeatureCollection = dashBoardService.getFieldDetails(gCubeUrl + "/" + fieldId, params);
        List<DashBoardMapConverter.FieldDetails> fieldDetails = DashBoardMapConverter.fieldInfoConvert(fieldDetailsFeatureCollection.getFeatures().get(0).getProperties());

        return ResponseEntity.ok(fieldDetails);
    }

    @RequestMapping(value = "field/{id}/{info}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getFieldCharacteristics(@PathVariable("id") String fieldId, @PathVariable("info") String altitude, @RequestBody  Map<String, Object> params) throws Exception {
        logger.debug("Retrieving visualization usage statistics");

        FeatureCollection fieldDetailsFeatureCollection = dashBoardService.getFieldDetails(gCubeUrl + "/" + fieldId +"/" + altitude, params);
        List<DashBoardMapConverter.FieldDetails> fieldDetails = DashBoardMapConverter.fieldInfoConvert(fieldDetailsFeatureCollection.getFeatures().get(0).getProperties());

        if(fieldDetailsFeatureCollection.getFeatures().get(0).getProperties().get("soilid") != null) {
            FeatureCollection soilDetails = dashBoardService.getFieldDetails(gCubeUrlSoil + fieldDetailsFeatureCollection.getFeatures().get(0).getProperties().get("soilid"), params);
            List<DashBoardMapConverter.FieldDetails> soil = DashBoardMapConverter.FieldDetailsConvert(soilDetails.getFeatures().get(0).getProperties());
            fieldDetails.addAll(soil);
        }
        return ResponseEntity.ok(fieldDetails);
    }

    @RequestMapping(value = "soil/{id}/{info}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getSoilCharacteristics(@PathVariable("id") String fieldId, @PathVariable("info") String altitude, @RequestBody  Map<String, Object> params) throws Exception {
        logger.debug("Retrieving visualization usage statistics");

        FeatureCollection fieldDetailsFeatureCollection = dashBoardService.getFieldDetails(gCubeUrl + "/" + fieldId +"/" + altitude, params);
        List<DashBoardMapConverter.SoilDetails> fieldDetails = DashBoardMapConverter.soilDetailsConvert(fieldDetailsFeatureCollection.getFeatures());

        FeatureCollection soilDetails = null;
        for(int i=0; i < fieldDetails.size() ; i++) {
             soilDetails = dashBoardService.getFieldDetails(gCubeUrlSoil + fieldDetails.get(i).getSoilid(), params);
             DashBoardMapConverter.Soil soil = DashBoardMapConverter.soilConvert(soilDetails.getFeatures().get(0));
             fieldDetails.get(i).setSoil(soil);

        }
        soilDetails.hashCode();

        return ResponseEntity.ok(fieldDetails);
    }

    @RequestMapping(value = "soilInfo/{id}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getSoilTypeInfo(@PathVariable("id") String fieldId, @RequestBody  Map<String, Object> params) throws Exception {
        logger.debug("Retrieving visualization usage statistics");

        FeatureCollection fieldDetails = dashBoardService.getFieldDetails(gCubeUrlSoil + fieldId , params);

        return ResponseEntity.ok(fieldDetails);
    }

    @RequestMapping(value = "meteostation/{id}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getNearestMeteoStations(@PathVariable("id") String fieldId, @RequestBody  Map<String, Object> params) throws Exception {
        logger.debug("Retrieving visualization usage statistics");

        FeatureCollection fieldDetails = dashBoardService.getFieldDetails(gCubeUrl + "/" + fieldId +"/" + "meteostations", params);

        if(fieldDetails.getFeatures().isEmpty())
            return ResponseEntity.ok(null);
        List<Object> meteoStationsIds = new ArrayList<>();

        for(Feature feature : fieldDetails.getFeatures()){
            meteoStationsIds.add(feature.getProperties().get("meteostationid"));
        }
        return ResponseEntity.ok(meteoStationsIds);
    }

    @RequestMapping(value = "meteodata/{yAxisColumn}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getMeteoData(@PathVariable("yAxisColumn") String yAxisColumn, @RequestBody  Map<String, Object> params) throws Exception {
        logger.debug("Retrieving visualization usage statistics");

        List<Integer> meteostationIds = (List<Integer>) params.get("meteostation");
        params.remove("meteostation");
        for(int meteoId = meteostationIds.size() -1; meteoId >= 0 ; meteoId--) {

            params.remove("meteostation");
            params.put("meteostation", meteostationIds.get(meteoId));
            FeatureCollection fieldDetails = dashBoardService.get(gCubeUrlMeteoData, params, GeometryType.Polygon);
            List<TimeSeries> timeSeriesList = new ArrayList<>();
            TimeSeries timeSeries = dashBoardService.getTimeSeries(yAxisColumn, fieldDetails);
            timeSeriesList.add(timeSeries);
            if(!timeSeriesList.isEmpty()) {
                if(timeSeries.getXAxisData().size() != 0)
                    return ResponseEntity.ok(timeSeriesList);
            }
        }
        return ResponseEntity.ok("");

    }

    @RequestMapping(value = "meteodata/properties", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getMeteoDataProperties(@RequestBody  Map<String, Object> params) throws Exception {
        logger.debug("Retrieving visualization usage statistics");

        List<Integer> meteostationIds = (List<Integer>) params.get("meteostation");
        params.remove("meteostation");

        for(int meteoId = meteostationIds.size() -1; meteoId >= 0 ; meteoId--) {
          //  Map<String, String> params2 = new HashMap<>();
            params.remove("meteostation");
            params.put("meteostation", meteostationIds.get(meteoId));

            FeatureCollection fieldDetails = dashBoardService.get(gCubeUrlMeteoData, params, GeometryType.Polygon);
            if (!fieldDetails.getFeatures().isEmpty()) {

                List<String> properties = new ArrayList(fieldDetails.getFeatures().get(0).getProperties().keySet());
                List<DropdownProperties> dropdownPropertiesList = new ArrayList<>();
                for (int i = 0, j = 0; i < properties.size(); i++) {
                    if (!properties.get(i).equals("meteostationid") && !properties.get(i).equals("datum")) {
                        dropdownPropertiesList.add(new DropdownProperties(j, properties.get(i), j));
                        j++;

                    }
                }
                if (!dropdownPropertiesList.isEmpty())
                    return ResponseEntity.ok(dropdownPropertiesList);

            }
        }

        return ResponseEntity.ok(new ArrayList<String>());
    }

    @RequestMapping(value = "ndvi/{id}/{yAxisColumn}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getNdviData(@PathVariable("yAxisColumn") String yAxisColumn, @PathVariable("id") String fieldId, @RequestBody  Map<String, Object> params) throws Exception {
        logger.debug("Retrieving visualization usage statistics");

        FeatureCollection fieldDetails = dashBoardService.get(gCubeUrl +"/" + fieldId + "/ndvi"  , params, GeometryType.Polygon);
        List<TimeSeries> timeSeriesList = new ArrayList<>();
        TimeSeries timeSeries = dashBoardService.getTimeSeries(yAxisColumn, fieldDetails);
        timeSeriesList.add(timeSeries);
        return ResponseEntity.ok(timeSeriesList);
    }

    @RequestMapping(value = "ndvi/properties/{id}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getNdviProperties(@PathVariable("id") String fieldId, @RequestBody  Map<String, Object> params) throws Exception {
        logger.debug("Retrieving visualization usage statistics");

        FeatureCollection fieldDetails = dashBoardService.get(gCubeUrl +"/" + fieldId + "/ndvi"  , params, GeometryType.Polygon);
        if(fieldDetails.getFeatures().isEmpty())
            return ResponseEntity.ok(new ArrayList<String>());
        List<String> properties = new ArrayList(fieldDetails.getFeatures().get(0).getProperties().keySet());
        List<DropdownProperties> dropdownPropertiesList = new ArrayList<>();
        for(int i=0,j=0 ; i< properties.size(); i++) {
            if (!properties.get(i).equals("fieldid") && !properties.get(i).equals("datum") && !properties.get(i).equals("id")
                    && !properties.get(i).equals("daynr")) {
                dropdownPropertiesList.add(new DropdownProperties(j, properties.get(i), j));
                j++;
            }
        }

        return ResponseEntity.ok(dropdownPropertiesList);
    }

}
