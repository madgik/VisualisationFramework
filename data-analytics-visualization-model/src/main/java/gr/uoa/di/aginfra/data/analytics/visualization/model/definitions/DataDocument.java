package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions;

import java.util.Date;
import java.util.List;
import java.util.Map;

public class DataDocument {

	private String id;

	private String name;

	private String vre;

	private List<String> fields;

	private DataType type;

	private boolean isDataReference;//e.g. images that are displayed when the user clicks on chart

	private List<Map<String, String>> records;

	private Graph graph;

	private NetGraph netGraph;

	private TreeNode tree;

	private MMNode freeMind;

	private byte[] rawBytes;

	private String JSON;

	private Date createdAt;

	private Date updatedAt;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getVre() {
		return vre;
	}

	public void setVre(String vre) {
		this.vre = vre;
	}

	public List<String> getFields() {
		return fields;
	}

	public void setFields(List<String> fields) {
		this.fields = fields;
	}

	public DataType getType() {
		return type;
	}

	public void setType(DataType type) {
		this.type = type;
	}

	public boolean isDataReference() {
		return isDataReference;
	}

	public void setDataReference(boolean isDataReference) {
		this.isDataReference = isDataReference;
	}

	public List<Map<String, String>> getRecords() {
		return records;
	}

	public void setRecords(List<Map<String, String>> records) {
		this.records = records;
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

	public byte[] getRawBytes() {
		return rawBytes;
	}

	public void setRawBytes(byte[] rawBytes) {
		this.rawBytes = rawBytes;
	}

	public String getJSON() {
		return JSON;
	}

	public void setJSON(String JSON) {
		this.JSON = JSON;
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

	public NetGraph getNetGraph() {
		return netGraph;
	}

	public void setNetGraph(NetGraph netGraph) {
		this.netGraph = netGraph;
	}
}
