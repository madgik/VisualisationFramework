package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.generators;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Configuration;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.Visualization;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.HeatMapData;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.extractors.HeatMapDataExtractor;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.filters.DataSetFilterApplier;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.filters.Filter;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.filters.FilterOptionsExtractor;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.transformation.UnpivotTransformer;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

public class HeatMapDataGenerator extends RecordsGenerator implements VisualizationDataGenerator {

    private HeatMapDataExtractor heatMapDataExtractor;

    private DataSetFilterApplier dataSetFilterApplier;

    private FilterOptionsExtractor filterOptionsExtractor;

    private UnpivotTransformer unpivotTransformer;

    @Autowired
    public HeatMapDataGenerator(HeatMapDataExtractor heatMapDataExtractor,
                               DataSetFilterApplier dataSetFilterApplier,
                               FilterOptionsExtractor filterOptionsExtractor,
                               UnpivotTransformer unpivotTransformer) {
        this.heatMapDataExtractor = heatMapDataExtractor;
        this.dataSetFilterApplier = dataSetFilterApplier;
        this.filterOptionsExtractor = filterOptionsExtractor;
        this.unpivotTransformer = unpivotTransformer;

    }

    @Override
    public void generateData(Visualization visualization, Configuration configuration, DataSet dataSet, Map<String, String> filters) throws Exception {

        if (visualization.getFilters() != null) {
            for (Filter filter : visualization.getFilters()) {
                filter.setOptions(filterOptionsExtractor.extract(dataSet, filter.getField()));
            }
        }

        if (!hasNonFilledInRequiredFilter(visualization, filters)) {

            dataSet = unpivotTransformer.unPivot(dataSet, configuration.getTransformations());

            dataSetFilterApplier.applyFilters(dataSet, filters);

            HeatMapData heatMapData = heatMapDataExtractor.extract(dataSet,
                    configuration.getXAxis(),
                    configuration.getYAxis(),
                    configuration.getZAxis(),
                    configuration.getGroupBy(),
                    filters,
                    dataSetFilterApplier);

            visualization.setHeatMapData(heatMapData);
        }


    }
}
