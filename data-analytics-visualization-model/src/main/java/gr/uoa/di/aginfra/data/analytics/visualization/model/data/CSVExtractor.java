package gr.uoa.di.aginfra.data.analytics.visualization.model.data;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataSource;
import gr.uoa.di.aginfra.data.analytics.visualization.model.helpers.CSVReader;
import gr.uoa.di.aginfra.data.analytics.visualization.model.services.VisualizationDataType;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

@Deprecated
public class CSVExtractor implements DataSetExtractor {

	@Override
	public DataSet extract(DataSource dataSource, VisualizationDataType dataType) throws Exception {
		if (dataType != VisualizationDataType.TimeSeries && dataType != VisualizationDataType.BarChart)
			throw new Exception("Only time series can be read by a csv file");
		DataSet dataSet = new DataSet();
		String[][] rows = CSVReader.readCSV(CSVReader.readStream(new FileInputStream(dataSource.getSource())));
		if (rows.length == 0) throw new Exception("Empty csv provided " + dataSource.getSource());
		setDataSetFields(dataSet, rows[0]);
		setData(dataSet, rows);
		return dataSet;
	}

	private void setDataSetFields(DataSet dataSet, String[] row) {
		List<String> fields = new ArrayList<>();

		for (String field : row) {
			fields.add(field);
		}

		dataSet.setFields(fields);
	}

	private void setData(DataSet dataSet, String[][] rows) {
		List<List<String>> data = new ArrayList<>();

		for (int i = 1; i < rows.length; i++) {
			List<String> dataRow = new ArrayList<>();
			for (String item : rows[i]) {
				dataRow.add(item);
			}
			data.add(dataRow);
		}

		dataSet.setData(data);
	}
}
