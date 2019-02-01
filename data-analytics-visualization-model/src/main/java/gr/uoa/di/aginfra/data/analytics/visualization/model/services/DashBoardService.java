package gr.uoa.di.aginfra.data.analytics.visualization.model.services;


import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.GeometryType;
import org.geojson.FeatureCollection;

import java.util.Map;

public interface DashBoardService {

    FeatureCollection get(String url, Map<String, String> parameters, GeometryType geometryType) throws Exception;
    FeatureCollection getFieldDetails(String id, Map<String, String> parameters) throws Exception;
}
