package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph;

import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;

@NodeEntity
public abstract class TenantEntity{

    @Id
    private String id;

    private String name;

    private String eMaill;

    private String code;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEMaill() {
        return eMaill;
    }

    public void setEMaill(String eMaill) {
        this.eMaill = eMaill;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
