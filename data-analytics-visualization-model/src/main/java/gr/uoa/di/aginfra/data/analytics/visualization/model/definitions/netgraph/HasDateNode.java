package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph;

import org.neo4j.ogm.annotation.*;

@RelationshipEntity(type="HAS_DATENODE")
public class HasDateNode {

    @Id @GeneratedValue
    private Long id;

    @StartNode
    Node source;

    @EndNode
    DateNode target;

    public HasDateNode() {
    }

    public HasDateNode(Node source, DateNode target) {
        this.source = source;
        this.target = target;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Node getSource() {
        return source;
    }

    public void setSource(Node source) {
        this.source = source;
    }

    public DateNode getTarget() {
        return target;
    }

    public void setTarget(DateNode target) {
        this.target = target;
    }
}
