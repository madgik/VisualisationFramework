package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.filters;

import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSetManipulator;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
public class FilterOptionsExtractorImpl extends DataSetManipulator implements FilterOptionsExtractor {

	@Override
	public List<String> extract(DataSet dataSet, String filterField) throws Exception {
		int filterFieldIndex = -1;
		if(filterField == null || (filterFieldIndex = getFieldIndex(dataSet, filterField)) == -1) {
			throw new Exception("Invalid data field provided " + filterField);
		}

		HashSet<String> options = new HashSet<>();
		for (List<String> row : dataSet.getData()) {
			options.add(row.get(filterFieldIndex));
		}

		return options.stream().filter(s -> s != null && !s.isEmpty()).sorted().collect(Collectors.toList());
	}
}
