package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions;

import java.util.List;

public class UnpivotStructure {

    private List<String> columnsToUnpivot;
    private String newColumnName, newColumnValue;
    private List<Integer> columnsPosition;

    public List<Integer> getColumnsPosition() {
        return columnsPosition;
    }

    public void setColumnsPosition(List<Integer> columnsPosition) {
        this.columnsPosition = columnsPosition;
    }

    public List<String> getColumnsToUnpivot() {
        return columnsToUnpivot;
    }

    public void setColumnsToUnpivot(List<String> columnsToUnpivot) {
        this.columnsToUnpivot = columnsToUnpivot;
    }

    public String getNewColumnName() {
        return newColumnName;
    }

    public void setNewColumnName(String newColumnName) {
        this.newColumnName = newColumnName;
    }

    public String getNewColumnValue() {
        return newColumnValue;
    }

    public void setNewColumnValue(String newColumnValue) {
        this.newColumnValue = newColumnValue;
    }
}
