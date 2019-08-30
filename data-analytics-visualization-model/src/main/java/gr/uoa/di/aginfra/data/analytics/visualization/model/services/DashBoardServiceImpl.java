package gr.uoa.di.aginfra.data.analytics.visualization.model.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.org.apache.bcel.internal.generic.GETFIELD;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.GeometryType;
import gr.uoa.di.aginfra.data.analytics.visualization.model.helpers.DashBoardMapConverter;
import gr.uoa.di.aginfra.data.analytics.visualization.model.http.HttpClient;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.AxisDataType;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.TimeSeries;
import org.decimal4j.util.DoubleRounder;
import org.geojson.*;
import org.json.JSONObject;
import org.omg.CORBA.TIMEOUT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashBoardServiceImpl implements DashBoardService {

    @Value("${gr.uoa.di.aginfra.agrodatacubeapi.token}")
    private String token;
    @Value("${gr.uoa.di.aginfra.agrodatacubeapi.token.tag}")
    private String TOKEN_TAG;
    private HttpClient httpClient = HttpClient.getInstance();

    @Override
    public FeatureCollection  get(String url, Map<String, Object> parameters, GeometryType geometryType) throws Exception {
        boolean hasMoreData = true;
        Map<String, String> headers = new HashMap<>();
        headers.put(TOKEN_TAG,token);
        Object geoJSON = null;
        geoJSON = parameters.get("geometry");

        if(geoJSON != null){
            parameters.remove("geometry");
            if(geometryType == GeometryType.Polygon)
                parameters.put("geometry", getGeometryPolygon(String.valueOf(geoJSON)));
            else if(geometryType == GeometryType.Point)
                parameters.put("geometry", getGeometryPoint(String.valueOf(geoJSON)));
        }

        int page_offset =  Integer.parseInt(String.valueOf(parameters.get("page_offset")));
        int page_size = Integer.parseInt(String.valueOf(parameters.get("page_size")));
        FeatureCollection featureCollection = null;
        while (hasMoreData) {
            FeatureCollection response = httpClient.getRequest(url, headers, parameters);
            if (response.getFeatures().size() >= page_size){
                page_offset++; // = page_offset + page_size;
                parameters.replace("page_offset", String.valueOf(page_offset));
            }
            else
                hasMoreData = false;
            if(featureCollection == null)
                featureCollection = response;
            else
                featureCollection.getFeatures().addAll(response.getFeatures());
        }

        return featureCollection;
    }

    @Override
    public FeatureCollection getFieldDetails(String url, Map<String, Object> parameters) throws Exception {

        FeatureCollection features = get(url, parameters, GeometryType.Polygon);

       return features;
    }

    @Override
    public TimeSeries getTimeSeries(String yAxisField, FeatureCollection featureCollection) {

        TimeSeries timeSeries = new TimeSeries("All");
        List<Object> xAxisData = new ArrayList<>();
        List<BigDecimal> yAxisData = new ArrayList<>();

        for(Feature feature : featureCollection){
            if(feature.getProperties().get(yAxisField) != null) {
                boolean skip = false;
                if(yAxisField.equals("ndvi_avg") && Double.parseDouble(String.valueOf(feature.getProperties().get(yAxisField))) == 0.0)
                    skip = true;
                if(!skip) {
                    BigDecimal value = BigDecimal.valueOf(Double.parseDouble(String.valueOf(feature.getProperties().get(yAxisField))));
                    yAxisData.add(value);
                    xAxisData.add(feature.getProperties().get("datum"));
                }
            }
        }

        timeSeries.setXAxisData(xAxisData);
        timeSeries.setYAxisData(yAxisData);
        timeSeries.setXAxisDataType(AxisDataType.Date);
        return timeSeries;
    }

    @Override
    public FeatureCollection setColorsToFeatureCollection(FeatureCollection featureCollection) {

        for(Feature feature : featureCollection.getFeatures()){
            feature.getProperties().put("color", DashBoardMapConverter.getColor(feature));
        }
        return featureCollection;
    }

    private String getGeometryPolygon(String geoJSON) throws IOException {

        ObjectMapper mapper = new ObjectMapper();
        Feature feature = (Feature) mapper.readValue(geoJSON, Feature.class);
        Polygon polygon = (Polygon) feature.getGeometry();
        List<List<LngLatAlt>> coordinates = polygon.getCoordinates();
        boolean first = true;
        String polugonParameter = "POLYGON(( ";
        StringBuilder stringBuilder = new StringBuilder(polugonParameter);
        for(List<LngLatAlt> coordinate : coordinates){

            for(LngLatAlt lngLatAlt : coordinate){
                if(!first)
                    stringBuilder.append(", ");
                //   System.out.println( DoubleRounder.round(lngLatAlt.getLongitude(), 1) + " " +  DoubleRounder.round(lngLatAlt.getLatitude(), 1));
                stringBuilder.append( DoubleRounder.round(lngLatAlt.getLongitude(), 17)   + " " + DoubleRounder.round(lngLatAlt.getLatitude(), 17));
                first = false;
            }
        }
        stringBuilder.append("))");
        return stringBuilder.toString();
    }

    private String getGeometryPoint(String geoJSON) throws IOException {

        ObjectMapper mapper = new ObjectMapper();
        Point point = (Point) mapper.readValue(geoJSON, Point.class);
        point.getCoordinates();
        String pointParameter = "POINT( ";
        StringBuilder stringBuilder = new StringBuilder(pointParameter);
        stringBuilder.append( point.getCoordinates().getLongitude()   + " " + point.getCoordinates().getLatitude());

        stringBuilder.append(")");
        return stringBuilder.toString();
    }
}
