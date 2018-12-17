package gr.uoa.di.aginfra.data.analytics.visualization.model.data;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataType;

public interface RawDataImporterFactory {
	RawDataImporter getImporter(DataType type) throws Exception;
}
