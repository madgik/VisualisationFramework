package gr.uoa.di.aginfra.data.analytics.visualization.service.controllers;

import gr.uoa.di.aginfra.data.analytics.visualization.model.services.VisualizationService;
import gr.uoa.di.aginfra.data.analytics.visualization.model.stats.UsageStatsService;
import gr.uoa.di.aginfra.data.analytics.visualization.model.stats.VisualizationUsageStats;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.Visualization;
import gr.uoa.di.aginfra.data.analytics.visualization.service.dtos.VisualizationDto;
import gr.uoa.di.aginfra.data.analytics.visualization.service.mappers.EntityMapper;
import gr.uoa.di.aginfra.data.analytics.visualization.service.vres.VREResolver;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin
@RequestMapping("/" + UsageController.USAGE_BASE_PATH)
public class UsageController {

	private static final Logger logger = LogManager.getLogger(VisualizationController.class);

	protected static final String USAGE_BASE_PATH = "usage";

	private UsageStatsService usageService;

	private EntityMapper modelMapper;

	private VREResolver vreResolver;

	@Autowired
	public UsageController(UsageStatsService usageService,
								   EntityMapper modelMapper,
								   VREResolver vreResolver) {
		this.usageService = usageService;
		this.modelMapper = modelMapper;
		this.vreResolver = vreResolver;
	}

	@RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<VisualizationUsageStats> get() throws Exception {
		logger.debug("Retrieving visualization usage statistics");

		VisualizationUsageStats stats = usageService.getStats(vreResolver.resolve());

		return ResponseEntity.ok(stats);
	}
}
