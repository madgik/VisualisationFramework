package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph;

import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.RelationshipEntity;

import java.util.Map;

@RelationshipEntity
public class Edge {
    private String source;

    private String target;

    private Map<String, String> timeWeights;

    private int value;

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

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public Map<String, String> getTimeWeights() {
        return timeWeights;
    }

    public void setTimeWeights(Map<String, String> timeWeights) {
        this.timeWeights = timeWeights;
    }
}
