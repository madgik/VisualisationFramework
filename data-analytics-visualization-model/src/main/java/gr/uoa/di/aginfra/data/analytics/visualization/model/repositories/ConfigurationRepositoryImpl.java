package gr.uoa.di.aginfra.data.analytics.visualization.model.repositories;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.BasicDBObject;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import static com.mongodb.client.model.Filters.*;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.*;
import gr.uoa.di.aginfra.data.analytics.visualization.model.persistence.MongoDataSourceManager;
import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.querying.ConfigurationCriteria;
import org.bson.BasicBSONObject;
import org.bson.Document;
import org.bson.types.BasicBSONList;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ConfigurationRepositoryImpl implements ConfigurationRepository {

	private static final ObjectMapper mapper = new ObjectMapper();

	private static String CONFIGURATION_COLLECTION_NAME = "Configuration";

	private MongoDataSourceManager mongoDataSourceManager;

	private DataDocumentRepository dataDocumentDAO;

	@Autowired
	public ConfigurationRepositoryImpl(MongoDataSourceManager mongoDataSourceManager,
									   DataDocumentRepository dataDocumentDAO) {
		this.mongoDataSourceManager = mongoDataSourceManager;
		this.dataDocumentDAO = dataDocumentDAO;
	}

	@Override
	public Configuration getById(String id) throws Exception {

		MongoDatabase database = mongoDataSourceManager.getDataBase();

		MongoCollection<Document> collection = database.getCollection(CONFIGURATION_COLLECTION_NAME);

		Document document = collection.find(eq(new ObjectId(id))).first();

		if (document == null) return null;

		Configuration item = mapTo(document);

		return item;
	}

	@Override
	public List<Configuration> getConfigurations(ConfigurationCriteria criteria) throws Exception {

		MongoDatabase database = mongoDataSourceManager.getDataBase();

		MongoCollection<Document> collection = database.getCollection(CONFIGURATION_COLLECTION_NAME);

		List<Configuration> configurations = new ArrayList<>();
		for (Document document : collection.find(new Document("vre", criteria.getVre())).sort(new Document("label", 1))) {
			Configuration item = mapTo(document);
			item.setId(document.getObjectId("_id").toString());//TODO Something better, mapping is not applied properly
			configurations.add(item);
		}
		return configurations;
	}

	@Override
	public String create(Configuration item) throws Exception {
		MongoDatabase database = mongoDataSourceManager.getDataBase();

		MongoCollection<Document> collection = database.getCollection(CONFIGURATION_COLLECTION_NAME);

		Document document = mapTo(item);

		collection.insertOne(document);

		ObjectId id = (ObjectId) document.get("_id");

		return id.toString();
	}

	@Override
	public void update(Configuration item) throws Exception {
		MongoDatabase database = mongoDataSourceManager.getDataBase();

		MongoCollection<Document> collection = database.getCollection(CONFIGURATION_COLLECTION_NAME);

		Document document = mapTo(item);

		collection.updateOne(
				new BasicDBObject("_id", new ObjectId(item.getId())),
				new BasicDBObject("$set", document));
	}

	@Override
	public void delete(String id) throws Exception {
		MongoDatabase database = mongoDataSourceManager.getDataBase();

		MongoCollection<Document> collection = database.getCollection(CONFIGURATION_COLLECTION_NAME);

		Configuration configuration = getById(id);
		List<DataSource> dataSources = configuration.getDataSources();
		if (dataSources != null)
			for (DataSource dataSource : dataSources)
				dataDocumentDAO.delete(dataSource.getSource());

		collection.deleteOne(new BasicDBObject("_id", new ObjectId(id)));
	}

	//https://jira.mongodb.org/browse/JAVA-2674
	private static Configuration mapTo(Document document) {
		Configuration configuration = new Configuration();
		configuration.setId(document.getObjectId("_id").toString());

		if (document.containsKey("label")) configuration.setLabel(document.getString("label"));
		if (document.containsKey("description")) configuration.setDescription(document.getString("description"));
		if (document.containsKey("type")) configuration.setType(VisualizationType.valueOf(document.getString("type")));
		if (document.containsKey("vre")) configuration.setVre(document.getString("vre"));
		if (document.containsKey("availableTypes"))
			configuration.setAvailableTypes(mapper.convertValue(document.get("availableTypes"), new TypeReference<List<VisualizationType>>() {
			}));
		if (document.containsKey("groupBy")) configuration.setGroupBy(document.getString("groupBy"));
		if (document.containsKey("joins"))
			configuration.setJoins(mapper.convertValue(document.get("joins"), new TypeReference<List<Join>>() {
			}));
		if (document.containsKey("dataSources"))
			configuration.setDataSources(mapper.convertValue(document.get("dataSources"), new TypeReference<List<DataSource>>() {
			}));
		if (document.containsKey("xAxis")) configuration.setXAxis(document.getString("xAxis"));
		if (document.containsKey("xAxisLabel")) configuration.setXAxisLabel(document.getString("xAxisLabel"));
		if (document.containsKey("yAxis")) configuration.setYAxis(document.getString("yAxis"));
		if (document.containsKey("yAxisLabel")) configuration.setYAxisLabel(document.getString("yAxisLabel"));
		if (document.containsKey("zAxis")) configuration.setZAxis(document.getString("zAxis"));
		if (document.containsKey("zAxisLabel")) configuration.setZAxisLabel(document.getString("zAxisLabel"));
		if (document.containsKey("labelField")) configuration.setLabelField(document.getString("labelField"));
		if (document.containsKey("valueField")) configuration.setValueField(document.getString("valueField"));
		if (document.containsKey("filters"))
			configuration.setFilters(mapper.convertValue(document.get("filters"), new TypeReference<List<Filter>>() {
			}));

        if (document.containsKey("transformations"))
            configuration.setTransformations(mapper.convertValue(document.get("transformations"), new TypeReference<Transformation>() {
            }));

		if (document.containsKey("colorField")) configuration.setColorField(document.getString("colorField"));
		if (document.containsKey("documentField")) configuration.setDocumentField(document.getString("documentField"));
		if (document.containsKey("activeDocuments")) configuration.setActiveDocuments(document.getInteger("activeDocuments"));

		if (document.containsKey("createdAt") && document.getLong("createdAt") != null)
			configuration.setCreatedAt(new Date(document.getLong("createdAt")));
		if (document.containsKey("updatedAt") && document.getLong("updatedAt") != null)
			configuration.setUpdatedAt(new Date(document.getLong("updatedAt")));
		return configuration;
	}

	private static Document mapTo(Configuration configuration) {
		Document document = new Document();
		//document.append("_id", new ObjectId(configuration.getId()));
		if (configuration.getLabel() != null) document.append("label", configuration.getLabel());
		if (configuration.getDescription() != null) document.append("description", configuration.getDescription());
		if (configuration.getType() != null) document.append("type", configuration.getType().toString());
		if (configuration.getVre() != null) document.append("vre", configuration.getVre());
		if (configuration.getAvailableTypes() != null)
			document.append("availableTypes", configuration.getAvailableTypes()
					.stream()
					.map(x -> x.toString())
					.collect(Collectors.toList()));
		if (configuration.getGroupBy() != null) document.append("groupBy", configuration.getGroupBy());
		if (configuration.getJoins() != null && configuration.getJoins().size() > 0) {
			BasicBSONList list = new BasicBSONList();
			for (Join join : configuration.getJoins()) {
				BasicBSONObject object = new BasicBSONObject();
				object.append("source", join.getSource());
				object.append("field", join.getField());
				list.add(object);
			}
			document.append("joins", list);
		} else {
			document.append("joins", null);
		}
		if (configuration.getDataSources() != null && configuration.getDataSources().size() > 0) {
			BasicBSONList list = new BasicBSONList();
			for (DataSource dataSource : configuration.getDataSources()) {
				BasicBSONObject object = new BasicBSONObject();
				object.append("name", dataSource.getName());
				object.append("type", dataSource.getType().toString());
				object.append("source", dataSource.getSource());
				object.append("fields", dataSource.getFields());
				list.add(object);
			}
			document.append("dataSources", list);
		} else {
			document.append("dataSources", null);
		}


		if (configuration.getTransformations() != null && configuration.getTransformations().getTransformationColumns().size() > 0) {
			///BasicBSONList list = new BasicBSONList();
			BasicBSONObject object = new BasicBSONObject();
			object.append("transformationLabel", configuration.getTransformations().getTransformationLabel());
			object.append("transformationLabelValue", configuration.getTransformations().getTransformationLabelValue());
			object.append("transformationColumns", configuration.getTransformations().getTransformationColumns()
					.stream()
					.map(x -> x.toString())
					.collect(Collectors.toList()));
			//list.add(object);

			document.append("transformations", object);
		} else {
			document.append("transformations", null);
		}

		document.append("activeDocuments", configuration.getActiveDocuments());
		if (configuration.getXAxis() != null) document.append("xAxis", configuration.getXAxis());
		if (configuration.getXAxisLabel() != null) document.append("xAxisLabel", configuration.getXAxisLabel());
		if (configuration.getYAxis() != null) document.append("yAxis", configuration.getYAxis());
		if (configuration.getYAxisLabel() != null) document.append("yAxisLabel", configuration.getYAxisLabel());
		if (configuration.getZAxis() != null) document.append("zAxis", configuration.getZAxis());
		if (configuration.getZAxisLabel() != null) document.append("zAxisLabel", configuration.getZAxisLabel());
		if (configuration.getLabelField() != null) document.append("labelField", configuration.getLabelField());
		if (configuration.getValueField() != null) document.append("valueField", configuration.getValueField());
		if (configuration.getFilters() != null && configuration.getFilters().size() > 0) {
			BasicBSONList list = new BasicBSONList();
			for (Filter filter : configuration.getFilters()) {
				BasicBSONObject object = new BasicBSONObject();
				object.append("label", filter.getLabel());
				object.append("field", filter.getField());
				object.append("type", filter.getType().toString());
				object.append("required", filter.isRequired());
				list.add(object);
			}
			document.append("filters", list);
		} else {
			document.append("filters", null);
		}
		if (configuration.getColorField() != null)
			document.append("colorField", configuration.getColorField());
		if (configuration.getDocumentField() != null)
			document.append("documentField", configuration.getDocumentField());
		if (configuration.getCreatedAt() != null) document.append("createdAt", configuration.getCreatedAt().getTime());
		if (configuration.getUpdatedAt() != null) document.append("updatedAt", configuration.getUpdatedAt().getTime());

		return document;
	}
}
