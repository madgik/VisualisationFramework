package gr.uoa.di.aginfra.data.analytics.visualization.service.controllers;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Configuration;
import gr.uoa.di.aginfra.data.analytics.visualization.model.services.ConfigurationService;
import gr.uoa.di.aginfra.data.analytics.visualization.service.AppConfig;
import gr.uoa.di.aginfra.data.analytics.visualization.service.DevConfig;
import gr.uoa.di.aginfra.data.analytics.visualization.service.mappers.EntityMapper;
import gr.uoa.di.aginfra.data.analytics.visualization.service.vres.VREResolver;
import gr.uoa.di.aginfra.data.analytics.visualization.service.vres.VREResolverDev;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.nio.charset.Charset;
import java.util.ArrayList;

import org.springframework.http.MediaType;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;

import gr.uoa.di.aginfra.data.analytics.visualization.service.WebConfig;
import org.junit.runner.RunWith;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {WebConfig.class, AppConfig.class, DevConfig.class})
@WebAppConfiguration
@ActiveProfiles("dev")
public class ConfigurationControllerTest {

	private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
			MediaType.APPLICATION_JSON.getSubtype(),
			Charset.forName("utf8"));

	@Mock
	private ConfigurationService configurationService;

	@Autowired
	private EntityMapper modelMapper;

	@Autowired
	private VREResolver vreResolver;

	private ConfigurationController configurationController;

	private MockMvc mockMvc;

	@Before
	public void setup() throws Exception {
		MockitoAnnotations.initMocks(this);

		configurationController = new ConfigurationController(configurationService, modelMapper, vreResolver);

		this.mockMvc = standaloneSetup(configurationController).build();
	}

	@Test
	public void test_configuration_not_found() throws Exception {
		mockMvc.perform(get("/configurations/5ad08c9d426796247cd2b401")
				.contentType(contentType))
				.andExpect(status().isNotFound());
	}

	@Test
	public void test_configuration_success() throws Exception {
		when(configurationService.getConfiguration("5ad08c9d426796247cd2b408")).thenReturn(buildSample());

		mockMvc.perform(get("/configurations/5ad08c9d426796247cd2b408")
				.contentType(contentType))
				.andExpect(status().is2xxSuccessful());
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
