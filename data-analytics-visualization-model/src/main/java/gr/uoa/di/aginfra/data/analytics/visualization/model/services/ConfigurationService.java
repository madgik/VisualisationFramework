package gr.uoa.di.aginfra.data.analytics.visualization.model.services;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Configuration;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataDocument;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataType;
import gr.uoa.di.aginfra.data.analytics.visualization.model.dtos.ConfigurationCriteriaDto;

import java.util.List;

public interface ConfigurationService {

	Configuration getConfiguration(String id) throws Exception;

	List<Configuration> getConfigurations(ConfigurationCriteriaDto criteriaDto, String vre) throws Exception;

	DataDocument getDataDocument(String id) throws Exception;

	DataDocumentMetadata getDataDocumentMetadata(String id) throws Exception;

	String storeConfiguration(Configuration item) throws Exception;

	String storeDataDocument(String vre, String name, DataType type, boolean isDataReference, byte[] content) throws Exception;

	void deleteConfiguration(String id) throws Exception;
}
