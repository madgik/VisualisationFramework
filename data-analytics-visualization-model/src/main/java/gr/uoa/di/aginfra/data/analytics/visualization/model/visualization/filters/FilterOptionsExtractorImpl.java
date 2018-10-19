package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.filters;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataType;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSetManipulator;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.extractors.HeatMapDataExtractorImpl;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class FilterOptionsExtractorImpl extends DataSetManipulator implements FilterOptionsExtractor {

	enum ColumnType{
		Date,
		String
	}

	@Override
	public List<String> extract(DataSet dataSet, String filterField) throws Exception {
		int filterFieldIndex = -1;
		if(filterField == null || (filterFieldIndex = getFieldIndex(dataSet, filterField)) == -1) {
			throw new Exception("Invalid data field provided " + filterField);
		}

		Set<String> options = new HashSet<>();

//		for (List<String> row : dataSet.getData()) {
//			options.add(row.get(filterFieldIndex));
//		}
		ColumnType columnType = getColumnType(dataSet, filterFieldIndex);
		options = getDistinctGroupByValues(dataSet,columnType, filterFieldIndex);
		return options.stream().filter(s -> s != null && !s.isEmpty()).sorted().collect(Collectors.toList());
	}


	private ColumnType getColumnType(DataSet dataSet, int groupByFieldIndex) throws ParseException {
		if(groupByFieldIndex != -1){
			String s = dataSet.getData().get(0).get(groupByFieldIndex);
			Date result = parseDate(s);
			if(result != null){
				return ColumnType.Date;
			}
		}
		return ColumnType.String;
	}

	private Set<String> getDistinctGroupByValues(DataSet dataSet, ColumnType columnType, int groupByFieldIndex) throws ParseException {

		Set<String> distinctGroupByValues = new HashSet();
		switch (columnType){
			case Date:
				for(int i=0; i < dataSet.getData().size(); i++){
					String dateWithoutTime = getDateWithoutTime(parseDate(dataSet.getData().get(i).get(groupByFieldIndex))).toString();
					distinctGroupByValues.add(dateWithoutTime);
					dataSet.getData().get(i).set(groupByFieldIndex, dateWithoutTime);
				}
				break;
			default:
				for(List<String> row: dataSet.getData()){
					distinctGroupByValues.add(row.get(groupByFieldIndex));
				}
				break;
		}

		return distinctGroupByValues;
	}
}
