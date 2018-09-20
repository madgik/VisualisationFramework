package gr.uoa.di.aginfra.data.analytics.visualization.model.data;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataDocument;

public interface RawDataImporter {
	void importData(byte[] content, DataDocument dataDocument) throws Exception;
}
