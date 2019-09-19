package gr.uoa.di.aginfra.data.analytics.visualization.service.controllers;

import com.sun.org.apache.xerces.internal.parsers.DOMParser;
import gr.uoa.di.aginfra.data.analytics.visualization.model.data.CSVImporter;
import gr.uoa.di.aginfra.data.analytics.visualization.model.data.RawDataImporter;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.*;
import gr.uoa.di.aginfra.data.analytics.visualization.model.helpers.CSVReader;
import gr.uoa.di.aginfra.data.analytics.visualization.model.helpers.DashBoardMapConverter;
import gr.uoa.di.aginfra.data.analytics.visualization.model.http.HttpClient;
import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.DataDocumentRepository;
import gr.uoa.di.aginfra.data.analytics.visualization.model.services.DashBoardService;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.TimeSeries;
import gr.uoa.di.aginfra.data.analytics.visualization.service.mappers.EntityMapper;
import gr.uoa.di.aginfra.data.analytics.visualization.service.mappers.XMLMapper;
import gr.uoa.di.aginfra.data.analytics.visualization.service.vres.VREResolver;
import mil.nga.sf.geojson.FeatureConverter;
import net.opengis.wps10.OutputDataType;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.geojson.Feature;
import org.geojson.FeatureCollection;
import org.geotools.data.wps.WebProcessingService;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.w3c.dom.Document;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathFactory;
import java.io.StringReader;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Controller
@CrossOrigin
@RequestMapping("/" + DashBoardController.DASHBOARD_BASE_PATH)
public class DashBoardController {

    @Value("${gr.uoa.di.aginfra.agrodatacubeapi.baseUrl.fields}")
    private String gCubeUrl;

    @Value("${gr.uoa.di.aginfra.agrodatacubeapi.baseUrl.soiltypes}")
    private String gCubeUrlSoil;

    @Value("${gr.uoa.di.aginfra.agrodatacubeapi.baseUrl.soiltypesV1}")
    private String gCubeUrlSoilV1;

    @Value("${gr.uoa.di.aginfra.agrodatacubeapi.baseUrl.meteodata}")
    private String gCubeUrlMeteoData;

    @Value("${gr.uoa.di.aginfra.dataminer_url}")
    private String url;

    private static final Logger logger = LogManager.getLogger(DashBoardController.class);

    protected static final String DASHBOARD_BASE_PATH = "dashboard";

    private DashBoardService dashBoardService;

    private EntityMapper modelMapper;

    private VREResolver vreResolver;

    private HttpClient httpClient = HttpClient.getInstance();

    private  DataDocumentRepository dataDocumentDAO;
    @Autowired
    public DashBoardController(DashBoardService dashBoardService,
                               EntityMapper modelMapper,
                               DataDocumentRepository dataDocumentDAO,
                               VREResolver vreResolver) {
        this.dashBoardService = dashBoardService;
        this.modelMapper = modelMapper;
        this.dataDocumentDAO = dataDocumentDAO;
        this.vreResolver = vreResolver;
    }


    @RequestMapping(value = "get", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> get(@RequestBody  Map<String, Object> params) throws Exception {
        logger.debug("Retrieving visualization usage statistics");

        FeatureCollection stats = dashBoardService.get(gCubeUrl, params, GeometryType.Polygon);
        FeatureCollection features = dashBoardService.setColorsToFeatureCollection(stats);
        return ResponseEntity.ok(features);
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
        List<DashBoardMapConverter.SoilDetails> fieldDetails = DashBoardMapConverter.soilDetailsConvert(fieldId, fieldDetailsFeatureCollection.getFeatures());

        FeatureCollection soilDetails = null;
        for(int i=0; i < fieldDetails.size() ; i++) {
            soilDetails = dashBoardService.getFieldDetails(gCubeUrlSoilV1 + fieldDetails.get(i).getSoilid(), params);
            DashBoardMapConverter.Soil soil = DashBoardMapConverter.soilConvert(soilDetails.getFeatures().get(0));
            fieldDetails.get(i).setSoil(soil);

        }
      //  soilDetails.hashCode();

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
            if (!properties.get(i).equals("DATE") && !properties.get(i).equals("datum") && !properties.get(i).equals("id")
                    && !properties.get(i).equals("daynr")) {
                dropdownPropertiesList.add(new DropdownProperties(j, properties.get(i), j));
                j++;
            }
        }

        return ResponseEntity.ok(dropdownPropertiesList);
    }

