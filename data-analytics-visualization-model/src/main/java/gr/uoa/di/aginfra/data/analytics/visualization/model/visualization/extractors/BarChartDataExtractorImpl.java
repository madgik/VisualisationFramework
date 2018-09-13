package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.extractors;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Configuration;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.BarChartData;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSetManipulator;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.*;

@Component
public class BarChartDataExtractorImpl extends DataSetManipulator implements BarChartDataExtractor {

	public BarChartData extract(DataSet dataSet, Configuration configuration) throws Exception {

		String groupBy = configuration.getGroupBy(),
				xAxisField = configuration.getXAxis(),
				yAxisField = configuration.getYAxis(),
				colorField = configuration.getColorField();

		int groupByIndex = -1;
		if (groupBy != null && !groupBy.isEmpty()) {
			groupByIndex = getFieldIndex(dataSet, groupBy);
		}

		int xAxisFieldIndex = -1;
		if (xAxisField == null || (xAxisFieldIndex = getFieldIndex(dataSet, xAxisField)) == -1) {
			throw new Exception("Invalid data field provided " + xAxisField);
		}

		int yAxisFieldIndex = -1;
		if (yAxisField == null || (yAxisFieldIndex = getFieldIndex(dataSet, yAxisField)) == -1) {
			throw new Exception("Invalid data field provided " + yAxisField);
		}

		int colorIndex = -1;
		if (colorField != null) {
			colorIndex = getFieldIndex(dataSet, colorField);
		}

		return extractBarChartData(dataSet, groupByIndex, xAxisFieldIndex, yAxisFieldIndex, colorIndex);
	}

	private BarChartData extractBarChartData(DataSet dataSet,
											 int groupByIndex,
											 int xAxisFieldIndex,
											 int yAxisFieldIndex,
											 int colorIndex) {

		BarChartData barChartData = new BarChartData();

		XAxisGroupsAndMap xAxisGroupsAndMap = extactXAxisGroups(dataSet, xAxisFieldIndex);
		barChartData.setxAxisGroups(xAxisGroupsAndMap.xAxisGroups);

		Collection<BarChartData.DataSet> dataSets = groupByIndex < 0 ?
				extractNoGrouping(dataSet, xAxisGroupsAndMap, xAxisFieldIndex, yAxisFieldIndex, colorIndex) :
				extractByGrouping(dataSet, xAxisGroupsAndMap, groupByIndex, xAxisFieldIndex, yAxisFieldIndex, colorIndex);

		barChartData.setDataSets(dataSets);

		return barChartData;
	}

	private Collection<BarChartData.DataSet> extractNoGrouping(DataSet dataSet,
															   XAxisGroupsAndMap xAxisGroupsAndMap,
															   int xAxisFieldIndex,
															   int yAxisFieldIndex,
															   int colorIndex) {

		BarChartData.DataSet singleDataSet = createDataset("All", xAxisGroupsAndMap.xAxisGroupsMap.size());

		for (List<String> row : dataSet.getData()) {
			String xAxisGroup = row.get(xAxisFieldIndex);

			List<BigDecimal> yAxisData = singleDataSet.getData();
			try {
				yAxisData.set(xAxisGroupsAndMap.xAxisGroupsMap.get(xAxisGroup), new BigDecimal(row.get(yAxisFieldIndex)));
			} catch (NumberFormatException ex) {
			}

			if (colorIndex > -1 && singleDataSet.getColor() == null)
				singleDataSet.setColor(row.get(colorIndex));
		}

		List<BarChartData.DataSet> list = new ArrayList<>();
		list.add(singleDataSet);
		return list;
	}

	private Collection<BarChartData.DataSet> extractByGrouping(DataSet dataSet,
															   XAxisGroupsAndMap xAxisGroupsAndMap,
															   int groupByIndex,
															   int xAxisFieldIndex,
															   int yAxisFieldIndex,
															   int colorIndex) {

		Map<String, BarChartData.DataSet> dataSets = new HashMap<>();

		for (List<String> row : dataSet.getData()) {
			String group = row.get(groupByIndex);
			String xAxisGroup = row.get(xAxisFieldIndex);

			BarChartData.DataSet chartDataSet = getOrCreateDataset(dataSets, group, xAxisGroupsAndMap.xAxisGroupsMap.size());
			List<BigDecimal> yAxisData = chartDataSet.getData();
			try {
				yAxisData.set(xAxisGroupsAndMap.xAxisGroupsMap.get(xAxisGroup), new BigDecimal(row.get(yAxisFieldIndex)));
			} catch (NumberFormatException ex) {
			}

			if (colorIndex > -1 && chartDataSet.getColor() == null)
				chartDataSet.setColor(row.get(colorIndex));
		}

		return dataSets.values();
	}

	private XAxisGroupsAndMap extactXAxisGroups(DataSet dataSet, int xAxisFieldIndex) {
		List<String> xAxisGroups = new ArrayList<>();
		HashMap<String, Integer> xAxisGroupsMap = new HashMap<>();
		int idx = 0;
		for (List<String> row : dataSet.getData()) {
			String xAxisGroup = row.get(xAxisFieldIndex);
			if (xAxisGroupsMap.containsKey(xAxisGroup)) continue;
			xAxisGroupsMap.put(xAxisGroup, idx++);
			xAxisGroups.add(xAxisGroup);
		}
		XAxisGroupsAndMap struct = new XAxisGroupsAndMap();
		struct.xAxisGroups = xAxisGroups;
		struct.xAxisGroupsMap = xAxisGroupsMap;
		return struct;
	}

	private class XAxisGroupsAndMap {
		List<String> xAxisGroups;
		HashMap<String, Integer> xAxisGroupsMap;
	}

	private BarChartData.DataSet getOrCreateDataset(Map<String, BarChartData.DataSet> available, String name, int groups) {
		if (available.containsKey(name)) return available.get(name);

		BarChartData.DataSet barChartData = createDataset(name, groups);

		available.put(name, barChartData);

		return barChartData;
	}

	private BarChartData.DataSet createDataset(String name, int groups) {
		BarChartData.DataSet barChartData = new BarChartData.DataSet(name);
		List<BigDecimal> data = new ArrayList<>();
		for (int i = 0; i < groups; i++) {
			data.add(new BigDecimal(0));
		}
		barChartData.setData(data);
		return barChartData;
	}
}

