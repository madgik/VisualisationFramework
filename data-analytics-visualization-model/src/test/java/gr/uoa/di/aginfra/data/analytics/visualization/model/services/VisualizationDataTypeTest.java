package gr.uoa.di.aginfra.data.analytics.visualization.model.services;

import gr.uoa.di.aginfra.data.analytics.visualization.model.AppConfig;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataType;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.VisualizationType;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {AppConfig.class})
public class VisualizationDataTypeTest {

	@Test
	public void test_visualizationtype_mapsto_visualizationdatatype() {
		for (VisualizationType visualizationType: VisualizationType.values()) {
			Assert.assertNotNull(VisualizationDataType.of(visualizationType));
		}
	}

}
