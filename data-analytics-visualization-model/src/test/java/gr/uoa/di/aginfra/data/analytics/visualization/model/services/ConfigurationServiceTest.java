package gr.uoa.di.aginfra.data.analytics.visualization.model.services;

import gr.uoa.di.aginfra.data.analytics.visualization.model.config.ModelConfig;
import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.ConfigurationRepository;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Configuration;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.internal.verification.VerificationModeFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {ModelConfig.class})
public class ConfigurationServiceTest {

	@Mock
	private ConfigurationRepository configurationDAO;

	@Autowired
	@InjectMocks
	private ConfigurationService configurationService;

	@Before
	public void setup() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void test_configurationservice_gets_configuration() throws Exception {
		when(configurationDAO.getById("5ad08c9d426796247cd2b408")).thenReturn(buildSample());

		Configuration result = configurationService.getConfiguration("5ad08c9d426796247cd2b408");

		Assert.assertEquals(result.getId(), "5ad08c9d426796247cd2b408");

		verify(configurationDAO, VerificationModeFactory.times(1)).getById(Mockito.anyString());
	}

	private Configuration buildSample() {
		Configuration sample = new Configuration();
		sample.setId("5ad08c9d426796247cd2b408");
		sample.setAvailableTypes(new ArrayList<>());
		sample.setFilters(new ArrayList<>());
		sample.setDataSources(new ArrayList<>());
		sample.setParameters(new ArrayList<>());
		return sample;
	}
}
