package gr.uoa.di.aginfra.data.analytics.visualization.model.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import gr.uoa.di.aginfra.data.analytics.visualization.model.dtos.ConfigurationCriteriaDto;
import gr.uoa.di.aginfra.data.analytics.visualization.model.helpers.ImagesWithCSVFunctions;
import gr.uoa.di.aginfra.data.analytics.visualization.model.helpers.PropertiesConfig;
import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.ConfigurationRepository;
import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.DataDocumentRepository;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.*;
import gr.uoa.di.aginfra.data.analytics.visualization.model.exceptions.InvalidFormatException;
import gr.uoa.di.aginfra.data.analytics.visualization.model.helpers.CSVReader;
import gr.uoa.di.aginfra.data.analytics.visualization.model.helpers.MMReader;
import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.querying.ConfigurationCriteria;
import org.apache.commons.io.FileUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ConfigurationServiceImpl implements ConfigurationService {

	private static final Logger logger = LogManager.getLogger(ConfigurationServiceImpl.class);

	private ConfigurationRepository configurationDAO;

	private DataDocumentRepository dataDocumentDAO;

	private ModelMapper modelMapper;

	private static PropertiesConfig.ApiConfigTemplate config ;

	@Autowired
	public void setApiConfiTemplate(PropertiesConfig appConfig){
		this.config = appConfig.getProperties();
	}

	@Autowired
	public ConfigurationServiceImpl(ConfigurationRepository configurationDAO,
									DataDocumentRepository dataDocumentDAO,
									ModelMapper modelMapper) {
		this.configurationDAO = configurationDAO;
		this.dataDocumentDAO = dataDocumentDAO;
		this.modelMapper = modelMapper;
	}

	@Override
	public Configuration getConfiguration(String id) throws Exception {
		return configurationDAO.getById(id);
	}

	@Override
	public List<Configuration> getConfigurations(ConfigurationCriteriaDto criteriaDto, String vre) throws Exception {
		ConfigurationCriteria criteria = modelMapper.map(criteriaDto, ConfigurationCriteria.class);
		criteria.setVre(vre);
		return configurationDAO.getConfigurations(criteria);
	}

	@Override
	public DataDocument getDataDocument(String id) throws Exception {
		return dataDocumentDAO.getById(id);
	}

	@Override
	public DataDocumentMetadata getDataDocumentMetadata(String id) throws Exception {
		//TODO do not load the whole document
		return this.modelMapper.map(dataDocumentDAO.getById(id), DataDocumentMetadata.class);
	}

	@Override
	public String storeConfiguration(Configuration item) throws Exception {
		if (item.getId() == null) item.setCreatedAt(new Date());
		item.setUpdatedAt(new Date());

		if (item.getId() == null) {
			return configurationDAO.create(item);
		} else {
			configurationDAO.update(item);
			return item.getId();
		}
	}

	@Override
	public String storeDataDocument(String vre, String name, DataType type, boolean isDataReference, byte[] content) throws Exception {
		logger.info("Storing document with name " + name + " and datatype " + type);

		DataDocument dataDocument = new DataDocument();
		dataDocument.setVre(vre);
		dataDocument.setName(name);
		dataDocument.setType(type);
		dataDocument.setDataReference(isDataReference);
		switch (type) {
			case Tree: {
				loadTree(dataDocument, new String(content, StandardCharsets.UTF_8.name()));
				break;
			}
			case Graph: {
				loadGraph(dataDocument, new String(content, StandardCharsets.UTF_8.name()));
				break;
			}
			case FreeMind: {
				loadFreeMind(dataDocument, new String(content, StandardCharsets.UTF_8.name()));
				break;
			}
			case Records: {
				//loadCSV(dataDocument, new String(content, StandardCharsets.UTF_8.name()));
				loadCSV(dataDocument, content, dataDocumentDAO);
//				UnpivotStructure unpivotStructure = new UnpivotStructure();
//				List<String> list = new ArrayList<>();
//				list.add("Emp1");
//				list.add("Emp2");
//				list.add("Emp3");
//				list.add("Emp4");
//				list.add("Emp5");
//				unpivotStructure.setColumnsToUnpivot(list);
//				unpivotStructure.setNewColumnName("Employee");
//				unpivotStructure.setNewColumnValue("EmployeeValue");
//
//				unpivotCSV(dataDocument, content, dataDocumentDAO,unpivotStructure);

				break;
			}
			case JSON: {
				loadJSON(dataDocument, new String(content, StandardCharsets.UTF_8.name()));
				break;
			}
			case Image:
			default: {
				dataDocument.setRawBytes(content);
				break;
			}
		}

		dataDocument.setCreatedAt(new Date());
		dataDocument.setUpdatedAt(new Date());

		String id = dataDocumentDAO.store(dataDocument);

		logger.info("Document stored with id " + id);

		return id;
	}

	@Override
	public void deleteConfiguration(String id) throws Exception {
		configurationDAO.delete(id);
	}

	private static void loadTree(DataDocument dataDocument, String content) throws Exception {
		try {
			ObjectMapper mapper = new ObjectMapper();

			TreeNode tree = mapper.readValue(content, TreeNode.class);

			dataDocument.setTree(tree);
		} catch (Exception e) {
			throw new InvalidFormatException("Invalid tree format provided", e);
		}
	}

	private static void loadFreeMind(DataDocument dataDocument, String content) throws Exception {
		try {
			MMNode freeMind = new MMReader().parse(content);

			dataDocument.setFreeMind(freeMind);
		} catch (Exception e) {
			throw new InvalidFormatException("Invalid free mind format provided", e);
		}
	}

	private static void loadGraph(DataDocument dataDocument, String content) throws Exception {
		try {
			ObjectMapper mapper = new ObjectMapper();

			Graph graph = mapper.readValue(content, Graph.class);

			dataDocument.setGraph(graph);
		} catch (Exception e) {
			throw new InvalidFormatException("Invalid graph format provided", e);
		}
	}

	private static void loadJSON(DataDocument dataDocument, String content) throws Exception {
		dataDocument.setJSON(content);
	}

	private static void loadCSV(DataDocument dataDocument, String content) throws Exception {
		try {
			String[][] csv = CSVReader.readCSV(content);
			if (csv.length < 2) throw new Exception("No records found in csv file");

			dataDocument.setFields(new ArrayList<String>(Arrays.stream(csv[0]).collect(Collectors.toList())));

			List<Map<String, String>> list = new ArrayList<>();
			for (int i = 1; i < csv.length; i++) {
				Map<String, String> item = new HashMap<>();
				for (int j = 0; j < dataDocument.getFields().size(); j++) {
					String f = dataDocument.getFields().get(j);
					if (csv[i].length > j) item.put(f, csv[i][j]);
					else item.put(f, null);
				}
				list.add(item);
			}
			dataDocument.setRecords(list);
		} catch (Exception e) {
			throw new InvalidFormatException("Invalid csv format provided", e);
		}
	}

	private static void loadCSV(DataDocument dataDocument, byte[] bytes, DataDocumentRepository dataDocumentDAO) throws Exception {

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
			unzipedDirectory = ImagesWithCSVFunctions.unzip(bytes, dir);
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
				csv = CSVReader.readCSV(new String(bytes, StandardCharsets.UTF_8.name()));

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

	private static void unpivotCSV(DataDocument dataDocument, byte[] bytes, DataDocumentRepository dataDocumentDAO, UnpivotStructure unpivotStructure ) throws Exception {



		final String filename = dataDocument.getName();
		String unzipedDirectory = null;
		Map<String, String> imagesWithIds = null;
		boolean isZipFile = false;
		File file = null;

		try {
			String[][] csv;
			String[][] unpivotCSV;

			csv = CSVReader.readCSV(new String(bytes, StandardCharsets.UTF_8.name()));
			if (csv.length < 2) throw new Exception("No records found in csv file");

			dataDocument.setFields(new ArrayList<String>(Arrays.stream(csv[0]).collect(Collectors.toList())));

			List<String> updatedFields = new ArrayList<>();
			List<Integer> columnsPosition = new ArrayList<>();

			for (int j = 0; j < dataDocument.getFields().size(); j++) {
				String f = dataDocument.getFields().get(j);
				boolean addColumn = true;
					for(String column : unpivotStructure.getColumnsToUnpivot()){
						if(f.equals(column))
							addColumn = false;

				}
				if(addColumn) {
					updatedFields.add(f);
				}
				else
					columnsPosition.add(j);

			}
			updatedFields.add(unpivotStructure.getNewColumnName());
			updatedFields.add(unpivotStructure.getNewColumnValue());
			unpivotStructure.setColumnsPosition(columnsPosition);

			List<Map<String, String>> list = new ArrayList<>();

			for (int i = 1; i < csv.length; i++) {
				for (Integer oldColumns : unpivotStructure.getColumnsPosition()) {
					Map<String, String> item = new HashMap<>();
					boolean oldColumnFound = false;
					int oldColumnPosition = 0;
					String oldColumnValue = null;
					for (int j = 0; j < dataDocument.getFields().size(); j++) {
							String f = dataDocument.getFields().get(j);
							if (csv[i].length > j ) {
								if(!oldColumnFound && oldColumns == j)
								{
									oldColumnValue = csv[i][j];
									oldColumnFound = true;
									oldColumnPosition = j;
								}
								else if(oldColumns != j && !unpivotStructure.getColumnsPosition().contains(j))
									item.put(f, csv[i][j]);
							} else item.put(f, null);
						}
					item.put(unpivotStructure.getNewColumnName(), csv[0][oldColumnPosition]);
					item.put(unpivotStructure.getNewColumnValue(), oldColumnValue);
					list.add(item);
				}
			}


			dataDocument.setFields(updatedFields);
			dataDocument.setRecords(list);

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
