package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph;

import org.neo4j.ogm.annotation.NodeEntity;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class Edge extends SubGraphEntity {


    private String edgeId;

    private String source;

    private String target;

    private Map<String, String> properties;

    private Set<HasWeight> transfers;


    public Edge(String id, Node source, Node target, Map<String, String> attributes, String graphId, String graphName, String tenantName) {
        this.edgeId = id;
        this.source = source.getNodeId();
        this.target = target.getNodeId();
        this.properties = new HashMap<>();

        for (Iterator<Map.Entry<String, String>> it = attributes.entrySet().iterator(); it.hasNext(); ) {
            Map.Entry<String, String> entry = it.next();
            if (entry.getKey().matches("[a-zA-Z]+")) {
                properties.put(entry.getKey(), entry.getValue());
                it.remove();
            }
        }
        transfers = attributes.entrySet().stream()
                //TODO TEST WITH FILTER ENABLED
                //.filter(dNode -> Double.parseDouble(dNode.getValue()) > 0)
                .map(dNode ->
                new HasWeight(this.edgeId, source.getNodeId(),
                        source.getHasDateNodes().stream().filter(n -> n.getTarget().getDate() == Integer.parseInt(dNode.getKey().replace(".", ""))).findAny().orElse(null).getTarget(),
                        target.getHasDateNodes().stream().filter(t -> t.getTarget().getDate() == Integer.parseInt(dNode.getKey().replace(".", ""))).findAny().orElse(null).getTarget(),
                        dNode.getKey(), Double.parseDouble(dNode.getValue()))
        ).collect(Collectors.toSet());

        this.setSubGraphId(graphId);
        this.setSubGraphName(graphName);
        this.setTenantName(tenantName);
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public String getEdgeId() {
        return edgeId;
    }

    public void setEdgeId(String edgeId) {
        this.edgeId = edgeId;
    }

    public Map<String, String> getProperties() {
        return properties;
    }

    public void setProperties(Map<String, String> properties) {
        this.properties = properties;
    }

    public Set<HasWeight> getTransfers() {
        return transfers;
    }

    public void setTransfers(Set<HasWeight> transfers) {
        this.transfers = transfers;
    }
}