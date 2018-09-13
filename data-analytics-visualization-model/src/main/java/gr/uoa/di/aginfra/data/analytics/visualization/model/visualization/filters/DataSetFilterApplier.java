package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.filters;

import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;

import java.util.Map;

public interface DataSetFilterApplier {

	void applyFilters(DataSet dataSet, Map<String, String> filters) throws Exception;
}
