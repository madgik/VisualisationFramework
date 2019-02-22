package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.generators;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Configuration;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.Visualization;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.TimeSeries;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.extractors.TimeSeriesExtractor;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.filters.DataSetFilterApplier;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.filters.Filter;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.filters.FilterOptionsExtractor;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.transformation.UnpivotTransformer;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Collection;
import java.util.Map;

public class TimeSeriesDataGenerator extends RecordsGenerator implements VisualizationDataGenerator {

	private TimeSeriesExtractor timeSeriesExtractor;

	private DataSetFilterApplier dataSetFilterApplier;

	private FilterOptionsExtractor filterOptionsExtractor;

	private UnpivotTransformer unpivotTransformer;

	@Autowired
	public TimeSeriesDataGenerator(TimeSeriesExtractor timeSeriesExtractor,
								   DataSetFilterApplier dataSetFilterApplier,
								   FilterOptionsExtractor filterOptionsExtractor, UnpivotTransformer unpivotTransformer) {
		this.timeSeriesExtractor = timeSeriesExtractor;
		this.dataSetFilterApplier = dataSetFilterApplier;
		this.filterOptionsExtractor = filterOptionsExtractor;
		this.unpivotTransformer = unpivotTransformer;

	}

	@Override
	public void generateData(Visualization visualization, Configuration configuration, DataSet dataSet, Map<String, String> filters) throws Exception {
		if (!hasNonFilledInRequiredFilter(visualization, filters)) {

			dataSet = unpivotTransformer.unPivot(dataSet, configuration.getTransformations());

			dataSetFilterApplier.applyFilters(dataSet, filters);

			Collection<TimeSeries> timeSeries = timeSeriesExtractor.extract(dataSet, configuration);

			visualization.setTimeSeries(timeSeries);
		}

		if (visualization.getFilters() != null) {
			for (Filter filter : visualization.getFilters()) {
				filter.setOptions(filterOptionsExtractor.extract(dataSet, filter.getField()));
			}
		}
	}
}
