package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph;

import org.neo4j.ogm.annotation.NodeEntity;

import java.util.List;


@NodeEntity
public class DateNode extends Node{
    private List<Node> nodes;

    private List<Edge> links;

    public List<Node> getNodes() {
        return nodes;
    }

    public void setNetNodes(List<Node> nodes) {
        this.nodes = nodes;
    }

    public List<Edge> getNetLinks() {
        return links;
    }

    public void setNetLinks(List<Edge> links) {
        this.links = links;
    }
}
