package gr.uoa.di.aginfra.data.analytics.visualization.service;


import gr.uoa.di.aginfra.data.analytics.visualization.model.config.ModelConfig;
import org.springframework.context.annotation.*;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;


@Configuration
@EnableWebMvc
@EnableAsync
@Import(ModelConfig.class)
@ComponentScan("gr.uoa.di.aginfra.data.analytics.visualization.service")
public class AppConfig {

	@Bean
	public org.springframework.web.multipart.commons.CommonsMultipartResolver multipartResolver() {
		org.springframework.web.multipart.commons.CommonsMultipartResolver resolver =
				new org.springframework.web.multipart.commons.CommonsMultipartResolver();
		resolver.setMaxUploadSize(1136777216);
		return resolver;
	}

}


