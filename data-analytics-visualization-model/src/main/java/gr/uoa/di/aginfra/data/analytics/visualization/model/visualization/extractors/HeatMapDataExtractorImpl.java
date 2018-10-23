package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.extractors;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Key;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSetManipulator;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.HeatMapData;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.filters.DataSetFilterApplier;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Component
public class HeatMapDataExtractorImpl extends DataSetManipulator implements HeatMapDataExtractor {

    public HeatMapData extract(DataSet dataSet, String xAxisField, String yAxisField, String zAxisField, String groupByField, Map<String, String> filters, DataSetFilterApplier dataSetFilterApplier) throws Exception {

        int xAxisFieldIndex = -1;
        if (xAxisField == null || (xAxisFieldIndex = getFieldIndex(dataSet, xAxisField)) == -1) {
            throw new Exception("Invalid data field provided " + xAxisField);
        }

        int yAxisFieldIndex = -1;
        if (yAxisField == null || (yAxisFieldIndex = getFieldIndex(dataSet, yAxisField)) == -1) {
            throw new Exception("Invalid data field provided " + yAxisField);
        }

        int zAxisFieldIndex = -1;
        if (zAxisField == null || (zAxisFieldIndex = getFieldIndex(dataSet, zAxisField)) == -1) {
            throw new Exception("Invalid data field provided " + zAxisField);
        }

        return extract(dataSet, xAxisFieldIndex, yAxisFieldIndex, zAxisFieldIndex);
    }

    private HeatMapData extract(DataSet dataSet, int xAxisFieldIndex, int yAxisFieldIndex, int zAxisFieldIndex) {

        HeatMapData  heatMapData = new HeatMapData();
       // heatMapData.setGroupByDistinctValues(new ArrayList<>(distinctGroupByValues));
        List<String> xAxisData = new ArrayList<>();
        List<String> yAxisData = new ArrayList<>();
        List<List<Integer>> zAxisData = new ArrayList<>();

        Map<Key, List<String>> uniqueFieldCombinations = new HashMap<>();

        for (List<String> row : dataSet.getData()) {
            String xValue = row.get(xAxisFieldIndex);
            String yValue = row.get(yAxisFieldIndex);
            String zValue = row.get(zAxisFieldIndex);
            if (xValue == null || yValue == null || zValue == null) continue;

            Key key = new Key(xValue,yValue);
            if(uniqueFieldCombinations.containsKey(key))
                uniqueFieldCombinations.get(key).add(zValue);
            else{
                List<String> list = new ArrayList<>();
                list.add(zValue);
                uniqueFieldCombinations.put(key, list);
                if(!xAxisData.contains(xValue))
                    xAxisData.add(xValue);
                if(!yAxisData.contains(yValue))
                    yAxisData.add(yValue);
            }
        }

        try {
            List<Integer> xAxisDataInteger = xAxisData.stream()
                    .map(Integer::valueOf).sorted()
                    .collect(Collectors.toList());
            xAxisData = xAxisDataInteger.stream().map(String::valueOf).collect(Collectors.toList());
        }
        catch (NumberFormatException exception) {
            xAxisData = xAxisData.stream().sorted().collect(Collectors.toList());
        }

        try {
            List<Integer> yAxisDataInteger = yAxisData.stream()
                    .map(Integer::valueOf).sorted()
                    .collect(Collectors.toList());
            yAxisData = yAxisDataInteger.stream().map(String::valueOf).collect(Collectors.toList());
        }
        catch (NumberFormatException exception) {
            yAxisData = yAxisData.stream().sorted().collect(Collectors.toList());
        }

        for(String y: yAxisData){
            List<Integer> zListRow = new ArrayList<>();
            for(String x: xAxisData){
                List<String> combinationValue = uniqueFieldCombinations.get(new Key(x, y));
                if( combinationValue != null){
                    System.out.println(combinationValue.toString());
                    OptionalDouble total = combinationValue.stream().filter(e -> e.chars().allMatch(Character::isDigit))
                            .mapToInt(i -> Integer.valueOf(i)).average();
                    if(total.isPresent()){
                        Double average = total.getAsDouble();
                        zListRow.add(average.intValue());
                    }
                    else
                        zListRow.add(null);
                }
                else
                    zListRow.add(null);
            }
            System.out.println(zListRow.toString());
            zAxisData.add(zListRow);
        }

        heatMapData.setXAxis(xAxisData);
        heatMapData.setYAxis(yAxisData);
        heatMapData.setZAxis(zAxisData);

        return heatMapData;
    }
}