package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class DataSetManipulator {

	protected int getFieldIndex(DataSet dataSet, String fieldToSearch) {
		List<String> fields = dataSet.getFields();
		int i = 0;
		boolean found = false;
		for (String field : fields) {
			if (field.equals(fieldToSearch)) {
				found = true;
				break;
			}
			i++;
		}
		return found ? i : -1;
	}

	protected BigDecimal parseBigDecimal(String value) {
		try {
			return new BigDecimal(value);
		} catch (NumberFormatException ex) {
			return null;
		}
	}

	private static SimpleDateFormat validFormat1 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSSS'Z'");
	private static SimpleDateFormat validFormat2 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
	private static SimpleDateFormat validFormat3 = new SimpleDateFormat("yyyy-MM-dd");

	private static SimpleDateFormat[] validFormats = new SimpleDateFormat[]{validFormat1, validFormat2, validFormat3};

	protected Date parseDate(String value) {
		for (SimpleDateFormat validFormat : validFormats) {
			try {
				return validFormat.parse(value);
			} catch (ParseException ex1) {
			}
		}
		return null;
	}
}
