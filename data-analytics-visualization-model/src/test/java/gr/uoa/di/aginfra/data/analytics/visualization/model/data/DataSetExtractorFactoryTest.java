package gr.uoa.di.aginfra.data.analytics.visualization.model.data;

import gr.uoa.di.aginfra.data.analytics.visualization.model.config.AppConfig;
import gr.uoa.di.aginfra.data.analytics.visualization.model.config.DevModelConfig;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataSource;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataSourceType;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.hamcrest.CoreMatchers.instanceOf;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {AppConfig.class, DevModelConfig.class})
@ActiveProfiles("dev")
public class DataSetExtractorFactoryTest {

	@Autowired
	private DataSetExtractorFactory dataSetExtractorFactory;

	@Test
	public void test_datasetextractorfactory_creates_csvextractor() {

		DataSource dataSource = new DataSource();
		dataSource.setType(DataSourceType.CSV);

		Assert.assertThat(dataSetExtractorFactory.getExtractor(dataSource), instanceOf(CSVExtractor.class));
	}

	@Test
	public void test_datasetextractorfactory_creates_mongodbextractor() throws Exception {

		DataSource dataSource = new DataSource();
		dataSource.setType(DataSourceType.IMPORTED);

		Assert.assertThat(dataSetExtractorFactory.getExtractor(dataSource), instanceOf(MongoDBExtractor.class));
	}

	@Test(expected = UnsupportedOperationException.class)
	public void test_datasetextractorfactory_throws_unsupported() {

		DataSource dataSource = new DataSource();
		dataSource.setType(DataSourceType.REST);

		dataSetExtractorFactory.getExtractor(dataSource);
	}
}
