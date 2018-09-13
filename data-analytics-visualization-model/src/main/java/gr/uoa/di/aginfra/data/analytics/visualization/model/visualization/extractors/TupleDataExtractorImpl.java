package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.extractors;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Configuration;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.BarChartData;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSetManipulator;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.Tuple;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.*;

@Component
public class TupleDataExtractorImpl extends DataSetManipulator implements TupleDataExtractor {

	public Collection<Tuple> extract(DataSet dataSet, Configuration configuration) throws Exception {

		String labelField = configuration.getLabelField(),
				valueField = configuration.getValueField(),
				colorField = configuration.getColorField();

		int labelFieldIndex = -1;
		if (labelField == null || (labelFieldIndex = getFieldIndex(dataSet, labelField)) == -1) {
			throw new Exception("Invalid data field provided " + labelField);
		}

		int valueFieldIndex = -1;
		if (valueField == null || (valueFieldIndex = getFieldIndex(dataSet, valueField)) == -1) {
			throw new Exception("Invalid data field provided " + valueField);
		}

		int colorIndex = -1;
		if (colorField != null) {
			colorIndex = getFieldIndex(dataSet, colorField);
		}

		return extractData(dataSet, labelFieldIndex, valueFieldIndex, colorIndex);
	}

	private Collection<Tuple> extractData(DataSet dataSet, int labelFieldIndex, int valueFieldIndex, int colorIndex) {
		Collection<Tuple> result = new ArrayList<>();
		for (List<String> row : dataSet.getData()) {
			String label = row.get(labelFieldIndex);
			BigDecimal value = parseBigDecimal(row.get(valueFieldIndex));
			String color = null;
			if (colorIndex > -1)
				color = row.get(colorIndex);

			if (label == null || value == null) continue;

			result.add(new Tuple(label, value, color));
		}
		return result;
	}
}

