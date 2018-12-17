package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.generators;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Configuration;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.Visualization;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.ThreeDData;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.extractors.ThreeDDataExtractor;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.filters.DataSetFilterApplier;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.filters.Filter;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.filters.FilterOptionsExtractor;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.transformation.UnpivotTransformer;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

public class ThreeDDataGenerator extends RecordsGenerator implements VisualizationDataGenerator {

	private ThreeDDataExtractor threeDDataExtractor;

	private DataSetFilterApplier dataSetFilterApplier;

	private FilterOptionsExtractor filterOptionsExtractor;

	private UnpivotTransformer unpivotTransformer;

	@Autowired
	public ThreeDDataGenerator(ThreeDDataExtractor threeDDataExtractor,
							   DataSetFilterApplier dataSetFilterApplier,
							   FilterOptionsExtractor filterOptionsExtractor,
							   UnpivotTransformer unpivotTransformer) {
		this.threeDDataExtractor = threeDDataExtractor;
		this.dataSetFilterApplier = dataSetFilterApplier;
		this.filterOptionsExtractor = filterOptionsExtractor;
		this.unpivotTransformer = unpivotTransformer;

	}

	@Override
	public void generateData(Visualization visualization, Configuration configuration, DataSet dataSet, Map<String, String> filters) throws Exception {

		if (!hasNonFilledInRequiredFilter(visualization, filters)) {

			dataSet = unpivotTransformer.unPivot(dataSet, configuration.getTransformations());

			dataSetFilterApplier.applyFilters(dataSet, filters);

			ThreeDData threeDData = threeDDataExtractor.extract(dataSet,
					configuration.getXAxis(),
					configuration.getYAxis(),
					configuration.getZAxis());

			visualization.setThreeDData(threeDData);
		}

		if (visualization.getFilters() != null) {
			for (Filter filter : visualization.getFilters()) {
				filter.setOptions(filterOptionsExtractor.extract(dataSet, filter.getField()));
			}
		}
	}
}
