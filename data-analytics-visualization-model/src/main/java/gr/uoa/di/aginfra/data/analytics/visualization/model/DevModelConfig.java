package gr.uoa.di.aginfra.data.analytics.visualization.model;

import gr.uoa.di.aginfra.data.analytics.visualization.model.stats.UsageStatsService;
import gr.uoa.di.aginfra.data.analytics.visualization.model.stats.UsageStatsServiceDev;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("dev")
public class DevModelConfig {
	@Bean
	public UsageStatsService usageService() {
		return new UsageStatsServiceDev();
	}
}
