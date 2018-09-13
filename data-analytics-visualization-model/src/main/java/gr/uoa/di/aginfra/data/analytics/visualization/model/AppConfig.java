package gr.uoa.di.aginfra.data.analytics.visualization.model;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@ComponentScan("gr.uoa.di.aginfra.data.analytics.visualization.model")
@PropertySource("classpath:data-analytics-visualization.properties")
public class AppConfig {

	@Bean
	public ModelMapper modelMapper(){
		return new ModelMapper();
	}
}
