package gr.uoa.di.aginfra.data.analytics.visualization.service.controllers;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Configuration;
import gr.uoa.di.aginfra.data.analytics.visualization.model.dtos.ConfigurationCriteriaDto;
import gr.uoa.di.aginfra.data.analytics.visualization.service.dtos.ConfigurationDto;
import gr.uoa.di.aginfra.data.analytics.visualization.service.mappers.EntityMapper;
import gr.uoa.di.aginfra.data.analytics.visualization.service.vres.VREResolver;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

import gr.uoa.di.aginfra.data.analytics.visualization.model.services.ConfigurationService;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

@Controller
@CrossOrigin(exposedHeaders = "Location")
@RequestMapping("/" + ConfigurationController.CONFIGURATION_BASE_PATH)
public class ConfigurationController extends BaseController {

	private static final Logger logger = LogManager.getLogger(ConfigurationController.class);

	protected static final String CONFIGURATION_BASE_PATH = "configurations";

	private ConfigurationService configurationService;

	private EntityMapper modelMapper;

	private VREResolver vreResolver;



	@Autowired
	public ConfigurationController(ConfigurationService configurationService,
								   EntityMapper modelMapper,
								   VREResolver vreResolver) {
		this.configurationService = configurationService;
		this.modelMapper = modelMapper;
		this.vreResolver = vreResolver;
	}

	@RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<ConfigurationDto>> list(ConfigurationCriteriaDto criteriaDto) throws Exception {
		List<Configuration> configurations = configurationService.getConfigurations(criteriaDto, vreResolver.resolve());
		List<ConfigurationDto> dtos = configurations.stream()
				.map(entity -> modelMapper.map(entity))
				.collect(Collectors.toList());
		return ResponseEntity.ok(dtos);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ConfigurationDto> get(@PathVariable("id") String id) throws Exception {
		logger.debug("Get configuration " + id);

		Configuration entity = configurationService.getConfiguration(id);

		if (entity == null) return ResponseEntity.notFound().build();

		ConfigurationDto dto = modelMapper.map(entity);

		return ResponseEntity.ok(dto);
	}

	@RequestMapping(value = "", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> post(@Validated @RequestBody ConfigurationDto dto) throws Exception {

		Configuration entity = modelMapper.map(dto);
		entity.setVre(vreResolver.resolve());

		String id = configurationService.storeConfiguration(entity);

		UriComponents uriComponents = UriComponentsBuilder.newInstance()
				.path(CONFIGURATION_BASE_PATH + "/{id}")
				.buildAndExpand(id);

		return ResponseEntity.created(uriComponents.toUri()).body(id);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> put(@PathVariable("id") String id, @RequestBody ConfigurationDto dto) throws Exception {

		Configuration entity = modelMapper.map(dto);
		entity.setId(id);
		entity.setVre(vreResolver.resolve());

		configurationService.storeConfiguration(entity);

		return ResponseEntity.ok("");
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<String> delete(@PathVariable("id") String id) throws Exception {

		configurationService.deleteConfiguration(id);

		return ResponseEntity.ok("");
	}
}
