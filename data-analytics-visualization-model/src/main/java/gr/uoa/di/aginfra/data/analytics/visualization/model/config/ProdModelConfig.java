package gr.uoa.di.aginfra.data.analytics.visualization.model.config;

import gr.uoa.di.aginfra.data.analytics.visualization.model.persistence.RedisDataSourceManager;
import gr.uoa.di.aginfra.data.analytics.visualization.model.stats.UsageStatsService;
import gr.uoa.di.aginfra.data.analytics.visualization.model.stats.UsageStatsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("default")
public class ProdModelConfig {

	@Autowired
	private ApplicationContext appContext;

	@Bean
	public UsageStatsService usageService() {
		return new UsageStatsServiceImpl();
		//return new UsageStatsServiceImpl(appContext.getBean(RedisDataSourceManager.class));
	}
}
