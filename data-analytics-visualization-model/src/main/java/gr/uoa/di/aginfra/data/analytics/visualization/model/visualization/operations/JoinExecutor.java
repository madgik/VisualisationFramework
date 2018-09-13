package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.operations;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataSource;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Join;
import gr.uoa.di.aginfra.data.analytics.visualization.model.services.VisualizationDataType;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;

import java.util.List;

public interface JoinExecutor {

	DataSet execute(List<DataSource> dataSets, List<Join> joins, VisualizationDataType dataType) throws Exception;
}

