package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.generators;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Configuration;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.Visualization;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;

import java.util.Map;

public interface VisualizationDataGenerator {
	void generateData(Visualization visualization, Configuration configuration, DataSet dataSet, Map<String, String> filters) throws Exception;
}
