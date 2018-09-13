package gr.uoa.di.aginfra.data.analytics.visualization.model.persistence;

import io.lettuce.core.RedisClient;
import io.lettuce.core.RedisURI;
import io.lettuce.core.api.StatefulRedisConnection;
import io.lettuce.core.codec.StringCodec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class RedisDataSourceManagerImpl implements RedisDataSourceManager {

	private RedisClient redisClient;

	private String databaseURI;

	private StatefulRedisConnection<String, String> connection;

	public RedisDataSourceManagerImpl(@Value("${gr.uoa.di.aginfra.data.analytics.visualization.model.statspersistence.connection}") String databaseURI) {
		this.redisClient = RedisClient.create();
		this.databaseURI = databaseURI;
	}

	public StatefulRedisConnection<String, String> getRedisConnection() {
		if (connection == null) connection = redisClient.connect(StringCodec.UTF8, RedisURI.create(databaseURI));
		return connection;
	}
}
