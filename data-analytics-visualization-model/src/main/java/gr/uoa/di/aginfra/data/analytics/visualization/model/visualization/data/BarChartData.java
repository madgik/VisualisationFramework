package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;

public class BarChartData {

	public static class DataSet {

		private String name;

		private String color;

		private List<BigDecimal> data;

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

		public List<BigDecimal> getData() {
			return data;
		}

		public void setData(List<BigDecimal> data) {
			this.data = data;
		}

		public DataSet(String name) {
			this.name = name;
		}
	}

	private List<String> xAxisGroups;

	private Collection<BarChartData.DataSet> dataSets;

	public List<String> getxAxisGroups() {
		return xAxisGroups;
	}

	public void setxAxisGroups(List<String> xAxisGroups) {
		this.xAxisGroups = xAxisGroups;
	}

	public Collection<BarChartData.DataSet> getDataSets() {
		return dataSets;
	}

	public void setDataSets(Collection<BarChartData.DataSet> dataSets) {
		this.dataSets = dataSets;
	}
}
