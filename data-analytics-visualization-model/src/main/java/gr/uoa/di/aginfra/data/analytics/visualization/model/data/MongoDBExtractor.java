package gr.uoa.di.aginfra.data.analytics.visualization.model.data;

import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.DataDocumentRepository;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataSource;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataDocument;
import gr.uoa.di.aginfra.data.analytics.visualization.model.services.VisualizationDataType;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class MongoDBExtractor implements DataSetExtractor {

	private DataDocumentRepository dataDocumentDAO;

	@Autowired
	public MongoDBExtractor(DataDocumentRepository dataDocumentDAO) {
		this.dataDocumentDAO = dataDocumentDAO;
	}

	@Override
	public DataSet extract(DataSource dataSource, VisualizationDataType type) throws Exception {

		DataDocument dataDocument = dataDocumentDAO.getById(dataSource.getSource());

		DataSet dataSet = new DataSet();
		dataSet.setDataType(type);
		if (dataDocument.getFields() != null) {
			dataSet.setFields(dataDocument.getFields().stream()
					.map(x -> dataSource.getSource() + "-" + x)
					.collect(Collectors.toList()));
		}
		dataSet.setData(extractData(dataDocument));
		dataSet.setFreeMind(dataDocument.getFreeMind());
		dataSet.setGraph(dataDocument.getGraph());
		dataSet.setTree(dataDocument.getTree());
		dataSet.setJSON(dataDocument.getJSON());

		return dataSet;
	}

	private List<List<String>> extractData(DataDocument dataDocument) {
		if (dataDocument.getFields() == null || dataDocument.getFields().size() == 0) return null;
		List<List<String>> data = new ArrayList<>();

		for (Object item : dataDocument.getRecords()) {
			Map<String, Object> map = (Map<String, Object>) item;
			List<String> row = new ArrayList<>();
			for (String field : dataDocument.getFields()) {
				Object value = map.get(field);
				row.add(value != null ? value.toString() : "");
			}
			data.add(row);
		}

		return data;
	}
}
