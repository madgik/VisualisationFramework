package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Graph;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.MMNode;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.TreeNode;
import gr.uoa.di.aginfra.data.analytics.visualization.model.services.VisualizationDataType;

import java.util.List;

public class TabularData {

	private List<String> fields;

	private List<List<String>> data;

	public List<String> getFields() {
		return fields;
	}

	public void setFields(List<String> fields) {
		this.fields = fields;
	}

	public List<List<String>> getData() {
		return data;
	}

	public void setData(List<List<String>> data) {
		this.data = data;
	}
}
