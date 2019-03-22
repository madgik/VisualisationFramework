package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph;

import gr.uoa.di.aginfra.data.analytics.visualization.model.dtos.NodeDto;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

import java.util.*;
import java.util.stream.Collectors;

@NodeEntity
public class Node extends SubGraphEntity{

    @Id
    private String nodeId;

    private double latitude;

    private double longitude;

    private Map<String,String> properties;


    @Relationship(type = "HAS_DATENODE")
    private Set<HasDateNode> hasDateNodes = new HashSet<>();

    public Node(String id, double latitude, double longitude, Map<String,String> attributes, String graphId, String graphName, String tenantName) {
        System.out.println("My id is:"+id);
        this.nodeId = id;
        this.latitude = latitude;
        this.longitude = longitude;
        properties = new HashMap<>();

        for(Iterator<Map.Entry<String, String>> it = attributes.entrySet().iterator(); it.hasNext(); ) {
            Map.Entry<String, String> entry = it.next();
            if(entry.getKey().matches("[a-zA-Z]+")) {
                properties.put(entry.getKey(),entry.getValue());
                System.out.println(entry.getKey() + " = " + entry.getValue());
                it.remove();
            }
        }

        this.setSubGraphId(graphId);
        this.setSubGraphName(graphName);
        this.setTenantName(tenantName);

        this.hasDateNodes = attributes.entrySet()
                .stream()
                .map(e -> new HasDateNode(this, new DateNode(e.getKey(),e.getValue(),this)))
                .collect(Collectors.toSet());


        System.out.println("I counted dateNodes:"+ hasDateNodes.size());

    }


    public String getNodeId() {
        return nodeId;
    }

    public void setNodeId(String nodeId) {
        this.nodeId = nodeId;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public Map<String, String> getProperties() {
        return properties;
    }

    public void setProperties(Map<String, String> properties) {
        this.properties = properties;
    }

    public Set<HasDateNode> getHasDateNodes() {
        return hasDateNodes;
    }

    public void setHasDateNodes(Set<HasDateNode> hasDateNodes) {
        this.hasDateNodes = hasDateNodes;
    }
}
