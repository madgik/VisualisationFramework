package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;
import java.util.List;

public class HeatMapData {

    private List<String> xAxis;
    private List<String> yAxis;
    private List<List<Integer>> zAxis;
    private List<String> groupByDistinctValues;

    @JsonProperty("groupByDistinctValues")
    public List<String> getGroupByDistinctValues() { return groupByDistinctValues; }

    public void setGroupByDistinctValues(List<String> groupByDistinctValues) { this.groupByDistinctValues = groupByDistinctValues; }

    @JsonProperty("xAxis")
    public List<String> getXAxis() {
        return xAxis;
    }

    public void setXAxis(List<String> xAxis) {
        this.xAxis = xAxis;
    }

    @JsonProperty("yAxis")
    public List<String> getYAxis() {
        return yAxis;
    }

    public void setYAxis(List<String> yAxis) {
        this.yAxis = yAxis;
    }

    @JsonProperty("zAxis")
    public List<List<Integer>> getZAxis() {
        return zAxis;
    }

    public void setZAxis(List<List<Integer>> zAxis) {
        this.zAxis = zAxis;
    }

}