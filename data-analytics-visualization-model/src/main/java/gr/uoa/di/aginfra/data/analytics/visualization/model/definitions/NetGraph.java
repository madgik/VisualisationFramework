package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions;

import java.util.List;

public class NetGraph {

    private List<NetNode> nodes;

    private List<NetLink> links;

    public List<NetNode> getNodes() {
        return nodes;
    }

    public void setNetNodes(List<NetNode> nodes) {
        this.nodes = nodes;
    }

    public List<NetLink> getNetLinks() {
        return links;
    }

    public void setNetLinks(List<NetLink> links) {
        this.links = links;
    }
}
