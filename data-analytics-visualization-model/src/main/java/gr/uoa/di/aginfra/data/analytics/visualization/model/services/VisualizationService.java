package gr.uoa.di.aginfra.data.analytics.visualization.model.services;

import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.Visualization;

import java.util.List;
import java.util.Map;

public interface VisualizationService {

	Visualization getVisualization(String id) throws Exception;

	Visualization getVisualization(String id, Map<String, String> filters) throws Exception;
}
