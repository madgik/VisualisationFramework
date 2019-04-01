package gr.uoa.di.aginfra.data.analytics.visualization.model.repositories;

import com.google.common.base.Charsets;
import com.google.common.io.ByteStreams;
import com.google.common.io.CharStreams;
import gr.uoa.di.aginfra.data.analytics.visualization.model.data.GeoanalyticsClient;
import gr.uoa.di.aginfra.data.analytics.visualization.model.endpoint.EndpointManager;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.*;
import java.util.*;

import gr.uoa.di.aginfra.data.analytics.visualization.model.exceptions.ServiceDiscoveryException;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.ServiceProfile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import static gr.uoa.di.aginfra.data.analytics.visualization.model.services.ServiceDiscovery.discoverServiceEndpoints;

@Component
public class GeoanalyticsEndpointRepository implements EndpointRepository {

    private static Logger logger = LoggerFactory.getLogger(GeoanalyticsEndpointRepository.class);

    private ServiceProfile geoanalyticsProfile;
    private EndpointManager endpointManager;
    private RestTemplate restTemplate;
    private String user;
    private String pass;
    String scope = "/gcube/devNext/NextNext";

    @Value("${gr.uoa.di.aginfra.data.analytics.visualization.model.back-end-url}")
    private String staticEndpoint;

    GeoanalyticsClient geoanalyticsClient;

    @Autowired
    public GeoanalyticsEndpointRepository() {
        endpointManager = new EndpointManager();
        restTemplate = new RestTemplate();
        geoanalyticsProfile = new ServiceProfile();
        geoanalyticsProfile.setServiceClass("geonalytics");
        geoanalyticsProfile.setServiceName("geoanalytics-main-service");
        geoanalyticsProfile.setPathEndsWith("/");

        endpointManager = new EndpointManager();

        Authenticator.setDefault(new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(user, pass.toCharArray());
            }
        });

    }


    @Override
    public ResponseEntity<?> getEndpointResource(RequestEntity requestEntity) {
        try {

            geoanalyticsClient = new GeoanalyticsClient(requestEntity);

            List<String> endpoints = endpointManager.getServiceEndpoints(scope, geoanalyticsProfile);

            for (String endpoint : endpoints) {
                logger.info("Trying to contact endpoint: " + endpoint);

                try {

                    geoanalyticsClient.prepareConnection(requestEntity,endpoint);
                    ResponseEntity<?> response = geoanalyticsClient.doRequest(endpoint);

                    if (response.getStatusCode().equals(HttpStatus.OK)) {
                        break;
                    }
                } catch (Exception e) {
                    endpointManager.removeServiceEndpoint(scope, geoanalyticsProfile, endpoint);
                    logger.warn("Cannot reach endpoint", e);
                }
            }
        } catch (ServiceDiscoveryException e) {
            logger.error(e.getMessage(), e);
            ResponseEntity<?> response = geoanalyticsClient.doRequest(staticEndpoint);

            return response;
        }
        return null;
    }

    @Override
    public List<String> getLayers() {

        return null;
    }


}