    @RequestMapping(value = "getWorkspaceFile", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getWorkspaceFile(@RequestParam  String url) throws Exception {
        logger.debug("Retrieving visualization usage statistics");
        JSONObject selectedLayer = null;
        String file = httpClient.workspaceGetRequest(url, null, null);
        JSONObject jsnobject = new JSONObject(file);
        if(!jsnobject.has("data") || !jsnobject.has("visualization") || !jsnobject.has("visualization")
                || !jsnobject.has("data")){
            return ResponseEntity.ok("");
        }
        JSONObject data = jsnobject.getJSONObject("data");
        JSONObject visualization = jsnobject.getJSONObject("visualization");
        if(visualization.has("selectedLayer")) {
            Object selectedLayerObject = visualization.get("selectedLayer");
            if(selectedLayerObject instanceof  String)
                return ResponseEntity.ok(jsnobject.toString());
            else
                selectedLayer = visualization.getJSONObject("selectedLayer");

        }
        else
            return ResponseEntity.ok(jsnobject.toString());

        JSONObject properties = selectedLayer.getJSONObject("properties");


        int fieldid = properties.getInt("fieldid");

        JSONObject map = data.getJSONObject("map");
        String json = map.getString("json");



        //JSONObject featureCollection = new JSONObject(json);

        mil.nga.sf.geojson.FeatureCollection featureCollection = FeatureConverter.toFeatureCollection(json);
        for(mil.nga.sf.geojson.Feature feature : featureCollection){
            int fieldid1 = (int) feature.getProperties().get("fieldid");
            if(fieldid1 == fieldid){
                String color = String.valueOf(feature.getProperties().get("color"));
                feature.getProperties().put("previousColor", color);
                feature.getProperties().put("color", "#ffaa33");
                System.out.println(feature.getProperties().toString());

            }
        }
        jsnobject.getJSONObject("data").getJSONObject("map").remove("json");
        String newJson = FeatureConverter.toStringValue(featureCollection);
        jsnobject.getJSONObject("data").getJSONObject("map").put("json", newJson);
        // FeatureCollection f = (FeatureCollection) json;
        System.out.println(jsnobject.toString());
        return ResponseEntity.ok(jsnobject.toString());
    }

    @RequestMapping(value = "getDataMinerData", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getDataMinerData(@RequestBody  Map<String, Object> params) throws Exception {
        logger.debug("Retrieving visualization usage statistics");


        JSONObject selectedLayer = null;
        String file = httpClient.workspaceGetRequest(url, null, params);
        if( file == null)
            return ResponseEntity.ok(null);

        DOMParser parser = new DOMParser();
        InputSource is = new InputSource(new StringReader(file));

        parser.parse(is);
        Document doc = parser.getDocument();

        NodeList root = doc.getChildNodes();
        Node executeResponse = XMLMapper.getNode("wps:ExecuteResponse", root);
        Node processOutputs = XMLMapper.getNode("wps:ProcessOutputs", executeResponse.getChildNodes() );
        Node output = XMLMapper.getNode("wps:Output", processOutputs.getChildNodes() );
        Node data = XMLMapper.getNode("wps:Data", output.getChildNodes() );
        Node complexData = XMLMapper.getNode( "wps:ComplexData", data.getChildNodes() );
        Node featureCollection = XMLMapper.getNode("ogr:FeatureCollection", complexData.getChildNodes() );
        Node featureMember = XMLMapper.getNode("gml:featureMember", featureCollection.getChildNodes() );
        Node result = XMLMapper.getNode("ogr:Result", featureMember.getChildNodes() );
        List<Node> nodes1 = XMLMapper.getNodes("ogr:Result", featureMember.getChildNodes() );

        String execType = XMLMapper.getNodeAttr("type", result);
        System.out.println(execType);
        NodeList nodes = nodes1.get(1).getChildNodes();
        String link = XMLMapper.getNodeValue("d4science:Data", nodes);
        String desc = XMLMapper.getNodeValue("d4science:Description", nodes);

        DataDocument dataDocument = new DataDocument();
        String dataFromLink = httpClient.workspaceGetRequest(link, null, null);
        String[] units = new String[0];
        String[] lines = dataFromLink.split("\n");
        for(int i=0;i<lines.length;i++){
            if(lines[i].startsWith("#")){
                if(lines[i].contains("Column units")){

                    String header = lines[i];
                    units = header.split(";");
                    for(String s : units){
                        System.out.println(s);
                    }
                }

                lines[i]="";
            }
        }

        String[] finalCSV = Arrays.stream(lines)
                .filter(value ->
                        value != null && value.length() > 0
                )
                .toArray(size -> new String[size]);

        String[][] allData = CSVReader.readCSV(finalCSV, ";");
        String[] header = finalCSV[0].split(";");
        List<String> properties = Arrays.asList(header);
        List<DropdownProperties> dropdownPropertiesList = new ArrayList<>();
        for(int i=0,j=0 ; i< properties.size(); i++) {
            if (!properties.get(i).equals("DATE")) {
                dropdownPropertiesList.add(new DropdownProperties(j, properties.get(i), j, units[i]));
                j++;
            }
        }

        DataMinerResults dataMinerResults = new DataMinerResults(dropdownPropertiesList, allData);

        System.out.println(link);


        return ResponseEntity.ok(dataMinerResults);
    }

}