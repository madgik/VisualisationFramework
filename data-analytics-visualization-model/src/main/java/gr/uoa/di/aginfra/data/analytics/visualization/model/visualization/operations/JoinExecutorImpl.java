package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.operations;

import gr.uoa.di.aginfra.data.analytics.visualization.model.data.DataSetExtractor;
import gr.uoa.di.aginfra.data.analytics.visualization.model.data.DataSetExtractorFactory;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataSource;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Join;
import gr.uoa.di.aginfra.data.analytics.visualization.model.services.VisualizationDataType;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSetManipulator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JoinExecutorImpl extends DataSetManipulator implements JoinExecutor {

	private DataSetExtractorFactory dataSetExtractorFactory;

	@Autowired
	public JoinExecutorImpl(DataSetExtractorFactory dataSetExtractorFactory) {
		this.dataSetExtractorFactory = dataSetExtractorFactory;
	}

	@Override
	public DataSet execute(List<DataSource> dataSources, List<Join> joins, VisualizationDataType dataType) throws Exception {

		DataSource dataSource = dataSources.get(0);

		DataSetExtractor dataSetExtractor = dataSetExtractorFactory.getExtractor(dataSource);

		DataSet dataSet = dataSetExtractor.extract(dataSource, dataType);

		String leftSource = dataSource.getSource();
		String leftJoinField = joins.stream().
				filter(x -> x.getSource().equals(leftSource)).
				map(x -> x.getComposedField()).
				findFirst().get();

		for (int i = 1; i < dataSources.size(); i++) {
			dataSource = dataSources.get(i);
			String rightSource = dataSource.getSource();
			String rightJoinField = joins.stream().
					filter(x -> x.getSource().equals(rightSource)).
					map(x -> x.getComposedField()).
					findFirst().get();

			dataSetExtractor = dataSetExtractorFactory.getExtractor(dataSource);

			DataSet rightDataSet = dataSetExtractor.extract(dataSource, dataType);

			int leftIndex = getFieldIndex(dataSet, leftJoinField);

			int rightIndex = getFieldIndex(rightDataSet, rightJoinField);

			List<List<String>> leftData = dataSet.getData();
			List<List<String>> rightData = rightDataSet.getData();
			for (int j = 0; j < leftData.size(); j++) {
				List<String> lRow = leftData.get(j);

				String lValue = lRow.get(leftIndex);

				for (int k = 0; k < rightData.size(); k++) {
					List<String> rRow = rightData.get(k);

					String rValue = rRow.get(rightIndex);

					if (lValue != null && !lValue.isEmpty() && lValue.equals(rValue)) {
						lRow.addAll(rRow);
						break;
					}
				}
			}
			dataSet.getFields().addAll(rightDataSet.getFields());
			int columns = dataSet.getFields().size();//joining - no left join
			dataSet.getData().removeIf(x -> x.size() != columns);
		}
		return dataSet;
	}
}
