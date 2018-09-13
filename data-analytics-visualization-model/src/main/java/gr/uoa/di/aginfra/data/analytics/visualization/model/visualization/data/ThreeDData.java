package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;
import java.util.List;

public class ThreeDData {
	private List<BigDecimal> xAxis;
	private List<BigDecimal> yAxis;
	private List<BigDecimal> zAxis;

	@JsonProperty("xAxis")
	public List<BigDecimal> getXAxis() {
		return xAxis;
	}

	public void setXAxis(List<BigDecimal> xAxis) {
		this.xAxis = xAxis;
	}

	@JsonProperty("yAxis")
	public List<BigDecimal> getYAxis() {
		return yAxis;
	}

	public void setYAxis(List<BigDecimal> yAxis) {
		this.yAxis = yAxis;
	}

	@JsonProperty("zAxis")
	public List<BigDecimal> getZAxis() {
		return zAxis;
	}

	public void setZAxis(List<BigDecimal> zAxis) {
		this.zAxis = zAxis;
	}
}
