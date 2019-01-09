package gr.uoa.di.aginfra.data.analytics.visualization.model.services;

import gr.uoa.di.aginfra.data.analytics.visualization.model.http.HttpClient;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DashBoardServiceImpl implements DashBoardService {

    private String gCubeUrl = "http://agrodatacube.wur.nl/api/v1/rest/fields/1/";
    private String token = "";
    private HttpClient httpClient = HttpClient.getInstance();

    @Override
    public String getDataset(String token) throws Exception {

        Map<String, String> headers = new HashMap<>();
        headers.put("token",token);
        String response = httpClient.getRequest(gCubeUrl, headers);

        return response;
    }
}
