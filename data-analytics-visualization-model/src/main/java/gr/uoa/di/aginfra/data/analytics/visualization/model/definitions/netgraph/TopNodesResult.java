package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph;

import org.springframework.data.neo4j.annotation.QueryResult;

@QueryResult
public class TopNodesResult {
	private Node node;
	private int links;

	public Node getNode() {
		return node;
	}

	public void setNode(Node node) {
		this.node = node;
	}

	public int getLinks() {
		return links;
	}

	public void setLinks(int links) {
		this.links = links;
	}
}
