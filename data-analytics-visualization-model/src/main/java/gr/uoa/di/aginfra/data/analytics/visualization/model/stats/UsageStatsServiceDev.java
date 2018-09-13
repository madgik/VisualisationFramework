package gr.uoa.di.aginfra.data.analytics.visualization.model.stats;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UsageStatsServiceDev implements UsageStatsService {

	@Autowired
	public UsageStatsServiceDev() {

	}

	@Override
	public VisualizationUsageStats getStats(String vre) {
		return null;
	}

	@Override
	public void visualizationVisited(String user, String vre, String id) {
		System.out.println("Visualization visited");
	}
}
