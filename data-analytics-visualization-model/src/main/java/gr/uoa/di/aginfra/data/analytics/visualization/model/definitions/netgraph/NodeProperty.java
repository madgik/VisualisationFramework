package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph;

import org.neo4j.ogm.annotation.*;

import java.lang.annotation.Annotation;

@NodeEntity
public class NodeProperty implements Property {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private String value;

    @Relationship(type="HAS_PROPERTY", direction = Relationship.INCOMING)
    Node node;

    public NodeProperty() {
    }

    public NodeProperty(String name, String value, Node node) {
        this.name = name;
        this.value = value;
        this.node = node;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public String name() {
        return null;
    }

    @Override
    public String value() {
        return null;
    }

    @Override
    public boolean equals(Object obj) {
        return false;
    }

    @Override
    public int hashCode() {
        return 0;
    }

    @Override
    public String toString() {
        return null;
    }

    @Override
    public Class<? extends Annotation> annotationType() {
        return null;
    }
}
