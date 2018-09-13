package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data;

import java.math.BigDecimal;

public class Tuple {

	private String label;

	private BigDecimal value;

	private String color;

	public Tuple() {

	}

	public Tuple(String label, BigDecimal value, String color) {
		this.label = label;
		this.value = value;
		this.color = color;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public BigDecimal getValue() {
		return value;
	}

	public void setValue(BigDecimal value) {
		this.value = value;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}
}
