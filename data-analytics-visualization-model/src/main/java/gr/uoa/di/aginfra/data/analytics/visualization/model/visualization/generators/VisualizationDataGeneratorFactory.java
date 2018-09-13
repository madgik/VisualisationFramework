package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.generators;

import gr.uoa.di.aginfra.data.analytics.visualization.model.services.VisualizationDataType;

public interface VisualizationDataGeneratorFactory {
	VisualizationDataGenerator getGenerator(VisualizationDataType visualizationDataType) throws Exception;
}
