package gr.uoa.di.aginfra.data.analytics.visualization.model.repositories;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Configuration;
import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.querying.ConfigurationCriteria;

import java.util.List;

public interface ConfigurationRepository {

	Configuration getById(String id) throws Exception;

	List<Configuration> getConfigurations(ConfigurationCriteria criteria) throws Exception;

	String create(Configuration item) throws Exception;

	void update(Configuration item) throws Exception;

	void delete(String id) throws Exception;
}
