package gr.uoa.di.aginfra.data.analytics.visualization.model.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import gr.uoa.di.aginfra.data.analytics.visualization.model.convert.CSVConvertor;
import gr.uoa.di.aginfra.data.analytics.visualization.model.data.RawDataImporter;
import gr.uoa.di.aginfra.data.analytics.visualization.model.data.RawDataImporterFactory;
import gr.uoa.di.aginfra.data.analytics.visualization.model.dtos.ConfigurationCriteriaDto;
import gr.uoa.di.aginfra.data.analytics.visualization.model.exceptions.InvalidFormatException;
import gr.uoa.di.aginfra.data.analytics.visualization.model.helpers.CSVReader;
import gr.uoa.di.aginfra.data.analytics.visualization.model.helpers.MMReader;
import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.ConfigurationRepository;
import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.DataDocumentRepository;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.*;
import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.querying.ConfigurationCriteria;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ConfigurationServiceImpl implements ConfigurationService {

	private static final Logger logger = LogManager.getLogger(ConfigurationServiceImpl.class);

	private ConfigurationRepository configurationDAO;

	private DataDocumentRepository dataDocumentDAO;

	private ModelMapper modelMapper;

	private RawDataImporterFactory rawDataImporterFactory;

	@Autowired
	public ConfigurationServiceImpl(ConfigurationRepository configurationDAO,
									DataDocumentRepository dataDocumentDAO,
									ModelMapper modelMapper,
									RawDataImporterFactory rawDataImporterFactory) {
		this.configurationDAO = configurationDAO;
		this.dataDocumentDAO = dataDocumentDAO;
		this.modelMapper = modelMapper;
		this.rawDataImporterFactory = rawDataImporterFactory;
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

		RawDataImporter importer = rawDataImporterFactory.getImporter(type);
		importer.importData(content, dataDocument);

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






}
