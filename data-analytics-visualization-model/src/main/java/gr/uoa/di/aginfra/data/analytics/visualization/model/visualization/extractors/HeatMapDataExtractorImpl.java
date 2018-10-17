package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.extractors;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Key;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSetManipulator;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.HeatMapData;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.ThreeDData;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class HeatMapDataExtractorImpl extends DataSetManipulator implements HeatMapDataExtractor {

    public HeatMapData extract(DataSet dataSet, String xAxisField, String yAxisField, String zAxisField) throws Exception {

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

        for(String y: yAxisData){
            List<Integer> zListRow = new ArrayList<>();
            for(String x: xAxisData){
                List<String> combinationValue = uniqueFieldCombinations.get(new Key(x, y));
                if( combinationValue != null){
                    Double total = combinationValue.stream().filter(e -> e.chars().allMatch(Character::isDigit))
                            .mapToInt(i -> Integer.valueOf(i)).average().getAsDouble();
                    zListRow.add(total.intValue());
                }
                else
                    zListRow.add(null);
            }
            zAxisData.add(zListRow);
        }

        heatMapData.setXAxis(xAxisData);
        heatMapData.setYAxis(yAxisData);
        heatMapData.setZAxis(zAxisData);

        return heatMapData;
    }
}