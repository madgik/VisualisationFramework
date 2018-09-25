package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions;

import java.util.List;

public class Transformation {

    private String transformationLabel, transformationLabelValue;
    private List<String> transformationColumns;

    public String getTransformationLabel() {
        return transformationLabel;
    }

    public void setTransformationLabel(String transformationLabel) {
        this.transformationLabel = transformationLabel;
    }

    public String getTransformationLabelValue() {
        return transformationLabelValue;
    }

    public void setTransformationLabelValue(String transformationLabelValue) {
        this.transformationLabelValue = transformationLabelValue;
    }

    public List<String> getTransformationColumns() {
        return transformationColumns;
    }

    public void setTransformationColumns(List<String> transformationColumns) {
        this.transformationColumns = transformationColumns;
    }
}
