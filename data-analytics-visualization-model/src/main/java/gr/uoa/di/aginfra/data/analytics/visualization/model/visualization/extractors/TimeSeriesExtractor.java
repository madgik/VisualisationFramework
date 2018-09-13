package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.extractors;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Configuration;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.TimeSeries;

import java.util.*;

public interface TimeSeriesExtractor {

	 Collection<TimeSeries> extract(DataSet dataSet, Configuration configuration) throws Exception;
}

