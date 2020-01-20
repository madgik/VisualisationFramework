package gr.uoa.di.aginfra.data.analytics.visualization.model.http;

import com.sun.org.apache.xerces.internal.parsers.DOMParser;
import gr.uoa.di.aginfra.data.analytics.visualization.model.helpers.FeatureCollection;
import gr.uoa.di.aginfra.data.analytics.visualization.model.interceptors.RequestLoggingInterceptor;
import gr.uoa.di.aginfra.data.analytics.visualization.model.mapper.XMLMapper;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.ssl.SSLContextBuilder;
import org.springframework.http.*;
import org.springframework.http.client.BufferingClientHttpRequestFactory;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import java.io.IOException;
import java.io.StringReader;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.*;

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

    public FeatureCollection getRequest(String url, Map<String, String> headers, Map<String, Object> parameters){
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
        try {
            ResponseEntity<FeatureCollection> response = restTemplate.exchange(url, HttpMethod.GET, entity, FeatureCollection.class);
            return response.getBody();

        }
        catch(HttpServerErrorException e){
            System.out.println(e.getMessage());
            System.out.println(e.getResponseBodyAsString());
            return new FeatureCollection();
        }

    }

    public static HttpComponentsClientHttpRequestFactory buildCustomRequestFactory(String host, int port) throws CertificateException {
        HttpComponentsClientHttpRequestFactory requestFactory = null;
        SSLConnectionSocketFactory sslSocketFactory = null;
        SSLContext sslContext = null;
        CloseableHttpClient httpClient = null;
        NoopHostnameVerifier hostNameVerifier = new NoopHostnameVerifier();
        HttpClientBuilder clientBuilder = HttpClientBuilder.create();

        try {
            sslContext = new SSLContextBuilder().loadTrustMaterial(null, new TrustAllStrategy()).useProtocol("TLSv1.2").build();
            sslSocketFactory = new SSLConnectionSocketFactory(sslContext, hostNameVerifier);
            clientBuilder.setSSLSocketFactory(sslSocketFactory);

            Registry<ConnectionSocketFactory> registry = RegistryBuilder.<ConnectionSocketFactory>create()
                    .register("HTTPS", sslSocketFactory)
                    .register("HTTP", PlainConnectionSocketFactory.getSocketFactory()).build();

            PoolingHttpClientConnectionManager clientConnectionMgr = new PoolingHttpClientConnectionManager(registry);

            httpClient = HttpClients.custom().setConnectionManager(clientConnectionMgr).build();
            requestFactory = new HttpComponentsClientHttpRequestFactory();
            requestFactory.setHttpClient(httpClient);
        } catch (Exception e) {
            throw new CertificateException("A problem occured when tried to setup SSL configuration for API call", e);
        }

        return requestFactory;
    }

    public Map<String,String>  workspaceGetRequest(String url, Map<String, String> headers, Map<String, Object> parameters) throws IOException, SAXException {

        Map<String,String> results = new HashMap<>();

        HostnameVerifier verifier = new NullHostnameVerifier();
        MySimpleClientHttpRequestFactory factory = new MySimpleClientHttpRequestFactory(verifier);
        RestTemplate restTemplate = null;//new SimpleClientHttpRequestFactory()));
        try {
            restTemplate = new RestTemplate(this.buildCustomRequestFactory("",0));
        } catch (CertificateException e) {
            e.printStackTrace();
        }
        restTemplate.setInterceptors(Collections.singletonList(new RequestLoggingInterceptor()));
        HttpEntity<String> entity = null;
        if(headers != null){
            HttpHeaders httpHeaders = setHttpHeaders(headers);
            entity = new HttpEntity<String>(httpHeaders);

        }

        HttpsURLConnection.setDefaultHostnameVerifier(new HostnameVerifier() {
            public boolean verify(String hostname, SSLSession session) {
                return true;
            }
        });

        if(parameters != null){
            url = setParameters(parameters, url);
        }
        //Execute the method writing your HttpEntity to the request
        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            results.put("body",response.getBody());
            return results;

        }
        catch(HttpServerErrorException e){
            System.out.println(e.getMessage());
            String message = null;
            DOMParser parser = new DOMParser();
            InputSource is = new InputSource(new StringReader(e.getResponseBodyAsString()));

            parser.parse(is);
            Document doc;
            doc = parser.getDocument();

            NodeList root = doc.getChildNodes();
            Node executeResponse = XMLMapper.getNode("ows:ExceptionReport", root);
            List<Node> processOutputs = XMLMapper.getNodes("ows:Exception", executeResponse.getChildNodes() );
            NodeList nodes = processOutputs.get(0).getChildNodes();
            message = XMLMapper.getNodeValue("ows:ExceptionText", nodes);
            results.put("body",null);
            results.put("message",message);

            System.out.println(e.getResponseBodyAsString());
            return results;
        }

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


    private String setParameters(Map<String, Object> parameters, String url){
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url);

        for (Map.Entry<String, Object> parameter : parameters.entrySet()) {
            builder.queryParam(parameter.getKey(), parameter.getValue());
        }
        System.out.println(builder.build().toString());
        return builder.build().toString();
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

class TrustAllStrategy implements TrustStrategy {
    /**
     * Implement strategy to always trust certificates.
     * @see {org.apache.http.ssl.TrustStrategy} TrustStrategy
     */
    @Override
    public boolean isTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {
        return true;
    }

}
