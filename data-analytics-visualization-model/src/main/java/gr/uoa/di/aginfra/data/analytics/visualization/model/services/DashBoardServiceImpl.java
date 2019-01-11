package gr.uoa.di.aginfra.data.analytics.visualization.model.services;

import gr.uoa.di.aginfra.data.analytics.visualization.model.http.HttpClient;
import org.geojson.FeatureCollection;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DashBoardServiceImpl implements DashBoardService {

    @Value("${gr.uoa.di.aginfra.agrodatacubeapi.baseUrl}")
    private String gCubeUrl;
    @Value("${gr.uoa.di.aginfra.agrodatacubeapi.token}")
    private String token;
    private HttpClient httpClient = HttpClient.getInstance();

    @Override
    public FeatureCollection  getDataset(Map<String, String> parameters) throws Exception {

        Map<String, String> headers = new HashMap<>();
        headers.put("token",token);
        FeatureCollection response = httpClient.getRequest(gCubeUrl, headers, parameters);

        return response;
    }
}
