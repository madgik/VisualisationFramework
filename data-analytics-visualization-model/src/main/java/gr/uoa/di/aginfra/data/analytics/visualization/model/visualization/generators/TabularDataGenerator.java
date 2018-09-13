package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.generators;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Configuration;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.Visualization;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.TabularData;

import java.util.Map;

public class TabularDataGenerator implements VisualizationDataGenerator {

	@Override
	public void generateData(Visualization visualization,
							 Configuration configuration,
							 DataSet dataSet,
							 Map<String, String> filters) throws Exception {
		TabularData tabularData = new TabularData();
		tabularData.setFields(dataSet.getFields());
		tabularData.setData(dataSet.getData());
		visualization.setTabularData(tabularData);
	}
}
