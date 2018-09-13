package gr.uoa.di.aginfra.data.analytics.visualization.model.stats;

import gr.uoa.di.aginfra.data.analytics.visualization.model.persistence.RedisDataSourceManager;
import io.lettuce.core.api.StatefulRedisConnection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UsageStatsServiceImpl implements UsageStatsService {

	private RedisDataSourceManager redisDataSourceManager;

	@Autowired
	public UsageStatsServiceImpl(RedisDataSourceManager redisDataSourceManager) {
		this.redisDataSourceManager = redisDataSourceManager;
	}

	@Override
	public VisualizationUsageStats getStats(String vre) throws Exception {

		StatefulRedisConnection<String, String> commands = redisDataSourceManager.getRedisConnection();
		String total = commands.async().get("visualizations:total").get();

		VisualizationUsageStats stats = new VisualizationUsageStats();
		stats.setTotal(total);
		return stats;
	}

	@Override
	public void visualizationVisited(String user, String vre, String id) {
		StatefulRedisConnection<String, String> commands = redisDataSourceManager.getRedisConnection();
		commands.async().incr("visualizations:total");
		commands.async().incr("visualization:" + id);
	}
}
