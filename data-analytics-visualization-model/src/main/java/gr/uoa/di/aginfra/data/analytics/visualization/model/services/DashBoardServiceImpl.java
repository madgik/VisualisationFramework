package gr.uoa.di.aginfra.data.analytics.visualization.model.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import gr.uoa.di.aginfra.data.analytics.visualization.model.http.HttpClient;
import org.decimal4j.util.DoubleRounder;
import org.geojson.Feature;
import org.geojson.FeatureCollection;
import org.geojson.LngLatAlt;
import org.geojson.Polygon;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
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
    public FeatureCollection  get(String url, Map<String, String> parameters) throws Exception {
        boolean hasMoreData = true;
        Map<String, String> headers = new HashMap<>();
        headers.put(TOKEN_TAG,token);
        String geoJSON = null;
        geoJSON = parameters.get("geometry");

        if(geoJSON != null){
            parameters.remove("geometry");
            parameters.put("geometry", getGeometryPolygon(geoJSON));
        }

        int page_offset =  Integer.parseInt(parameters.get("page_offset"));
        int page_size = Integer.parseInt(parameters.get("page_size"));
        FeatureCollection featureCollection = null;
        while (hasMoreData) {
            FeatureCollection response = httpClient.getRequest(url, headers, parameters);
            if (response.getFeatures().size() >= page_size){
                page_offset = page_offset + page_size;
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
    public FeatureCollection getFieldDetails(String url, Map<String, String> parameters) throws Exception {

        FeatureCollection features = get(url, parameters);

       return features;
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
                stringBuilder.append( DoubleRounder.round(lngLatAlt.getLongitude(), 1)   + " " + DoubleRounder.round(lngLatAlt.getLatitude(), 1));
                first = false;
            }
        }
        stringBuilder.append("))");
        return stringBuilder.toString();
    }
}
