package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.transformation;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Transformation;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;

import java.util.Map;

public interface UnpivotTransformer {

    DataSet unPivot(DataSet dataSet, Transformation transformation) throws Exception;

}
