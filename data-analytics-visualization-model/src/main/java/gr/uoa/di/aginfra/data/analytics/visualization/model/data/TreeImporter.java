package gr.uoa.di.aginfra.data.analytics.visualization.model.data;

import com.fasterxml.jackson.databind.ObjectMapper;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataDocument;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.TreeNode;
import gr.uoa.di.aginfra.data.analytics.visualization.model.exceptions.InvalidFormatException;

import java.nio.charset.StandardCharsets;

public class TreeImporter implements RawDataImporter {
	@Override
	public void importData(byte[] content, DataDocument dataDocument) throws Exception {
		try {
			String stringContent = new String(content, StandardCharsets.UTF_8.name());

			ObjectMapper mapper = new ObjectMapper();

			TreeNode tree = mapper.readValue(stringContent, TreeNode.class);

			dataDocument.setTree(tree);
		} catch (Exception e) {
			throw new InvalidFormatException("Invalid tree format provided", e);
		}
	}
}
