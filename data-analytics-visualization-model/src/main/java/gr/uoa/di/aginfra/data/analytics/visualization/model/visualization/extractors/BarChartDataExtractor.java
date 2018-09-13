package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.extractors;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Configuration;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.BarChartData;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;

public interface BarChartDataExtractor {

	BarChartData extract(DataSet dataSet, Configuration configuration) throws Exception;
}

