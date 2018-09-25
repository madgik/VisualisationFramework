package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.transformations;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Transformation;
import gr.uoa.di.aginfra.data.analytics.visualization.model.helpers.CSVUnpivot;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;

public class UnpivotTransformerImpl implements UnpivotTransformer {

    @Override
    public DataSet unPivot(DataSet dataSet, Transformation transformation) throws Exception {

        if(transformation != null) {
            DataSet unpivot = CSVUnpivot.unpivotCSV(dataSet, transformation);
            return unpivot;
        }

        return dataSet;
    }
}
