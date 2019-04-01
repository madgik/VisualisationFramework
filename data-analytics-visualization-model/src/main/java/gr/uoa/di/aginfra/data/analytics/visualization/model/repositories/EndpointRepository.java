package gr.uoa.di.aginfra.data.analytics.visualization.model.repositories;

import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface EndpointRepository {

    ResponseEntity<?> getEndpointResource(RequestEntity requestEntity);
    List<String> getLayers();
}
