package gr.uoa.di.aginfra.data.analytics.visualization.model.interceptors;

import com.google.common.io.ByteStreams;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;

import java.io.IOException;
import java.nio.charset.Charset;

public class RequestLoggingInterceptor implements ClientHttpRequestInterceptor {

    private static final Logger logger = LogManager.getLogger(RequestLoggingInterceptor.class);

    @Override
    public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution) throws IOException {
        ClientHttpResponse response = execution.execute(request, body);

        logger.info("request method: {}, request URI: {}, request headers: {}, request body: {}, response status code: {}, response headers: {}, response body: {}",
                request.getMethod(),
                request.getURI(),
                request.getHeaders(),
                new String(body, Charset.forName("UTF-8")),
                response.getStatusCode(),
                response.getHeaders(),
                //new String(ByteStreams.toByteArray(response.getBody()),
                        Charset.forName("UTF-8"));

        return response;
    }
}

