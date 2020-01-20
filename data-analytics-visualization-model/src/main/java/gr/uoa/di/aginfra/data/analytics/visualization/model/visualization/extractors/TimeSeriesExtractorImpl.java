package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.extractors;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Configuration;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.AxisDataType;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSetManipulator;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.TimeSeries;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.*;

@Component
public class TimeSeriesExtractorImpl extends DataSetManipulator implements TimeSeriesExtractor {

	public Collection<TimeSeries> extract(DataSet dataSet, Configuration configuration) throws Exception {
		boolean hasGrouping = true;

		String groupBy = configuration.getGroupBy(),
				xAxisField = configuration.getXAxis(),
				yAxisField = configuration.getYAxis(),
				colorField = configuration.getColorField(),
				documentField = configuration.getDocumentField();

		int groupByIndex = -1;
		if (groupBy == null || (groupByIndex = getFieldIndex(dataSet, groupBy)) == -1) {
			hasGrouping = false;
		}

		int xAxisFieldIndex;
		if (xAxisField == null || (xAxisFieldIndex = getFieldIndex(dataSet, xAxisField)) == -1) {
			throw new Exception("Invalid data field provided " + xAxisField);
		}

		int yAxisFieldIndex;
		if (yAxisField == null || (yAxisFieldIndex = getFieldIndex(dataSet, yAxisField)) == -1) {
			throw new Exception("Invalid data field provided " + yAxisField);
		}

		int documentIndex = -1;
		if (documentField != null) {
			documentIndex = getFieldIndex(dataSet, documentField);
		}

		int colorIndex = -1;
		if (colorField != null) {
			colorIndex = getFieldIndex(dataSet, colorField);
		}

		return hasGrouping ?
				extractByGrouping(dataSet, groupByIndex, xAxisFieldIndex, yAxisFieldIndex, documentIndex, colorIndex) :
				extractNoGrouping(dataSet, xAxisFieldIndex, yAxisFieldIndex, documentIndex, colorIndex);
	}

	private Collection<TimeSeries> extractNoGrouping(DataSet dataSet,
													 int xAxisFieldIndex,
													 int yAxisFieldIndex,
													 int documentIndex,
													 int colorIndex) {
		TimeSeries timeSeries = new TimeSeries("All");
		List<Object> xAxisData = timeSeries.getXAxisData();
		List<BigDecimal> yAxisData = timeSeries.getYAxisData();
		List<String> documents = timeSeries.getDocuments();

		boolean isXAxisDate = isXAxisDate(dataSet, xAxisFieldIndex);
		timeSeries.setXAxisDataType(isXAxisDate ? AxisDataType.Date : AxisDataType.Decimal);

		for (List<String> row : dataSet.getData()) {
			Object xValue = isXAxisDate ?
					parseDate(row.get(xAxisFieldIndex)) :
					parseBigDecimal(row.get(xAxisFieldIndex));
			BigDecimal yValue = parseBigDecimal(row.get(yAxisFieldIndex));

			if (xValue == null || yValue == null) continue;

			xAxisData.add(xValue);
			yAxisData.add(yValue);

			if (documentIndex > -1)
				documents.add(row.get(documentIndex));

			if (colorIndex > -1 && timeSeries.getColor() == null)
				timeSeries.setColor(row.get(colorIndex));
		}

		List<TimeSeries> list = new ArrayList<>();
		list.add(timeSeries);
		ObjectMapper mapper = new ObjectMapper();
		try {
			String json = mapper.writeValueAsString(timeSeries);
			//System.out.println("JSON = " + json);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return list;
	}

	private Collection<TimeSeries> extractByGrouping(DataSet dataSet,
													 int groupByIndex,
													 int xAxisFieldIndex,
													 int yAxisFieldIndex,
													 int documentIndex,
													 int colorIndex) {
		Map<String, TimeSeries> timeSeries = new HashMap<>();

		boolean isXAxisDate = isXAxisDate(dataSet, xAxisFieldIndex);

		for (List<String> row : dataSet.getData()) {
			String group = row.get(groupByIndex);

			TimeSeries groupTimeSeries = getOrCreateTimeSeries(timeSeries, group);
			groupTimeSeries.setXAxisDataType(isXAxisDate ? AxisDataType.Date : AxisDataType.Decimal);

			List<Object> xAxisData = groupTimeSeries.getXAxisData();
			List<BigDecimal> yAxisData = groupTimeSeries.getYAxisData();
			List<String> documents = groupTimeSeries.getDocuments();

			Object xValue = isXAxisDate ?
					parseDate(row.get(xAxisFieldIndex)) :
					parseBigDecimal(row.get(xAxisFieldIndex));
			BigDecimal yValue = parseBigDecimal(row.get(yAxisFieldIndex));

			if (xValue == null || yValue == null) continue;

			xAxisData.add(xValue);
			yAxisData.add(yValue);

			if (documentIndex > -1)
				documents.add(row.get(documentIndex));

			if (colorIndex > -1 && groupTimeSeries.getColor() == null)
				groupTimeSeries.setColor(row.get(colorIndex));
		}
		return timeSeries.values();
	}

	private TimeSeries getOrCreateTimeSeries(Map<String, TimeSeries> available, String name) {
		if (available.containsKey(name)) return available.get(name);

		TimeSeries timeSeries = new TimeSeries(name);
		available.put(name, timeSeries);
		return timeSeries;
	}

	private boolean isXAxisDate(DataSet dataSet, int xAxisFieldIndex) {
		for (List<String> row : dataSet.getData()) {
			return parseDate(row.get(xAxisFieldIndex)) != null;
		}
		return false;
	}
}
