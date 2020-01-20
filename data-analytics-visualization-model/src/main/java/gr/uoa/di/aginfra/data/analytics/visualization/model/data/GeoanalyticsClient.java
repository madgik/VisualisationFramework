package gr.uoa.di.aginfra.data.analytics.visualization.model.data;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.ResponseErrorHandler;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.util.HashMap;
import java.util.Map;

public class GeoanalyticsClient {

    private static final int HTTP_CONNECTION_TIMEOUT = 15000;
    private static ObjectMapper mapper = new ObjectMapper();

    private RequestEntity requestEntity;
    private String scope;
    private String token;
    private String username;
    private String initials;
    private String email;
    private String uuid;
    private RestTemplate restTemplate;

    public  GeoanalyticsClient (RequestEntity requestEntity){
        this.requestEntity = requestEntity;

        Map<String, Object> resourceMap = new HashMap<String, Object>();
        // convert JSON string to Map
//        resourceMap = mapper.readValue(requestEntity.getBody(), new TypeReference<Map<String, String>>(){});

    }

    public void prepareConnection(RequestEntity requestEntity, String endpoint) throws IOException {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", requestEntity.getType().getTypeName());

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(endpoint)
                .queryParam("gcube-scope", scope)
                .queryParam("email", email)
                .queryParam("gcube-token", token)
                .queryParam("initials", initials)
                .queryParam("username", username)
                .queryParam("clientType", requestEntity.getType().getTypeName())
                .queryParam("useruuid", uuid);

        restTemplate = getRestTemplate();

//        try {
//            connection.setRequestMethod(httpMethod);
//        } catch (ProtocolException e) {
//            e.printStackTrace();
//        }
    }

    public RestTemplate getRestTemplate() {
        RestTemplate client = new RestTemplate();
        client.setRequestFactory(new SimpleClientHttpRequestFactory() {
             @Override
             protected void prepareConnection(HttpURLConnection connection, String httpMethod) throws IOException {
                 super.prepareConnection(connection, httpMethod);
                 connection.setInstanceFollowRedirects(false);
                 connection.setDoOutput(true);
                 connection.setDoInput(true);
                 connection.setUseCaches(false);
                 connection.setConnectTimeout(HTTP_CONNECTION_TIMEOUT);
             }
        });
        client.setErrorHandler(new ResponseErrorHandler(){
           public boolean hasError(    ClientHttpResponse response) throws IOException {
               return false;
           }
           public void handleError(    ClientHttpResponse response) throws IOException {
           }
        });
        return client;
    }

    public ResponseEntity<?> doRequest(String endpoint){


        return new ResponseEntity(HttpStatus.OK);
    }
}
