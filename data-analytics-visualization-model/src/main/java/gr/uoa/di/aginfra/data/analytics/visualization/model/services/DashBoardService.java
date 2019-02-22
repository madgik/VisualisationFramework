package gr.uoa.di.aginfra.data.analytics.visualization.model.services;


import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.GeometryType;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.TimeSeries;
import org.geojson.FeatureCollection;

import java.util.Map;

public interface DashBoardService {

    FeatureCollection get(String url, Map<String, String> parameters, GeometryType geometryType) throws Exception;
    FeatureCollection getFieldDetails(String id, Map<String, String> parameters) throws Exception;
    TimeSeries getTimeSeries(String yAxisField, FeatureCollection featureCollection);
}
