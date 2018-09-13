package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.Date;
import java.util.List;

@JsonInclude(value = JsonInclude.Include.NON_NULL)
public class Configuration {

	private String id;

	private String label;

	private String description;

	private String vre;

	private VisualizationType type;

	private List<VisualizationType> availableTypes;

	private List<Join> joins;

	private List<DataSource> dataSources;

	private String groupBy;

	private String xAxis;//Line charts

	private String xAxisLabel;//Line charts

	private String yAxis;//Line charts

	private String yAxisLabel;//Line charts

	private String zAxis;//3d charts

	private String zAxisLabel;//3d charts

	private String labelField;//Pie charts

	private String valueField;//Pie charts

	private List<Parameter> parameters;

	private List<Filter> filters;

	private Configuration inner;

	private String colorField;

	private String documentField;

	private Date createdAt;

	private Date updatedAt;

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

	public String getVre() {
		return vre;
	}

	public void setVre(String vre) {
		this.vre = vre;
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

	public String getXAxis() {
		return xAxis;
	}

	public void setXAxis(String xAxis) {
		this.xAxis = xAxis;
	}

	public String getXAxisLabel() {
		return xAxisLabel;
	}

	public void setXAxisLabel(String xAxisLabel) {
		this.xAxisLabel = xAxisLabel;
	}

	public String getYAxis() {
		return yAxis;
	}

	public void setYAxis(String yAxis) {
		this.yAxis = yAxis;
	}

	public String getYAxisLabel() {
		return yAxisLabel;
	}

	public void setYAxisLabel(String yAxisLabel) {
		this.yAxisLabel = yAxisLabel;
	}

	public String getZAxis() {
		return zAxis;
	}

	public void setZAxis(String zAxis) {
		this.zAxis = zAxis;
	}

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

	public Configuration getInner() {
		return inner;
	}

	public void setInner(Configuration inner) {
		this.inner = inner;
	}

	public List<Filter> getFilters() {
		return filters;
	}

	public void setFilters(List<Filter> filters) {
		this.filters = filters;
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

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}
}
