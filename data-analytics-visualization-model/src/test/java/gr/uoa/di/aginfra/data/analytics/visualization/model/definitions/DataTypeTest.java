package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions;

import gr.uoa.di.aginfra.data.analytics.visualization.model.AppConfig;
import gr.uoa.di.aginfra.data.analytics.visualization.model.data.CSVExtractor;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.HashMap;
import java.util.Map;

import static org.hamcrest.CoreMatchers.instanceOf;

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
