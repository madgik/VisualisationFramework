package gr.uoa.di.aginfra.data.analytics.visualization.service.controllers;

import gr.uoa.di.aginfra.data.analytics.visualization.model.services.VisualizationService;
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

import java.util.Map;

@Controller
@CrossOrigin
@RequestMapping("/" + VisualizationController.VISUALIZATION_BASE_PATH)
public class VisualizationController extends BaseController {

	private static final Logger logger = LogManager.getLogger(VisualizationController.class);

	protected static final String VISUALIZATION_BASE_PATH = "visualizations";

	private VisualizationService visualizationService;

	private EntityMapper modelMapper;

	@Autowired
	public VisualizationController(VisualizationService visualizationService,
								   EntityMapper modelMapper,
								   VREResolver vreResolver) {
		this.visualizationService = visualizationService;
		this.modelMapper = modelMapper;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<VisualizationDto> get(@PathVariable("id") String id,
												@RequestParam Map<String, String> queryMap) throws Exception {
		logger.debug("Get Visualization " + id);

		Visualization visualization = visualizationService.getVisualization(id, queryMap);

		VisualizationDto dto = modelMapper.map(visualization);

		return visualization == null ?
				ResponseEntity.notFound().build() :
				ResponseEntity.ok(dto);
	}
}
