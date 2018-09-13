package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions;

import java.util.List;

public class DataSource {

	private String name;

	private DataSourceType type;

	private String source;

	private List<String> fields;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public DataSourceType getType() {
		return type;
	}

	public void setType(DataSourceType type) {
		this.type = type;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public List<String> getFields() {
		return fields;
	}

	public void setFields(List<String> fields) {
		this.fields = fields;
	}
}
