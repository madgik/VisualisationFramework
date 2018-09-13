package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Graph;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.MMNode;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.TreeNode;
import gr.uoa.di.aginfra.data.analytics.visualization.model.services.VisualizationDataType;

import java.util.List;

public class DataSet {

	private VisualizationDataType dataType;

	private List<String> fields;

	private List<List<String>> data;

	private Graph graph;

	private TreeNode tree;

	private MMNode freeMind;

	private String JSON;

	public VisualizationDataType getDataType() {
		return dataType;
	}

	public void setDataType(VisualizationDataType dataType) {
		this.dataType = dataType;
	}

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

	public Graph getGraph() {
		return graph;
	}

	public void setGraph(Graph graph) {
		this.graph = graph;
	}

	public TreeNode getTree() {
		return tree;
	}

	public void setTree(TreeNode tree) {
		this.tree = tree;
	}

	public MMNode getFreeMind() {
		return freeMind;
	}

	public void setFreeMind(MMNode freeMind) {
		this.freeMind = freeMind;
	}

	public String getJSON() {
		return JSON;
	}

	public void setJSON(String JSON) {
		this.JSON = JSON;
	}
}
