package gr.uoa.di.aginfra.data.analytics.visualization.service.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.*;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.NotNull;
import java.util.List;

public class ConfigurationDto {

    private String id;

    @NotBlank(message = "Label must not be blank!")
    private String label;

    private String description;

	@NotNull(message = "Visualization type should be specified!")
	private VisualizationType type;

    private List<VisualizationType> availableTypes;

	private List<Join> joins;

    private List<DataSource> dataSources;

    private String groupBy;

    private String xAxis;

    private String xAxisLabel;

    private String yAxis;

    private String yAxisLabel;

    private String zAxis;

    private String zAxisLabel;

    private String labelField;//Pie charts

    private String valueField;//Pie charts

    private List<Parameter> parameters;

    private List<Filter> filters;

    private String colorField;

	private String documentField;

    private ConfigurationDto inner;

    private Transformation transformations;

    public Transformation getTransformations() {
        return transformations;
    }

    public void setTransformations(Transformation transformations) {
        this.transformations = transformations;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public VisualizationType getType() {
        return type;
    }

    public void setType(VisualizationType type) {
        this.type = type;
    }

    public List<VisualizationType> getAvailableTypes() {
        return availableTypes;
    }

    public void setAvailableTypes(List<VisualizationType> availableTypes) {
        this.availableTypes = availableTypes;
    }

	public List<Join> getJoins() {
		return joins;
	}

	public void setJoins(List<Join> joins) {
		this.joins = joins;
	}

    public List<DataSource> getDataSources() {
        return dataSources;
    }

    public void setDataSources(List<DataSource> dataSources) {
        this.dataSources = dataSources;
    }

    public String getGroupBy() {
        return groupBy;
    }

    public void setGroupBy(String groupBy) {
        this.groupBy = groupBy;
    }

    @JsonProperty("xAxis")
    public String getXAxis() {
        return xAxis;
    }

    public void setXAxis(String xAxis) {
        this.xAxis = xAxis;
    }

    @JsonProperty("xAxisLabel")
    public String getXAxisLabel() {
        return xAxisLabel;
    }

    public void setXAxisLabel(String xAxisLabel) {
        this.xAxisLabel = xAxisLabel;
    }

    @JsonProperty("yAxis")
    public String getYAxis() {
        return yAxis;
    }

    public void setYAxis(String yAxis) {
        this.yAxis = yAxis;
    }

    @JsonProperty("yAxisLabel")
    public String getYAxisLabel() {
        return yAxisLabel;
    }

    public void setYAxisLabel(String yAxisLabel) {
        this.yAxisLabel = yAxisLabel;
    }

	@JsonProperty("zAxis")
	public String getZAxis() {
		return zAxis;
	}

	public void setZAxis(String zAxis) {
		this.zAxis = zAxis;
	}

	@JsonProperty("zAxisLabel")
	public String getZAxisLabel() {
		return zAxisLabel;
	}

	public void setZAxisLabel(String zAxisLabel) {
		this.zAxisLabel = zAxisLabel;
	}

	public String getLabelField() {
		return labelField;
	}

	public void setLabelField(String labelField) {
		this.labelField = labelField;
	}

	public String getValueField() {
		return valueField;
	}

	public void setValueField(String valueField) {
		this.valueField = valueField;
	}

    public List<Parameter> getParameters() {
        return parameters;
    }

    public void setParameters(List<Parameter> parameters) {
        this.parameters = parameters;
    }

	public String getColorField() {
		return colorField;
	}

	public void setColorField(String colorField) {
		this.colorField = colorField;
	}

    public String getDocumentField() {
        return documentField;
    }

    public void setDocumentField(String documentField) {
        this.documentField = documentField;
    }

    public List<Filter> getFilters() {
        return filters;
    }

    public void setFilters(List<Filter> filters) {
        this.filters = filters;
    }


    public ConfigurationDto getInner() {
        return inner;
    }

    public void setInner(ConfigurationDto inner) {
        this.inner = inner;
    }
}
