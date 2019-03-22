package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph;

import org.neo4j.ogm.annotation.EndNode;
import org.neo4j.ogm.annotation.RelationshipEntity;
import org.neo4j.ogm.annotation.StartNode;

@RelationshipEntity(type="HAS_DATENODE")
public class HasDateNode {
    @StartNode
    Node source;
    @EndNode
    DateNode target;

    public HasDateNode(Node source, DateNode target) {
        this.source = source;
        this.target = target;
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
