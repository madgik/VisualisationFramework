package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class TimeSeries {
	private String name;
	private String color;
	private AxisDataType xAxisDataType;
	private List<Object> xAxisData;
	private List<BigDecimal> yAxisData;
	private List<String> documents;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	@JsonProperty("xAxisDataType")
	public AxisDataType getXAxisDataType() {
		return xAxisDataType;
	}

	public void setXAxisDataType(AxisDataType xAxisDataType) {
		this.xAxisDataType = xAxisDataType;
	}

	public List<Object> getXAxisData() {
		return xAxisData;
	}

	public void setXAxisData(List<Object> xAxisData) {
		this.xAxisData = xAxisData;
	}

	public List<BigDecimal> getYAxisData() {
		return yAxisData;
	}

	public void setYAxisData(List<BigDecimal> yAxisData) {
		this.yAxisData = yAxisData;
	}

	public List<String> getDocuments() {
		return documents;
	}

	public void setDocuments(List<String> documents) {
		this.documents = documents;
	}

	public TimeSeries(String name) {
		this.name = name;
		this.xAxisData = new ArrayList<>();
		this.yAxisData = new ArrayList<>();
		this.documents = new ArrayList<>();
	}
}
