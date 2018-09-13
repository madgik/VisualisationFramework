package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.filters;

import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;

import java.util.List;

public interface FilterOptionsExtractor {

	 List<String> extract(DataSet dataSet, String filterField) throws Exception;
}

