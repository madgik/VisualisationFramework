package gr.uoa.di.aginfra.data.analytics.visualization.service.controllers;

import gr.uoa.di.aginfra.data.analytics.visualization.model.services.DashBoardService;
import gr.uoa.di.aginfra.data.analytics.visualization.model.stats.VisualizationUsageStats;
import gr.uoa.di.aginfra.data.analytics.visualization.service.mappers.EntityMapper;
import gr.uoa.di.aginfra.data.analytics.visualization.service.vres.VREResolver;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@CrossOrigin(exposedHeaders = "Location")
@RequestMapping("/" + DashBoardController.DASHBOARD_BASE_PATH)
public class DashBoardController {

    private static final Logger logger = LogManager.getLogger(DashBoardController.class);

    protected static final String DASHBOARD_BASE_PATH = "dashboard";

    private DashBoardService dashBoardService;

    private EntityMapper modelMapper;

    private VREResolver vreResolver;


    @Autowired
    public DashBoardController(DashBoardService dashBoardService,
                                   EntityMapper modelMapper,
                                   VREResolver vreResolver) {
        this.dashBoardService = dashBoardService;
        this.modelMapper = modelMapper;
        this.vreResolver = vreResolver;
    }


    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> get() throws Exception {
        logger.debug("Retrieving visualization usage statistics");

        String stats = dashBoardService.getDataset("");

        return ResponseEntity.ok(stats);
    }

}
