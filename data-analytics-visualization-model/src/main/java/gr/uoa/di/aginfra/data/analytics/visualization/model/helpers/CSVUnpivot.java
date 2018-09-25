package gr.uoa.di.aginfra.data.analytics.visualization.model.helpers;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataDocument;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Transformation;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.UnpivotStructure;
import gr.uoa.di.aginfra.data.analytics.visualization.model.exceptions.InvalidFormatException;
import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.DataDocumentRepository;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

public class CSVUnpivot {

    public static DataSet unpivotCSV(DataSet dataSet, Transformation transformation) throws Exception {

        UnpivotStructure unpivotStructure = new UnpivotStructure();

        try {
            String[][] csv;
            String[][] unpivotCSV;

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

            for (int i = 1; i < dataSet.getData().size(); i++) {
                for (Integer oldColumns : unpivotStructure.getColumnsPosition()) {
                    //Map<String, String> item = new HashMap<>();
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
}
