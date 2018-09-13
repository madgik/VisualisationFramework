package gr.uoa.di.aginfra.data.analytics.visualization.model.data;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataSource;
import gr.uoa.di.aginfra.data.analytics.visualization.model.services.VisualizationDataType;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;

public interface DataSetExtractor {

	DataSet extract(DataSource dataSource, VisualizationDataType dataType) throws Exception;
}
