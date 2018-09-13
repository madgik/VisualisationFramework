package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.extractors;

import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.ThreeDData;

public interface ThreeDDataExtractor {

	ThreeDData extract(DataSet dataSet, String xAxisField, String yAxisField, String zAxisField) throws Exception;
}

