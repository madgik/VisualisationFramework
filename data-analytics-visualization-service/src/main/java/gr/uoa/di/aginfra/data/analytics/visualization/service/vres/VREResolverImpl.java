package gr.uoa.di.aginfra.data.analytics.visualization.service.vres;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component
public class VREResolverImpl implements VREResolver {

	private static final Logger logger = LogManager.getLogger(VREResolverImpl.class);

	private static final String GCUBE_SCOPE_HEADER = "gcube-scope";

	@Autowired
	private HttpServletRequest request;

	public String resolve() {
		String activeVre = this.request.getHeader(VREResolverImpl.GCUBE_SCOPE_HEADER);
		logger.info("Operating in vre " + activeVre);
		return activeVre;
	}
}
