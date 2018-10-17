package gr.uoa.di.aginfra.data.analytics.visualization.model.data;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataDocument;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataType;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.UnpivotStructure;
import gr.uoa.di.aginfra.data.analytics.visualization.model.exceptions.InvalidFormatException;
import gr.uoa.di.aginfra.data.analytics.visualization.model.helpers.*;
import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.DataDocumentRepository;
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

public class CSVImporter implements RawDataImporter {

	private PropertiesConfig.ApiConfigTemplate config;

	private DataDocumentRepository dataDocumentDAO;

	public CSVImporter(PropertiesConfig.ApiConfigTemplate config,
					   DataDocumentRepository dataDocumentDAO) {
		this.config = config;
		this.dataDocumentDAO = dataDocumentDAO;
	}

	@Override
	public void importData(byte[] content, DataDocument dataDocument) throws Exception {
		if (FileHelpers.isZipFile(dataDocument.getName())) {
			importZipWithDocuments(content, dataDocument);
		} else {
			importPlainCSV(content, dataDocument);
		}
	}

	public void importZipWithDocuments(byte[] content, DataDocument dataDocument) throws Exception {

		final String tempDirectory = config.getTempDirectory();

		FileHelpers.createDirectory(tempDirectory);

		String unzipedDirectory = ZipHelpers.unzip(content, tempDirectory);
		Map<String, String> imagesWithIds = storeImages(unzipedDirectory, dataDocument.getVre());
		File csvFile = new File(ZipHelpers.getCSVFile(unzipedDirectory));

		String[][] csv;
		try {
			csv = CSVReader.readCSV(new String(FileHelpers.readBytesFromFile(csvFile.getPath()), StandardCharsets.UTF_8.name()));
			dataDocument.setName(csvFile.getName());
		} catch (Exception e) {
			throw new InvalidFormatException("Invalid csv format provided", e);
		}

		if (csv.length < 2) throw new Exception("No records found in csv file");

		dataDocument.setFields(new ArrayList<String>(Arrays.stream(csv[0]).collect(Collectors.toList())));

		List<Map<String, String>> list = new ArrayList<>();
		for (int i = 1; i < csv.length; i++) {
			Map<String, String> item = new HashMap<>();
			for (int j = 0; j < dataDocument.getFields().size(); j++) {
				String f = dataDocument.getFields().get(j);
				if (csv[i].length > j) {
					if (imagesWithIds.containsKey(csv[i][j]))
						item.put(f, imagesWithIds.get(csv[i][j]));
					else
						item.put(f, csv[i][j]);
				} else item.put(f, null);
			}
			list.add(item);
		}

		dataDocument.setRecords(list);

		File filesDir = new File(unzipedDirectory);
		FileUtils.deleteDirectory(filesDir);
	}

	public void importPlainCSV(byte[] content, DataDocument dataDocument) throws Exception {

		String[][] csv;
		try {
			csv = CSVReader.readCSV(new String(content, StandardCharsets.UTF_8.name()));
		} catch (Exception e) {
			throw new InvalidFormatException("Invalid csv format provided", e);
		}

		if (csv.length < 2) throw new Exception("No records found in csv file");

		dataDocument.setFields(new ArrayList<String>(Arrays.stream(csv[0]).collect(Collectors.toList())));

		List<Map<String, String>> list = new ArrayList<>();
		for (int i = 1; i < csv.length; i++) {
			Map<String, String> item = new HashMap<>();
			for (int j = 0; j < dataDocument.getFields().size(); j++) {
				String f = dataDocument.getFields().get(j);
				if (csv[i].length > j) {
					item.put(f, csv[i][j]);
				} else item.put(f, null);
			}
			list.add(item);
		}

		dataDocument.setRecords(list);
	}

	private Map<String, String> storeImages(String zipFilePath, String vre) throws Exception {

		File[] files = new File(zipFilePath).listFiles();
		Map<String, String> map = new HashMap<String, String>();

		for (File file : files) {
			if (!file.isDirectory() && file.getName().endsWith(".png")) {
				DataDocument dataDocument = new DataDocument();
				dataDocument.setVre(vre);
				dataDocument.setName(file.getName());
				dataDocument.setType(DataType.Image);
				dataDocument.setDataReference(true);
				dataDocument.setCreatedAt(new Date());
				dataDocument.setUpdatedAt(new Date());
				dataDocument.setRawBytes(FileHelpers.convertImageToBytes(file));
				String id = dataDocumentDAO.store(dataDocument);
				map.put(dataDocument.getName(), id);
			}
		}
		return map;
	}



}
