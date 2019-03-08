package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph;

import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;

@NodeEntity
public abstract class SubGraphEntity extends TenantEntity {

    @Id
    private String id;

    private String name;


}
