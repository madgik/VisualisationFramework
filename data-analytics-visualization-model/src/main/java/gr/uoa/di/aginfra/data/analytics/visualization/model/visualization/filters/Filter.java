package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.filters;

import java.util.List;

public class Filter extends gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Filter {
	private List<String> options;

	public List<String> getOptions() {
		return options;
	}

	public void setOptions(List<String> options) {
		this.options = options;
	}
}
