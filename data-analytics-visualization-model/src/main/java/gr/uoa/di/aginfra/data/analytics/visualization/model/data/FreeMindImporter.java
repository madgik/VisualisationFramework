package gr.uoa.di.aginfra.data.analytics.visualization.model.data;

import com.fasterxml.jackson.databind.ObjectMapper;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataDocument;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Graph;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.MMNode;
import gr.uoa.di.aginfra.data.analytics.visualization.model.exceptions.InvalidFormatException;
import gr.uoa.di.aginfra.data.analytics.visualization.model.helpers.MMReader;

import java.nio.charset.StandardCharsets;

public class FreeMindImporter implements RawDataImporter {
	@Override
	public void importData(byte[] content, DataDocument dataDocument) throws Exception {
		try {
			String stringContent = new String(content, StandardCharsets.UTF_8.name());

			MMNode freeMind = new MMReader().parse(stringContent);

			dataDocument.setFreeMind(freeMind);
		} catch (Exception e) {
			throw new InvalidFormatException("Invalid free mind format provided", e);
		}
	}
}
