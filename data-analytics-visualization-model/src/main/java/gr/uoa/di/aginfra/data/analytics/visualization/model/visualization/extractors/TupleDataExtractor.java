package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.extractors;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Configuration;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.BarChartData;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.Tuple;

import java.util.Collection;

public interface TupleDataExtractor {

	Collection<Tuple> extract(DataSet dataSet, Configuration configuration) throws Exception;
}

