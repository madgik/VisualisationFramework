package gr.uoa.di.aginfra.data.analytics.visualization.model.helpers;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvParser;

import java.io.*;

public class CSVReader {

	public static String[][] readCSV(String csvContent) throws Exception {
		CsvMapper mapper = new CsvMapper();
		mapper.enable(CsvParser.Feature.WRAP_AS_ARRAY);
		mapper.enable(JsonParser.Feature.ALLOW_YAML_COMMENTS);
		return mapper.readValue(csvContent, String[][].class);
	}

	public static String[][] readCSV(String[] lines, String delimiter) {

		String[] split = lines[0].split(delimiter);
		String[][] fina = new String[lines.length][split.length];
		for(int i=0;i<lines.length -1;i++) {
			String[] details = lines[i +1].split(delimiter);
			for (int j = 0; j < split.length; j++) {
				fina[i][j] = details[j];
			}
		}
		return fina;
	}

	public static String readStream(InputStream is) {
		StringBuilder sb = new StringBuilder(512);
		try {
			Reader r = new InputStreamReader(is, "UTF-8");
			int c = 0;
			while ((c = r.read()) != -1) {
				sb.append((char) c);
			}
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		return sb.toString();
	}
}
