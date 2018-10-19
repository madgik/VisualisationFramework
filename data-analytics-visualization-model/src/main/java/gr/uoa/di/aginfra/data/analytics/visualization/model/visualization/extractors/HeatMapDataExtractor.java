package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.extractors;

import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.HeatMapData;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.filters.DataSetFilterApplier;

import java.util.Map;

public interface  HeatMapDataExtractor {

    HeatMapData extract(DataSet dataSet, String xAxisField, String yAxisField, String zAxisField, String groupByField, Map<String, String> filters, DataSetFilterApplier dataSetFilterApplier) throws Exception;

}
