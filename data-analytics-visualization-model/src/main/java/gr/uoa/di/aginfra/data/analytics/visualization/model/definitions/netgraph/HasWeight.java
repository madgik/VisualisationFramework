package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph;

import org.neo4j.ogm.annotation.*;


@RelationshipEntity(type="HAS_WEIGHT")
public class HasWeight {

    @Id
    @GeneratedValue
    private Long id;

    private String parentId;

    @StartNode
    DateNode source;
    @EndNode
    DateNode target;

    private String date;

    private Double weight;

    public HasWeight() {
    }

    public HasWeight(String id, DateNode source, DateNode target, String date, Double weight) {
        this.parentId = id;
        this.source = source;
        this.target = target;
        this.date = date.replace(".", "");
        this.weight = weight;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }
}
