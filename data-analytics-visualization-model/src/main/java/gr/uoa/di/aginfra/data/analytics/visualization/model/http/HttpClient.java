package gr.uoa.di.aginfra.data.analytics.visualization.model.http;

import gr.uoa.di.aginfra.data.analytics.visualization.model.interceptors.RequestLoggingInterceptor;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.geojson.FeatureCollection;
import org.springframework.http.*;
import org.springframework.http.client.BufferingClientHttpRequestFactory;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

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

    public FeatureCollection  getRequest(String url, Map<String, String> headers, Map<String, String> parameters){
        RestTemplate restTemplate = new RestTemplate(new BufferingClientHttpRequestFactory(new SimpleClientHttpRequestFactory()));
        restTemplate.setInterceptors(Collections.singletonList(new RequestLoggingInterceptor()));
        HttpEntity<String> entity = null;
        if(headers != null){
            HttpHeaders httpHeaders = setHttpHeaders(headers);
            entity = new HttpEntity<String>(httpHeaders);

        }

        if(parameters != null){
            url = setParameters(parameters, url);
        }
        //Execute the method writing your HttpEntity to the request
        ResponseEntity<FeatureCollection > response = restTemplate.exchange(url, HttpMethod.GET, entity, FeatureCollection.class);


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


    private String setParameters(Map<String, String> parameters, String url){
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url);

        for (Map.Entry<String, String> parameter : parameters.entrySet()) {
            builder.queryParam(parameter.getKey(), parameter.getValue());
        }

        return builder.toUriString();
    }

    private ClientHttpRequestFactory getClientHttpRequestFactory() {
        int timeout = 45 * 1000;
        RequestConfig config = RequestConfig.custom()
                .setConnectTimeout(timeout)
                .setConnectionRequestTimeout(timeout)
                .setSocketTimeout(timeout)
                .build();
        CloseableHttpClient client = HttpClientBuilder
                .create()
                .setDefaultRequestConfig(config)
                .build();
        return new HttpComponentsClientHttpRequestFactory(client);
    }

}
