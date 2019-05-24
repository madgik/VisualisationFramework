package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph;

import gr.uoa.di.aginfra.data.analytics.visualization.model.dtos.NodeDto;
import org.neo4j.ogm.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@NodeEntity
public class Node extends SubGraphEntity{

    @Id @GeneratedValue
    private Long id;

    private String nodeId;

    private double x;

    private double y;

    private int startingDate;


    @Relationship(type = "HAS_PROPERTY")
    private List<NodeProperty> nodeProperties;


    @Relationship(type = "HAS_DATENODE")
    private Set<HasDateNode> hasDateNodes = new HashSet<>();

    public Node() {
    }

    public Node(String nodeId, double x, double y, Map<String,String> attributes, String graphId, String graphName, String tenantName, String privacy) {

//        System.out.println("ID node:"+nodeId);
        this.nodeId = nodeId;
        this.x = x;
        this.y = y;
        this.nodeProperties = new ArrayList<>();
        int i=0;
        for(Iterator<Map.Entry<String, String>> it = attributes.entrySet().iterator(); it.hasNext(); ) {
            Map.Entry<String, String> entry = it.next();
            if(entry.getKey().matches("[a-zA-Z ]+")) {

                NodeProperty nodeProperty = new NodeProperty(entry.getKey(), entry.getValue(),this);
                nodeProperties.add(nodeProperty);
//                System.out.println(entry.getKey() + " = " + entry.getValue());
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
        this.setPrivacy(privacy);
        this.hasDateNodes = attributes.entrySet()
                .stream()
//                .filter(e->Double.parseDouble(e.getValue().replace(",","."))>0)
                .map(e -> new HasDateNode(this, new DateNode(e.getKey(),e.getValue(),this)))
                .collect(Collectors.toSet());


//        System.out.println("I counted dateNodes:"+ hasDateNodes.size());

    }


    public String getNodeId() {
        return nodeId;
    }

    public void setNodeId(String nodeId) {
        this.nodeId = nodeId;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
