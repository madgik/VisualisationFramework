package gr.uoa.di.aginfra.data.analytics.visualization.model.persistence;

import io.lettuce.core.ConnectionFuture;
import io.lettuce.core.RedisClient;
import io.lettuce.core.api.StatefulRedisConnection;

public interface RedisDataSourceManager {

	StatefulRedisConnection<String, String> getRedisConnection();
}
