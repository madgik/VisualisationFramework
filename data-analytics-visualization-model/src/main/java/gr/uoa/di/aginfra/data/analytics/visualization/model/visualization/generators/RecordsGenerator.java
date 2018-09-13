package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.generators;

import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.Visualization;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.filters.Filter;

import java.util.Collection;
import java.util.Map;

public class RecordsGenerator {

	protected boolean hasNonFilledInRequiredFilter(Visualization visualization, Map<String, String> filters) {
		if (visualization.getFilters() == null) return false;
		for (Filter filter : visualization.getFilters()) {
			if (filter.isRequired()) {
				if (!filters.containsKey(filter.getField())) return true;
				if (filters.get(filter.getField()) == null || filters.get(filter.getField()).isEmpty()) return true;
			}
		}
		return false;
	}
}
