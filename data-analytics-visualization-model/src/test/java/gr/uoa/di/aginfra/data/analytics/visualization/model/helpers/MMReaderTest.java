package gr.uoa.di.aginfra.data.analytics.visualization.model.helpers;

import gr.uoa.di.aginfra.data.analytics.visualization.model.config.ModelConfig;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.MMNode;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {ModelConfig.class})
public class MMReaderTest {

	public String xml =
			"<map version=\"0.8.0\">" +
				"<node ID=\"1\" TEXT=\"Software design patterns\">" +
					"<node ID=\"2\" POSITION=\"right\" TEXT=\"clasification on usage\">" +
						"<node ID=\"3\" TEXT=\"Creational Patterns\">" +
							"<node ID=\"4\" TEXT=\"Abstract Factory\">" +
								"<node ID=\"5\" TEXT=\"Provide an interface for creating families.\" />\n" +
							"</node>" +
						"</node>" +
					"</node>" +
				"</node>" +
			"</map>";

	@Test
	public void test_mmreader_parses_mindmap() throws Exception {

		MMReader mmReader = new MMReader();

		MMNode root = mmReader.parse(xml);

		//Assert correct root id
		Assert.assertEquals(root.getId(), "1");

		//Assert correct root topic
		Assert.assertEquals(root.getTopic(), "Software design patterns");

		//Assert correct root children size
		Assert.assertEquals(root.getChildren().size(), 1);

		MMNode child = root.getChildren().get(0);

		//Assert correct child id
		Assert.assertEquals(child.getId(), "2");

		//Assert correct child direction
		Assert.assertEquals(child.getDirection(), "right");
	}
}
