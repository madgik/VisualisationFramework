package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.generators;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Configuration;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.Visualization;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.Tuple;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.extractors.TupleDataExtractor;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.filters.DataSetFilterApplier;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.filters.Filter;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.filters.FilterOptionsExtractor;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.transformations.UnpivotTransformer;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Collection;
import java.util.Map;

public class TupleDataGenerator extends RecordsGenerator implements VisualizationDataGenerator {

	private TupleDataExtractor tupleDataExtractor;

	private DataSetFilterApplier dataSetFilterApplier;

	private FilterOptionsExtractor filterOptionsExtractor;

	private UnpivotTransformer unpivotTransformer;

	@Autowired
	public TupleDataGenerator(TupleDataExtractor tupleDataExtractor,
							  DataSetFilterApplier dataSetFilterApplier,
							  FilterOptionsExtractor filterOptionsExtractor,
							  UnpivotTransformer unpivotTransformer) {
		this.tupleDataExtractor = tupleDataExtractor;
		this.dataSetFilterApplier = dataSetFilterApplier;
		this.filterOptionsExtractor = filterOptionsExtractor;
		this.unpivotTransformer = unpivotTransformer;
	}

	@Override
	public void generateData(Visualization visualization, Configuration configuration, DataSet dataSet, Map<String, String> filters) throws Exception {
		if (!hasNonFilledInRequiredFilter(visualization, filters)) {


			dataSet = unpivotTransformer.unPivot(dataSet, configuration.getTransformations());
			dataSetFilterApplier.applyFilters(dataSet, filters);

			Collection<Tuple> tuples = tupleDataExtractor.
					extract(dataSet, configuration);

			visualization.setTuples(tuples);
		}

		if (visualization.getFilters() != null) {
			for (Filter filter : visualization.getFilters()) {
				filter.setOptions(filterOptionsExtractor.extract(dataSet, filter.getField()));
			}
		}
	}
}
