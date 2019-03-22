package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph;

import java.util.List;
import java.util.Map;

public class NetworkGraph {

    String tenantId;

    String graphId;

    private Map<String,Node> nodes;

    private List<Edge> links;

    public NetworkGraph(Map<String, Node> nodes, List<Edge> links) {
        this.nodes = nodes;
        this.links = links;
    }

    public Map<String, Node> getNodes() {
        return nodes;
    }

    public void setNodes(Map<String, Node> nodes) {
        this.nodes = nodes;
    }

    public List<Edge> getLinks() {
        return links;
    }

    public void setLinks(List<Edge> links) {
        this.links = links;
    }

    public String getTenantId() {
        return tenantId;
    }

    public void setTenantId(String tenantId) {
        this.tenantId = tenantId;
    }

    public String getGraphId() {
        return graphId;
    }

    public void setGraphId(String graphId) {
        this.graphId = graphId;
    }
}
