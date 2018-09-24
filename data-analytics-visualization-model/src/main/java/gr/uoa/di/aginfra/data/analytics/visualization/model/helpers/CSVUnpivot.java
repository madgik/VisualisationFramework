package gr.uoa.di.aginfra.data.analytics.visualization.model.helpers;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataDocument;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.UnpivotStructure;
import gr.uoa.di.aginfra.data.analytics.visualization.model.exceptions.InvalidFormatException;
import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.DataDocumentRepository;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

public class CSVUnpivot {

    public static void unpivotCSV(DataDocument dataDocument, byte[] bytes, DataDocumentRepository dataDocumentDAO, UnpivotStructure unpivotStructure ) throws Exception {



        final String filename = dataDocument.getName();
        String unzipedDirectory = null;
        Map<String, String> imagesWithIds = null;
        boolean isZipFile = false;
        File file = null;

        try {
            String[][] csv;
            String[][] unpivotCSV;

            csv = CSVReader.readCSV(new String(bytes, StandardCharsets.UTF_8.name()));
            if (csv.length < 2) throw new Exception("No records found in csv file");

            dataDocument.setFields(new ArrayList<String>(Arrays.stream(csv[0]).collect(Collectors.toList())));

            List<String> updatedFields = new ArrayList<>();
            List<Integer> columnsPosition = new ArrayList<>();

            for (int j = 0; j < dataDocument.getFields().size(); j++) {
                String f = dataDocument.getFields().get(j);
                boolean addColumn = true;
                for(String column : unpivotStructure.getColumnsToUnpivot()){
                    if(f.equals(column))
                        addColumn = false;

                }
                if(addColumn) {
                    updatedFields.add(f);
                }
                else
                    columnsPosition.add(j);

            }
            updatedFields.add(unpivotStructure.getNewColumnName());
            updatedFields.add(unpivotStructure.getNewColumnValue());
            unpivotStructure.setColumnsPosition(columnsPosition);

            List<Map<String, String>> list = new ArrayList<>();

            for (int i = 1; i < csv.length; i++) {
                for (Integer oldColumns : unpivotStructure.getColumnsPosition()) {
                    Map<String, String> item = new HashMap<>();
                    boolean oldColumnFound = false;
                    int oldColumnPosition = 0;
                    String oldColumnValue = null;
                    for (int j = 0; j < dataDocument.getFields().size(); j++) {
                        String f = dataDocument.getFields().get(j);
                        if (csv[i].length > j ) {
                            if(!oldColumnFound && oldColumns == j)
                            {
                                oldColumnValue = csv[i][j];
                                oldColumnFound = true;
                                oldColumnPosition = j;
                            }
                            else if(oldColumns != j && !unpivotStructure.getColumnsPosition().contains(j))
                                item.put(f, csv[i][j]);
                        } else item.put(f, null);
                    }
                    item.put(unpivotStructure.getNewColumnName(), csv[0][oldColumnPosition]);
                    item.put(unpivotStructure.getNewColumnValue(), oldColumnValue);
                    list.add(item);
                }
            }


            dataDocument.setFields(updatedFields);
            dataDocument.setRecords(list);

        } catch (Exception e) {
            throw new InvalidFormatException("Invalid csv format provided", e);
        }
    }
}
