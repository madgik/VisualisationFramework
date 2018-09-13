package gr.uoa.di.aginfra.data.analytics.visualization.service;

import gr.uoa.di.aginfra.data.analytics.visualization.model.stats.UsageStatsService;
import gr.uoa.di.aginfra.data.analytics.visualization.model.stats.UsageStatsServiceDev;
import gr.uoa.di.aginfra.data.analytics.visualization.service.vres.VREResolver;
import gr.uoa.di.aginfra.data.analytics.visualization.service.vres.VREResolverDev;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("dev")
public class DevConfig {
	@Bean
	public VREResolver vreResolver() {
		return new VREResolverDev();
	}

	@Bean
	public UsageStatsService usageService() {
		return new UsageStatsServiceDev();
	}
}
