package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.transformation;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Transformation;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.UnpivotStructure;
import gr.uoa.di.aginfra.data.analytics.visualization.model.exceptions.InvalidFormatException;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UnpivotTransformerImpl implements UnpivotTransformer {

    @Override
    public DataSet unPivot(DataSet dataSet, Transformation transformation) throws Exception {

        if(transformation != null) {

            UnpivotStructure unpivotStructure = new UnpivotStructure();

            try {
                List<String> updatedFields = new ArrayList<>();
                List<Integer> columnsPosition = new ArrayList<>();

                for (int j = 0; j < dataSet.getFields().size(); j++) {
                    String f = dataSet.getFields().get(j);
                    boolean addColumn = true;
                    for(String column : transformation.getTransformationColumns()){
                        if(f.equals(column))
                            addColumn = false;
                    }
                    if(addColumn) {
                        updatedFields.add(f);
                    }
                    else
                        columnsPosition.add(j);

                }
                updatedFields.add(transformation.getTransformationLabel());
                updatedFields.add(transformation.getTransformationLabelValue());
                unpivotStructure.setNewColumnValue(transformation.getTransformationLabelValue());
                unpivotStructure.setNewColumnName(transformation.getTransformationLabel());
                unpivotStructure.setColumnsToUnpivot(transformation.getTransformationColumns());
                unpivotStructure.setColumnsPosition(columnsPosition);

                List<List<String>> list = new ArrayList<>();

                for (int i = 0; i < dataSet.getData().size(); i++) {
                    for (Integer oldColumns : unpivotStructure.getColumnsPosition()) {
                        List<String> item = new ArrayList<>();
                        boolean oldColumnFound = false;
                        int oldColumnPosition = 0;
                        String oldColumnValue = null;
                        for (int j = 0; j < dataSet.getFields().size(); j++) {
                            String f = dataSet.getFields().get(j);
                            if (dataSet.getData().get(i).size() > j ) {
                                if(!oldColumnFound && oldColumns == j)
                                {
                                    oldColumnValue = dataSet.getData().get(i).get(j);
                                    oldColumnFound = true;
                                    oldColumnPosition = j;
                                }
                                else if(oldColumns != j && !unpivotStructure.getColumnsPosition().contains(j))
                                    item.add(dataSet.getData().get(i).get(j));
                            } else item.add( null);
                        }
                        String[] s = dataSet.getFields().get(oldColumnPosition).split("-");
                        if(s.length > 1) {
                            item.add(s[1]);
                        }
                        else
                            item.add(dataSet.getFields().get(oldColumnPosition));
                        item.add(oldColumnValue);
                        list.add(item);
                    }
                }
                dataSet.setFields(updatedFields);
                dataSet.setData(list);

                return dataSet;

            } catch (Exception e) {
                throw new InvalidFormatException("Invalid csv format provided", e);
            }
        }

        return dataSet;
    }
}
