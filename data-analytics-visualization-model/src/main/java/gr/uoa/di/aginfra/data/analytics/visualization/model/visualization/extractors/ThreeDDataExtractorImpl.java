package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.extractors;

import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSetManipulator;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.ThreeDData;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.*;

@Component
public class ThreeDDataExtractorImpl extends DataSetManipulator implements ThreeDDataExtractor {

	public ThreeDData extract(DataSet dataSet, String xAxisField, String yAxisField, String zAxisField) throws Exception {

		int xAxisFieldIndex = -1;
		if (xAxisField == null || (xAxisFieldIndex = getFieldIndex(dataSet, xAxisField)) == -1) {
			throw new Exception("Invalid data field provided " + xAxisField);
		}

		int yAxisFieldIndex = -1;
		if (yAxisField == null || (yAxisFieldIndex = getFieldIndex(dataSet, yAxisField)) == -1) {
			throw new Exception("Invalid data field provided " + yAxisField);
		}

		int zAxisFieldIndex = -1;
		if (zAxisField == null || (zAxisFieldIndex = getFieldIndex(dataSet, zAxisField)) == -1) {
			throw new Exception("Invalid data field provided " + zAxisField);
		}

		return extract(dataSet, xAxisFieldIndex, yAxisFieldIndex, zAxisFieldIndex);
	}

	private ThreeDData extract(DataSet dataSet, int xAxisFieldIndex, int yAxisFieldIndex, int zAxisFieldIndex) {
		ThreeDData threeDData = new ThreeDData();
		List<BigDecimal> xAxisData = new ArrayList<>();
		List<BigDecimal> yAxisData = new ArrayList<>();
		List<BigDecimal> zAxisData = new ArrayList<>();

		for (List<String> row : dataSet.getData()) {
			BigDecimal xValue = parseBigDecimal(row.get(xAxisFieldIndex));
			BigDecimal yValue = parseBigDecimal(row.get(yAxisFieldIndex));
			BigDecimal zValue = parseBigDecimal(row.get(zAxisFieldIndex));

			if (xValue == null || yValue == null || zValue == null) continue;

			xAxisData.add(xValue);
			yAxisData.add(yValue);
			zAxisData.add(zValue);
		}

		threeDData.setXAxis(xAxisData);
		threeDData.setYAxis(yAxisData);
		threeDData.setZAxis(zAxisData);

		return threeDData;
	}
}
