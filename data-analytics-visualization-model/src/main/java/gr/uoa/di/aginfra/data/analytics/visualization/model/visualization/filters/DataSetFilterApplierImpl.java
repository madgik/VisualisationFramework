package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.filters;

import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSetManipulator;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
public class DataSetFilterApplierImpl extends DataSetManipulator implements DataSetFilterApplier {

	@Override
	public void applyFilters(DataSet dataSet, Map<String, String> filters) throws Exception {
		if (filters == null || filters.isEmpty()) return;

		for (Map.Entry<String, String> filter : filters.entrySet()) {
			String filterField = filter.getKey();

			int filterFieldIndex = -1;
			if (filterField == null || (filterFieldIndex = getFieldIndex(dataSet, filterField)) == -1) {
				throw new Exception("Invalid data field provided " + filterField);
			}

			String filterValue = filter.getValue();
			if (filterValue == null) continue;

			HashSet<String> filterValues = new HashSet<>(Arrays.stream(filterValue.split(";"))
					.map(x -> x.toLowerCase())
					.collect(Collectors.toList()));

			if (filterValues.isEmpty()) continue;

			List<List<String>> results = new ArrayList<>();
			for (List<String> row : dataSet.getData()) {
				String value = row.get(filterFieldIndex);

				if (filterValues.contains(value.toLowerCase()))
					results.add(row);
			}
			dataSet.setData(results);
		}
	}
}
