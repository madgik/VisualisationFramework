package gr.uoa.di.aginfra.data.analytics.visualization.model.persistence;

import com.mongodb.client.MongoDatabase;
import com.mongodb.client.gridfs.GridFSBucket;

public interface MongoDataSourceManager {

	MongoDatabase getDataBase();

	GridFSBucket getGridFS() throws Exception;
}
