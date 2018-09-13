package gr.uoa.di.aginfra.data.analytics.visualization.model.persistence;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Configuration;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataDocument;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

@Component
public class MongoDataSourceManagerImpl implements MongoDataSourceManager {

	private static String databaseName = "Visualization";

	private CodecRegistry pojoCodecRegistry;

	private MongoClient mongoClient;

	public MongoDataSourceManagerImpl(@Value("${gr.uoa.di.aginfra.data.analytics.visualization.model.persistence.connection}") String databaseURI) {
		mongoClient = new MongoClient(new MongoClientURI(databaseURI));
	}

	private MongoClient getMongoClient() {
		return mongoClient;
	}

	private CodecRegistry getPojoCodecRegistry() {
		if (pojoCodecRegistry == null) {
			pojoCodecRegistry =
				fromRegistries(MongoClient.getDefaultCodecRegistry(),
				fromProviders(PojoCodecProvider.builder()
					.register(Configuration.class)
					.register(DataDocument.class)
					.automatic(true).build()));
		}
		return pojoCodecRegistry;
	}

	public MongoDatabase getDataBase() {

		MongoDatabase database = getMongoClient().getDatabase(databaseName);

		database = database.withCodecRegistry(getPojoCodecRegistry());

		return database;
	}

	public GridFSBucket getGridFS() throws Exception {

		MongoDatabase database = getMongoClient().getDatabase(databaseName);

		return GridFSBuckets.create(database);
	}
}
