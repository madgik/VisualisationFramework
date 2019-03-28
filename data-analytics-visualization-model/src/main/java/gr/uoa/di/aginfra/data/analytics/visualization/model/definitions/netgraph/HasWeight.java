package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph;

import org.neo4j.ogm.annotation.*;


@RelationshipEntity(type="HAS_WEIGHT")
public class HasWeight {

    @Id
    @GeneratedValue
    private Long id;

    private String edgeParentId;

    private String parentNodeId;

    @StartNode
    DateNode source;
    @EndNode
    DateNode target;

    private int date;

    private Double weight;

    public HasWeight() {
    }

    public HasWeight(String edgeParentId, String nodeId, DateNode source, DateNode target, String date, Double weight) {
        this.parentNodeId = nodeId;
        this.edgeParentId = edgeParentId;
        this.source = source;
        this.target = target;
        this.date = Integer.parseInt(date.replace(".", ""));
        this.weight = weight;
        this.source.setHasWeight(this);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getParentNodeId() {
        return parentNodeId;
    }

    public void setParentNodeId(String parentNodeId) {
        this.parentNodeId = parentNodeId;
    }

    public DateNode getSource() {
        return source;
    }

    public void setSource(DateNode source) {
        this.source = source;
    }

    public DateNode getTarget() {
        return target;
    }

    public void setTarget(DateNode target) {
        this.target = target;
    }

    public int getDate() {
        return date;
    }

    public void setDate(int date) {
        this.date = date;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public String getEdgeParentId() {
        return edgeParentId;
    }

    public void setEdgeParentId(String edgeParentId) {
        this.edgeParentId = edgeParentId;
    }
}
