package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph;



import java.util.List;

public class NetworkGraph {

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
