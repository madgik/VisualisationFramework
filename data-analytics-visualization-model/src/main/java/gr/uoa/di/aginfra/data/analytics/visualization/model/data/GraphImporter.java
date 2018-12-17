package gr.uoa.di.aginfra.data.analytics.visualization.model.data;

import com.fasterxml.jackson.databind.ObjectMapper;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataDocument;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Graph;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.TreeNode;
import gr.uoa.di.aginfra.data.analytics.visualization.model.exceptions.InvalidFormatException;

import java.nio.charset.StandardCharsets;

public class GraphImporter implements RawDataImporter {
	@Override
	public void importData(byte[] content, DataDocument dataDocument) throws Exception {
		try {
			String stringContent = new String(content, StandardCharsets.UTF_8.name());

			ObjectMapper mapper = new ObjectMapper();

			Graph graph = mapper.readValue(stringContent, Graph.class);

			dataDocument.setGraph(graph);
		} catch (Exception e) {
			throw new InvalidFormatException("Invalid graph format provided", e);
		}
	}
}
