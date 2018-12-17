package gr.uoa.di.aginfra.data.analytics.visualization.model.data;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataType;
import gr.uoa.di.aginfra.data.analytics.visualization.model.helpers.PropertiesConfig;
import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.DataDocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class RawDataImporterFactoryImpl implements RawDataImporterFactory {

	private Map<DataType, RawDataImporter> importerMap;

	@Autowired
	public RawDataImporterFactoryImpl(PropertiesConfig appConfig,
									  DataDocumentRepository dataDocumentDAO) {
		this.importerMap = new HashMap<DataType, RawDataImporter>() {{
			put(DataType.Tree, new TreeImporter());
			put(DataType.Graph, new GraphImporter());
			put(DataType.FreeMind, new FreeMindImporter());
			put(DataType.JSON, new JsonImporter());
			put(DataType.Records, new CSVImporter(appConfig.getProperties(), dataDocumentDAO));
			put(DataType.Image, new RawByteImporter());
		}};
	}

	@Override
	public RawDataImporter getImporter(DataType type) throws Exception {
		RawDataImporter importer = importerMap.get(type);
		if (importer == null)
			throw new Exception("Could not find importer for data type " + type);
		return importer;
	}
}
