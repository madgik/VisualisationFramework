package gr.uoa.di.aginfra.data.analytics.visualization.model.helpers;

import gr.uoa.di.aginfra.data.analytics.visualization.model.config.ModelConfig;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Configuration;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.Visualization;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {ModelConfig.class})
public class VisualizationMapperTest {

	@Autowired
	private VisualizationMapper visualizationMapper;

	@Test
	public void test_configuration_maps_to_visualization() {
		Configuration configuration = buildSampleConfiguration();
		Visualization visualization = visualizationMapper.map(configuration);

		Assert.assertEquals(configuration.getId(), visualization.getId().toString());
		Assert.assertEquals(configuration.getDescription(), visualization.getDescription());
		Assert.assertEquals(configuration.getXAxisLabel(), visualization.getXAxisLabel());
		Assert.assertEquals(configuration.getYAxisLabel(), visualization.getYAxisLabel());
	}

	private Configuration buildSampleConfiguration() {
		Configuration configuration = new Configuration();
		configuration.setId("5ad08c9d426796247cd2b401");
		configuration.setVre("devel");
		configuration.setDescription("Description");
		configuration.setXAxisLabel("Day");
		configuration.setYAxisLabel("Number");
		return configuration;
	}

}
