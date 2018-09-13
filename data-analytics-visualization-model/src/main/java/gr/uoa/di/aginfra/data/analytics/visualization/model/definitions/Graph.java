package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions;

import java.util.List;

public class Graph {

	private List<Node> nodes;

	private List<Link> links;

	public List<Node> getNodes() {
		return nodes;
	}

	public void setNodes(List<Node> nodes) {
		this.nodes = nodes;
	}

	public List<Link> getLinks() {
		return links;
	}

	public void setLinks(List<Link> links) {
		this.links = links;
	}
}
