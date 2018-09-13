package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions;

public class Join {

	private String source;

	private String field;

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}

	public String getComposedField() {
		return source + "-" + field;
	}
}
