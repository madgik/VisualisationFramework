package gr.uoa.di.aginfra.data.analytics.visualization.model.convert;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataDocument;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class CSVConvertor {

    public static void convert(DataDocument dataSet){

        List<Map<String,String>> data = dataSet.getRecords();
        List<List<String>> newData = new ArrayList<>();

        List<String> rawPosition = dataSet.getFields().stream().filter(s -> !s.equals("rawPosition")).collect(Collectors.toList());


        List<String> f = new ArrayList<>(rawPosition);
        rawPosition.add("position");
        rawPosition.add("line");

        for(Map<String, String> row: data) {
            List<String> newRow = new ArrayList<>();
            for (String column : f  ){
                    newRow.add(row.get(column));
            }
            final String s = row.get("rawPosition");

            System.out.println(s);
            if(!s.equals("NA")) {
                String[] split = s.split(",");
                String[] position = split[0].split(Pattern.quote("("));
                split[1].split(Pattern.quote(")"));
                String[] line = split[1].split(Pattern.quote(")"));


                if (isNumeric(position[1]) && isNumeric(line[0])) {
                    newRow.add(position[1]);
                    newRow.add(line[0]);
                    newData.add(newRow);
                }
            }

        }
        newData.size();

        File tmpFile = null;
        try {
            tmpFile = File.createTempFile("test", ".tmp");
            FileWriter writer = new FileWriter(tmpFile);

            String firstLine = rawPosition.stream()
                    .collect(Collectors.joining(","));

            writer.write(firstLine);
            writer.write(System.lineSeparator());
            for(List<String> list : newData){
                String dataLine = list.stream()
                        .collect(Collectors.joining(","));
                writer.write(dataLine);
                writer.write(System.lineSeparator());

            }
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }


    }



    public static boolean isNumeric(String strNum) {
        return strNum.matches("-?\\d+(\\.\\d+)?");
    }

}
