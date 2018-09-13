package gr.uoa.di.aginfra.data.analytics.visualization.service.quering;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import gr.uoa.di.aginfra.data.analytics.visualization.service.controllers.BaseController;
import gr.uoa.di.aginfra.data.analytics.visualization.service.dtos.ConfigurationDto;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.ArrayList;
import java.util.List;

public class Query implements GraphQLQueryResolver {

	private static final Logger logger = LogManager.getLogger(BaseController.class);

	public List<ConfigurationDto> configurations(int count, int offset) {

		logger.info("" + count + offset);

		List<ConfigurationDto> configurations = new ArrayList<>();
		ConfigurationDto p = new ConfigurationDto();
		p.setLabel("2");
		p.setDescription("3");
		configurations.add(p);
		return configurations;
	}
}
