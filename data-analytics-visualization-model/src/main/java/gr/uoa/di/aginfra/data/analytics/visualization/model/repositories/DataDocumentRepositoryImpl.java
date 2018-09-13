package gr.uoa.di.aginfra.data.analytics.visualization.model.repositories;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Charsets;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.model.GridFSFile;
import com.mongodb.client.gridfs.model.GridFSUploadOptions;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.*;
import gr.uoa.di.aginfra.data.analytics.visualization.model.persistence.MongoDataSourceManager;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import java.util.*;

import static com.mongodb.client.model.Filters.eq;

@Component
public class DataDocumentRepositoryImpl implements DataDocumentRepository {

	private static final ObjectMapper mapper = new ObjectMapper();

	private MongoDataSourceManager mongoDataSourceManager;

	private ConfigurationRepository configurationDAO;

	@Autowired
	public DataDocumentRepositoryImpl(MongoDataSourceManager mongoDataSourceManager,
									  @Lazy ConfigurationRepository configurationDAO) {
		this.mongoDataSourceManager = mongoDataSourceManager;
		this.configurationDAO = configurationDAO;
	}

	@Override
	public DataDocument getById(String id) throws Exception {

		GridFSBucket database = mongoDataSourceManager.getGridFS();

		GridFSFile file = database.find(eq(new ObjectId(id))).first();

		if (file == null) return null;

		DataDocument dataDocument = new DataDocument();

		mapMetadata(dataDocument, file.getMetadata());

		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		database.downloadToStream(file.getObjectId(), outputStream);

		switch (dataDocument.getType()) {
			case Graph: {
				String data = new String(outputStream.toByteArray(), Charsets.UTF_8);
				dataDocument.setGraph(mapper.readValue(data, Graph.class));
				break;
			}
			case Tree: {
				String data = new String(outputStream.toByteArray(), Charsets.UTF_8);
				dataDocument.setTree(mapper.readValue(data, TreeNode.class));
				break;
			}
			case Records: {
				String data = new String(outputStream.toByteArray(), Charsets.UTF_8);
				dataDocument.setRecords(mapper.readValue(data, new TypeReference<List<Map<String, String>>>() {

				}));
				break;
			}
			case FreeMind: {
				String data = new String(outputStream.toByteArray(), Charsets.UTF_8);
				dataDocument.setFreeMind(mapper.readValue(data, MMNode.class));
				break;
			}
			case JSON: {
				String data = new String(outputStream.toByteArray(), Charsets.UTF_8);
				dataDocument.setJSON(data);
				break;
			}
			case Image: {
				dataDocument.setRawBytes(outputStream.toByteArray());
				break;
			}
			default:
				throw new Exception("Invalid data type provided " + dataDocument.getType());
		}

		return dataDocument;
	}

	@Override
	public String store(DataDocument item) throws Exception {
		GridFSBucket database = mongoDataSourceManager.getGridFS();
		GridFSUploadOptions options = new GridFSUploadOptions().metadata(mapMetadata(item));

		byte[] data;
		switch (item.getType()) {
			case Graph:
				data = mapper.writeValueAsBytes(item.getGraph());
				break;
			case Tree:
				data = mapper.writeValueAsBytes(item.getTree());
				break;
			case FreeMind:
				data = mapper.writeValueAsBytes(item.getFreeMind());
				break;
			case Records:
				data = mapper.writeValueAsBytes(item.getRecords());
				break;
			case JSON:
				data = item.getJSON().getBytes(StandardCharsets.UTF_8.name());
				break;
			case Image:
			default:
				data = item.getRawBytes();
				break;
		}

		ObjectId id = database.uploadFromStream(item.getName(), new ByteArrayInputStream(data), options);

		return id.toString();
	}

	@Override
	public void delete(String id) throws Exception {
		GridFSBucket database = mongoDataSourceManager.getGridFS();

		database.delete(new ObjectId(id));
	}

	private static Document mapMetadata(DataDocument dataDocument) {
		Document document = new Document();
		if (dataDocument.getName() != null) document.append("name", dataDocument.getName());
		if (dataDocument.getVre() != null) document.append("vre", dataDocument.getVre());
		if (dataDocument.getFields() != null) document.append("fields", dataDocument.getFields());
		if (dataDocument.getType() != null) document.append("type", dataDocument.getType().toString());
		document.append("isDataReference", dataDocument.isDataReference());
		if (dataDocument.getCreatedAt() != null) document.append("createdAt", dataDocument.getCreatedAt().getTime());
		if (dataDocument.getUpdatedAt() != null) document.append("updatedAt", dataDocument.getUpdatedAt().getTime());
		return document;
	}

	private static void mapMetadata(DataDocument dataDocument, Document document) {
		if (document.containsKey("name") && document.getString("name") != null)
			dataDocument.setName(document.getString("name"));
		if (document.containsKey("vre") && document.getString("vre") != null)
			dataDocument.setVre(document.getString("vre"));
		if (document.containsKey("fields"))
			dataDocument.setFields(mapper.convertValue(document.get("fields"), new TypeReference<List<String>>() {
			}));
		if (document.containsKey("type") && document.getString("type") != null)
			dataDocument.setType(DataType.valueOf(document.getString("type")));
		if (document.containsKey("isDataReference"))
			dataDocument.setDataReference(document.getBoolean("isDataReference"));
		if (document.containsKey("fields"))
			dataDocument.setFields(mapper.convertValue(document.get("fields"), new TypeReference<List<String>>() {
			}));
		if (document.containsKey("createdAt") && document.getLong("createdAt") != null)
			dataDocument.setCreatedAt(new Date(document.getLong("createdAt")));
		if (document.containsKey("updatedAt") && document.getLong("updatedAt") != null)
			dataDocument.setUpdatedAt(new Date(document.getLong("updatedAt")));
	}
}
