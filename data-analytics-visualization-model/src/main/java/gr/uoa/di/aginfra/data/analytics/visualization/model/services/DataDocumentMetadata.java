package gr.uoa.di.aginfra.data.analytics.visualization.model.services;

import com.mongodb.BasicDBList;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataType;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Graph;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.TreeNode;

import java.util.Date;
import java.util.List;

public class DataDocumentMetadata {

	private String id;

	private String name;

	private String vre;

	private List<String> fields;

	private DataType type;

	private boolean isDataReference;

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
