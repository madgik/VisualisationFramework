package gr.uoa.di.aginfra.data.analytics.visualization.model.stats;

public interface UsageStatsService {

	VisualizationUsageStats getStats(String vre) throws Exception;

	void visualizationVisited(String user, String vre, String id);
}
