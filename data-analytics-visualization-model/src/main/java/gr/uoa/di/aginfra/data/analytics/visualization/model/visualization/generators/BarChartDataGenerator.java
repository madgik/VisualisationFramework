package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.generators;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Configuration;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.Visualization;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.BarChartData;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.extractors.BarChartDataExtractor;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.filters.DataSetFilterApplier;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.filters.Filter;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.filters.FilterOptionsExtractor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Collection;
import java.util.Map;

public class BarChartDataGenerator extends RecordsGenerator implements VisualizationDataGenerator {

	private BarChartDataExtractor barChartDataExtractor;

	private DataSetFilterApplier dataSetFilterApplier;

	private FilterOptionsExtractor filterOptionsExtractor;

	@Autowired
	public BarChartDataGenerator(BarChartDataExtractor barChartDataExtractor,
								 DataSetFilterApplier dataSetFilterApplier,
								 FilterOptionsExtractor filterOptionsExtractor) {
		this.barChartDataExtractor = barChartDataExtractor;
		this.dataSetFilterApplier = dataSetFilterApplier;
		this.filterOptionsExtractor = filterOptionsExtractor;
	}

	@Override
	public void generateData(Visualization visualization, Configuration configuration, DataSet dataSet, Map<String, String> filters) throws Exception {
		if (!hasNonFilledInRequiredFilter(visualization, filters)) {

			dataSetFilterApplier.applyFilters(dataSet, filters);

			BarChartData barChartData = barChartDataExtractor.extract(dataSet, configuration);

			visualization.setBarChartData(barChartData);
		}

		if (visualization.getFilters() != null) {
			for (Filter filter : visualization.getFilters()) {
				filter.setOptions(filterOptionsExtractor.extract(dataSet, filter.getField()));
			}
		}
	}
}
