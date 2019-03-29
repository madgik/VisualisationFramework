package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph;

import gr.uoa.di.aginfra.data.analytics.visualization.model.dtos.NodeDto;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Property;
import org.neo4j.ogm.annotation.Relationship;

import java.util.*;
import java.util.stream.Collectors;

@NodeEntity
public class Node extends SubGraphEntity{

    @Id
    private String nodeId;

    private double latitude;

    private double longitude;

    private int startingDate;


    @Relationship(type = "HAS_PROPERTY")
    private List<NodeProperty> nodeProperties;


    @Relationship(type = "HAS_DATENODE")
    private Set<HasDateNode> hasDateNodes = new HashSet<>();

    public Node() {
    }

    public Node(String nodeId, double latitude, double longitude, Map<String,String> attributes, String graphId, String graphName, String tenantName) {

        System.out.println("ID node:"+nodeId);
        this.nodeId = nodeId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.nodeProperties = new ArrayList<>();
        int i=0;
        for(Iterator<Map.Entry<String, String>> it = attributes.entrySet().iterator(); it.hasNext(); ) {
            Map.Entry<String, String> entry = it.next();
            if(entry.getKey().matches("[a-zA-Z ]+")) {

                NodeProperty nodeProperty = new NodeProperty(entry.getKey(), entry.getValue(),this);
                nodeProperties.add(nodeProperty);
                System.out.println(entry.getKey() + " = " + entry.getValue());
                it.remove();
            }
            else {
                if(i == 0) {
                    this.setStartingDate(Integer.parseInt(entry.getKey().replace(".","")));
                }
            }
            i++;
        }

        this.setSubGraphId(graphId);
        this.setSubGraphName(graphName);
        this.setTenantName(tenantName);
        this.hasDateNodes = attributes.entrySet()
                .stream()
//                .filter(e->Double.parseDouble(e.getValue().replace(",","."))>0)
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


    public Set<HasDateNode> getHasDateNodes() {
        return hasDateNodes;
    }

    public void setHasDateNodes(Set<HasDateNode> hasDateNodes) {
        this.hasDateNodes = hasDateNodes;
    }

    public List<NodeProperty> getNodeProperties() {
        return nodeProperties;
    }

    public void setNodeProperties(List<NodeProperty> nodeProperties) {
        this.nodeProperties = nodeProperties;
    }

    public int getStartingDate() {
        return startingDate;
    }

    public void setStartingDate(int startingDate) {
        this.startingDate = startingDate;
    }
}
