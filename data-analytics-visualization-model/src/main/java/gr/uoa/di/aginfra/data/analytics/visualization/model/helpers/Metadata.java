package gr.uoa.di.aginfra.data.analytics.visualization.model.helpers;

public class Metadata {
    private String column_name;
    private String description;
    private String units;

    public String getColumn_name() { return column_name; }

    public void setColumn_name(String column_name) { this.column_name = column_name; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public String getUnits() { return units; }

    public void setUnits(String units) { this.units = units; }
}
