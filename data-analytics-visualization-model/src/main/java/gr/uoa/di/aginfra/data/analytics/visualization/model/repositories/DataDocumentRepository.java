package gr.uoa.di.aginfra.data.analytics.visualization.model.repositories;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataDocument;

public interface DataDocumentRepository {

	DataDocument getById(String id) throws Exception;

	String store(DataDocument item) throws  Exception;

	void delete(String id) throws Exception;
}
