package gr.uoa.di.aginfra.data.analytics.visualization.model.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:data-analytics-visualization.properties")
public class NetworkGraphConfig {

	@Value("${node.size.min}")
	private int minNodeSize;

	@Value("${node.size.max}")
	private int maxNodeSize;

	@Value("${node.links.min}")
	private int minNodeLinks;

	@Value("${node.links.max}")
	private int maxNodeLinks;

	@Value("${node.color.min}")
	private  String minNodeColor;

	@Value("${node.color.medium}")
	private String mediumNodeColor;

	@Value("${node.color.max}")
	private String maxNodeColor;

	public int getMinNodeSize() {
		return minNodeSize;
	}

	public void setMinNodeSize(int minNodeSize) {
		this.minNodeSize = minNodeSize;
	}

	public int getMaxNodeSize() {
		return maxNodeSize;
	}

	public void setMaxNodeSize(int maxNodeSize) {
		this.maxNodeSize = maxNodeSize;
	}

	public int getMinNodeLinks() {
		return minNodeLinks;
	}

	public void setMinNodeLinks(int minNodeLinks) {
		this.minNodeLinks = minNodeLinks;
	}

	public int getMaxNodeLinks() {
		return maxNodeLinks;
	}

	public void setMaxNodeLinks(int maxNodeLinks) {
		this.maxNodeLinks = maxNodeLinks;
	}

	public String getMinNodeColor() {
		return minNodeColor;
	}

	public void setMinNodeColor(String minNodeColor) {
		this.minNodeColor = minNodeColor;
	}

	public String getMediumNodeColor() {
		return mediumNodeColor;
	}

	public void setMediumNodeColor(String mediumNodeColor) {
		this.mediumNodeColor = mediumNodeColor;
	}

	public String getMaxNodeColor() {
		return maxNodeColor;
	}

	public void setMaxNodeColor(String maxNodeColor) {
		this.maxNodeColor = maxNodeColor;
	}
}
