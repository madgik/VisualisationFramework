package gr.uoa.di.aginfra.data.analytics.visualization.model.data;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataSource;

public interface DataSetExtractorFactory {

	DataSetExtractor getExtractor(DataSource dataSource);
}
