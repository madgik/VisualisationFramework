package gr.uoa.di.aginfra.data.analytics.visualization.model.services;

import gr.uoa.di.aginfra.data.analytics.visualization.model.http.HttpClient;
import org.geojson.FeatureCollection;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
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
        int page_offset =  Integer.parseInt(parameters.get("page_offset"));
        int page_size = Integer.parseInt(parameters.get("page_size"));
       // List<FeatureCollection> collections = new ArrayList<>();
        FeatureCollection featureCollection = null;
        while (hasMoreData) {
            FeatureCollection response = httpClient.getRequest(url, headers, parameters);
            if (response.getFeatures().size() >= page_size){
                page_offset = page_offset + page_size;
                parameters.replace("page_offset", String.valueOf(page_offset));
            }
            else
                hasMoreData = false;
            if(featureCollection == null){
                featureCollection = response;
            }
            else
            {
                featureCollection.getFeatures().addAll(response.getFeatures());
            }
            //collections.add(response);
        }



        return featureCollection;
    }

    @Override
    public FeatureCollection getFieldDetails(String url, Map<String, String> parameters) throws Exception {

        FeatureCollection features = get(url, parameters);

       return features;
    }
}
