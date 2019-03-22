package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;

@NodeEntity
public abstract class SubGraphEntity extends TenantEntity {

    private String subGraphId;

    private String subGraphName;


    public String getSubGraphId() {
        return subGraphId;
    }

    public void setSubGraphId(String subGraphId) {
        this.subGraphId = subGraphId;
    }

    public String getSubGraphName() {
        return subGraphName;
    }

    public void setSubGraphName(String subGraphName) {
        this.subGraphName = subGraphName;
    }
}
