package gr.uoa.di.aginfra.data.analytics.visualization.model.http;

import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.Map;

public class HttpClient extends RestTemplate {

    private static HttpClient instance = null;

    private HttpClient() {
        super();
    }

    public static HttpClient getInstance(){
        if(instance == null){
            synchronized (HttpClient.class) {
                if(instance == null){
                    instance = new HttpClient();
                }
            }
        }
        return instance;
    }

    public String getRequest(String url, Map<String, String> headers){
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<String> entity = null;
        if(headers != null){
            HttpHeaders httpHeaders = setHttpHeaders(headers);
            entity = new HttpEntity<String>(httpHeaders);

        }
        //Execute the method writing your HttpEntity to the request
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        System.out.println(response.getBody());

        return response.getBody();
    }

    private String postRequest(String url){

        return null;
    }

    private HttpHeaders setHttpHeaders(Map<String, String> headers){

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));

        for (Map.Entry<String, String> entry : headers.entrySet()){
            httpHeaders.set(entry.getKey(), entry.getValue());
        }

        return httpHeaders;

    }
}
