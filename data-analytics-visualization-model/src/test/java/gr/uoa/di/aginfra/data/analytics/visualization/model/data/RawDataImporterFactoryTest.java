package gr.uoa.di.aginfra.data.analytics.visualization.model.data;

import gr.uoa.di.aginfra.data.analytics.visualization.model.config.AppConfig;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataType;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.hamcrest.CoreMatchers.instanceOf;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {AppConfig.class})
public class RawDataImporterFactoryTest {

	@Autowired
	private RawDataImporterFactory rawDataImporterFactory;

	@Test
	public void test_rawdataimporterfactory_creates_importer_always() {
		for (DataType dataType : DataType.values()) {
			try {
				Assert.assertNotNull(rawDataImporterFactory.getImporter(dataType));
			} catch (Exception ex) {
				Assert.fail(ex.getMessage());
			}
		}
	}

	@Test
	public void test_rawdataimporterfactory_creates_freemind_importer() throws Exception {
		Assert.assertThat(rawDataImporterFactory.getImporter(DataType.FreeMind), instanceOf(FreeMindImporter.class));
	}

	@Test
	public void test_rawdataimporterfactory_creates_graph_importer() throws Exception {
		Assert.assertThat(rawDataImporterFactory.getImporter(DataType.Graph), instanceOf(GraphImporter.class));
	}

	@Test
	public void test_rawdataimporterfactory_creates_image_importer() throws Exception {
		Assert.assertThat(rawDataImporterFactory.getImporter(DataType.Image), instanceOf(RawDataImporter.class));
	}

	@Test
	public void test_rawdataimporterfactory_creates_json_importer() throws Exception {
		Assert.assertThat(rawDataImporterFactory.getImporter(DataType.JSON), instanceOf(JsonImporter.class));
	}

	@Test
	public void test_rawdataimporterfactory_creates_records_importer() throws Exception {
		Assert.assertThat(rawDataImporterFactory.getImporter(DataType.Records), instanceOf(CSVImporter.class));
	}

	@Test
	public void test_rawdataimporterfactory_creates_tree_importer() throws Exception {
		Assert.assertThat(rawDataImporterFactory.getImporter(DataType.Tree), instanceOf(TreeImporter.class));
	}
}
