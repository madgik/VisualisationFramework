package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;
import org.neo4j.ogm.id.UuidStrategy;

import java.util.UUID;


@NodeEntity
public class DateNode extends SubGraphEntity {

    @Id
    @GeneratedValue
    private Long dateNodeId;

    private String parentId;

    private String date;

    private String property;

    @Relationship(type = "HAS_DATENODE", direction = "INCOMING")
    private Node parentNode;

    public DateNode() {
    }

    public DateNode(String date, String property, Node node) {
        this.date = date.replace(".", "");
        this.property = property;
        this.parentId = node.getNodeId();
        this.parentNode = node;
        this.setSubGraphId(node.getSubGraphId());
        this.setSubGraphName(node.getSubGraphName());
        this.setTenantName(node.getTenantName());
    }

    public Long getDateNodeId() {
        return dateNodeId;
    }

    public void setDateNodeId(Long dateNodeId) {
        this.dateNodeId = dateNodeId;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getProperty() {
        return property;
    }

    public void setProperty(String property) {
        this.property = property;
    }

    public Node getParentNode() {
        return parentNode;
    }

    public void setParentNode(Node parentNode) {
        this.parentNode = parentNode;
    }
}