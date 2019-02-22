package gr.uoa.di.aginfra.data.analytics.visualization.model.services;

import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.GeoanalyticsEndpointRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class GeoanalyticsService {
    private GeoanalyticsEndpointRepository geoanalyticsEndpointRepository;

    @Autowired
    public GeoanalyticsService(GeoanalyticsEndpointRepository geoanalyticsEndpointRepository) {
        this.geoanalyticsEndpointRepository = geoanalyticsEndpointRepository;
    }


    List<Object> getLayers(){
        List<String> reuslts = geoanalyticsEndpointRepository.getLayers();
        return  null;
    }
}
