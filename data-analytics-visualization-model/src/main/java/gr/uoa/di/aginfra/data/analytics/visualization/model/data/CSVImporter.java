package gr.uoa.di.aginfra.data.analytics.visualization.model.data;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataDocument;
import gr.uoa.di.aginfra.data.analytics.visualization.model.exceptions.InvalidFormatException;
import gr.uoa.di.aginfra.data.analytics.visualization.model.helpers.CSVReader;
import gr.uoa.di.aginfra.data.analytics.visualization.model.helpers.ImagesWithCSVFunctions;
import gr.uoa.di.aginfra.data.analytics.visualization.model.helpers.PropertiesConfig;
import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.DataDocumentRepository;
import org.apache.commons.io.FileUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

public class CSVImporter implements RawDataImporter {

	private static final Logger logger = LogManager.getLogger(CSVImporter.class);

	private PropertiesConfig.ApiConfigTemplate config;

	private DataDocumentRepository dataDocumentDAO;

	public CSVImporter(PropertiesConfig.ApiConfigTemplate config,
					   DataDocumentRepository dataDocumentDAO){
		this.config = config;
		this.dataDocumentDAO = dataDocumentDAO;
	}

	@Override
	public void importData(byte[] content, DataDocument dataDocument) throws Exception {

		//final String dir = System.getProperty("user.dir");
		final String dir = config.getTempDirectory();

		File tempDir = new File(dir);
		if (!tempDir.exists()) {
			if (tempDir.mkdir()) {
				logger.info("Directory is created!");
			} else {
				logger.info("Failed to create directory!");
			}
		}

		final String filename = dataDocument.getName();
		String unzipedDirectory = null;
		Map<String, String> imagesWithIds = null;
		boolean isZipFile = false;
		File file = null;

		if(filename.endsWith(".zip")) {
			isZipFile = true;
			unzipedDirectory = ImagesWithCSVFunctions.unzip(content, dir);
			imagesWithIds = ImagesWithCSVFunctions.storeImages(unzipedDirectory, dataDocumentDAO, dataDocument.getVre());
			String csvFile = ImagesWithCSVFunctions.getCSVFile(unzipedDirectory);
			file = new File(csvFile);
		}

		try {
			String[][] csv;
			if(isZipFile) {
				csv = CSVReader.readCSV(new String(readBytesFromFile(file.getPath()), StandardCharsets.UTF_8.name()));
				dataDocument.setName(file.getName());
			}
			else
			{
				csv = CSVReader.readCSV(new String(content, StandardCharsets.UTF_8.name()));
			}
			if (csv.length < 2) throw new Exception("No records found in csv file");

			dataDocument.setFields(new ArrayList<String>(Arrays.stream(csv[0]).collect(Collectors.toList())));

			List<Map<String, String>> list = new ArrayList<>();
			for (int i = 1; i < csv.length; i++) {
				Map<String, String> item = new HashMap<>();
				for (int j = 0; j < dataDocument.getFields().size(); j++) {
					String f = dataDocument.getFields().get(j);
					if (csv[i].length > j) {
						if(isZipFile && imagesWithIds.containsKey(csv[i][j]))
							item.put(f,imagesWithIds.get(csv[i][j]));
						else
							item.put(f, csv[i][j]);
					}
					else item.put(f, null);
				}
				list.add(item);
			}

			dataDocument.setRecords(list);
			if(isZipFile) {
				File filesDir = new File(unzipedDirectory);
				FileUtils.deleteDirectory(filesDir);
			}
		} catch (Exception e) {
			throw new InvalidFormatException("Invalid csv format provided", e);
		}
	}

	private static byte[] readBytesFromFile(String filePath) {

		FileInputStream fileInputStream = null;
		byte[] bytesArray = null;

		try {
			File file = new File(filePath);
			bytesArray = new byte[(int) file.length()];

			//read file into bytes[]
			fileInputStream = new FileInputStream(file);
			fileInputStream.read(bytesArray);

		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (fileInputStream != null) {
				try {
					fileInputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

		return bytesArray;
	}
}
