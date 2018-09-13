package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.generators;

import gr.uoa.di.aginfra.data.analytics.visualization.model.services.VisualizationDataType;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.extractors.BarChartDataExtractor;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.extractors.ThreeDDataExtractor;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.extractors.TimeSeriesExtractor;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.extractors.TupleDataExtractor;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.filters.DataSetFilterApplier;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.filters.FilterOptionsExtractor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class VisualizationDataGeneratorFactoryImpl implements VisualizationDataGeneratorFactory {

	private ApplicationContext appContext;

	@Autowired
	public VisualizationDataGeneratorFactoryImpl(ApplicationContext appContext) {
		this.appContext = appContext;
		this.generatorMap = new HashMap<VisualizationDataType, VisualizationDataGenerator>() {{
			put(VisualizationDataType.BarChart, new BarChartDataGenerator(
					appContext.getBean(BarChartDataExtractor.class),
					appContext.getBean(DataSetFilterApplier.class),
					appContext.getBean(FilterOptionsExtractor.class)));
			put(VisualizationDataType.TimeSeries, new TimeSeriesDataGenerator(
					appContext.getBean(TimeSeriesExtractor.class),
					appContext.getBean(DataSetFilterApplier.class),
					appContext.getBean(FilterOptionsExtractor.class)));
			put(VisualizationDataType.ThreeD, new ThreeDDataGenerator(
					appContext.getBean(ThreeDDataExtractor.class),
					appContext.getBean(DataSetFilterApplier.class),
					appContext.getBean(FilterOptionsExtractor.class)));
			put(VisualizationDataType.Tuples, new TupleDataGenerator(
					appContext.getBean(TupleDataExtractor.class),
					appContext.getBean(DataSetFilterApplier.class),
					appContext.getBean(FilterOptionsExtractor.class)));
			put(VisualizationDataType.FreeMind, new FreeMindDataGenerator());
			put(VisualizationDataType.Map, new JSONDataGenerator());
			put(VisualizationDataType.Tree, new TreeDataGenerator());
			put(VisualizationDataType.Graph, new GraphDataGenerator());
			put(VisualizationDataType.Tabular, new TabularDataGenerator());
		}};
	}

	private Map<VisualizationDataType, VisualizationDataGenerator> generatorMap;

	public VisualizationDataGenerator getGenerator(VisualizationDataType visualizationDataType) throws Exception {
		VisualizationDataGenerator generator = generatorMap.get(visualizationDataType);
		if (generator == null)
			throw new Exception("Could not find generator for visualization type " + visualizationDataType);
		return generator;
	}
}
