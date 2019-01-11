package gr.uoa.di.aginfra.data.analytics.visualization.model.services;


import org.geojson.FeatureCollection;

import java.util.Map;

public interface DashBoardService {

    FeatureCollection getDataset(Map<String, String> parameters) throws Exception;

}
