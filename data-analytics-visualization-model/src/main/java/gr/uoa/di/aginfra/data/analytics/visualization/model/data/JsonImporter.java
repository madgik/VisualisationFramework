package gr.uoa.di.aginfra.data.analytics.visualization.model.data;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataDocument;

import java.nio.charset.StandardCharsets;

public class JsonImporter implements RawDataImporter {
	@Override
	public void importData(byte[] content, DataDocument dataDocument) throws Exception {
		String stringContent = new String(content, StandardCharsets.UTF_8.name());
		dataDocument.setJSON(stringContent);
	}
}
