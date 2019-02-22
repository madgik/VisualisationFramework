package gr.uoa.di.aginfra.data.analytics.visualization.service;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableWebMvc
@Import(gr.uoa.di.aginfra.data.analytics.visualization.model.AppConfig.class)
@ComponentScan("gr.uoa.di.aginfra.data.analytics.visualization.service")
public class AppConfig {

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

	@Bean
	public org.springframework.web.multipart.commons.CommonsMultipartResolver multipartResolver() {
		org.springframework.web.multipart.commons.CommonsMultipartResolver resolver =
				new org.springframework.web.multipart.commons.CommonsMultipartResolver();
		resolver.setMaxUploadSize(1136777216);
		return resolver;
	}


}
