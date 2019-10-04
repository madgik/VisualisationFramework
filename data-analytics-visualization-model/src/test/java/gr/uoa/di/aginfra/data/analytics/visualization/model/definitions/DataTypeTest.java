package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions;

import gr.uoa.di.aginfra.data.analytics.visualization.model.config.AppConfig;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {AppConfig.class})
public class DataTypeTest {

	@Test
	public void test_visualizationtype_mapsto_datatype() {
		for (VisualizationType visualizationType: VisualizationType.values()) {
			Assert.assertNotNull(DataType.of(visualizationType));
		}
	}

}
