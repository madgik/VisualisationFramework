package gr.uoa.di.aginfra.data.analytics.visualization.service.vres;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component
public class VREResolverDev implements VREResolver {

	private static final Logger logger = LogManager.getLogger(VREResolverDev.class);

	@Override
	public String resolve() {
		logger.info("Operating in devel vre");
		return "devel";
	}
}
