package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.generators;

import gr.uoa.di.aginfra.data.analytics.visualization.model.AppConfig;
import gr.uoa.di.aginfra.data.analytics.visualization.model.services.VisualizationDataType;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.hamcrest.CoreMatchers.instanceOf;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {AppConfig.class})
public class VisualizationDataGeneratorFactoryTest {

	@Autowired
	private VisualizationDataGeneratorFactory visualizationDataGeneratorFactory;

	@Test
	public void test_visualizationdatageneratorfactory_creates_generator_always() {
		for (VisualizationDataType visualizationDataType : VisualizationDataType.values()) {
			try {
				Assert.assertNotNull(visualizationDataGeneratorFactory.getGenerator(visualizationDataType));
			} catch (Exception ex) {
				Assert.fail(ex.getMessage());
			}
		}
	}

	@Test
	public void test_visualizationdatageneratorfactory_creates_graph_generator() throws Exception {
		Assert.assertThat(visualizationDataGeneratorFactory.getGenerator(VisualizationDataType.Graph), instanceOf(GraphDataGenerator.class));
	}

	@Test
	public void test_visualizationdatageneratorfactory_creates_timeseries_generator() throws Exception {
		Assert.assertThat(visualizationDataGeneratorFactory.getGenerator(VisualizationDataType.TimeSeries), instanceOf(TimeSeriesDataGenerator.class));
	}

	@Test
	public void test_visualizationdatageneratorfactory_creates_barchart_generator() throws Exception {
		Assert.assertThat(visualizationDataGeneratorFactory.getGenerator(VisualizationDataType.BarChart), instanceOf(BarChartDataGenerator.class));
	}

	@Test
	public void test_visualizationdatageneratorfactory_creates_freemind_generator() throws Exception {
		Assert.assertThat(visualizationDataGeneratorFactory.getGenerator(VisualizationDataType.FreeMind), instanceOf(FreeMindDataGenerator.class));
	}

	@Test
	public void test_visualizationdatageneratorfactory_creates_tree_generator() throws Exception {
		Assert.assertThat(visualizationDataGeneratorFactory.getGenerator(VisualizationDataType.Tree), instanceOf(TreeDataGenerator.class));
	}

	@Test
	public void test_visualizationdatageneratorfactory_creates_tuple_generator() throws Exception {
		Assert.assertThat(visualizationDataGeneratorFactory.getGenerator(VisualizationDataType.Tuples), instanceOf(TupleDataGenerator.class));
	}

	@Test
	public void test_visualizationdatageneratorfactory_creates_json_generator() throws Exception {
		Assert.assertThat(visualizationDataGeneratorFactory.getGenerator(VisualizationDataType.Map), instanceOf(JSONDataGenerator.class));
	}
}
