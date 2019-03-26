package gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.netgraph;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.Node;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.SubGraphEntity;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface SubGraphRepository extends Neo4jRepository<SubGraphEntity, String> {

    @Query("MATCH (s:SubGraphEntity) RETURN DISTINCT s.subGraphId as id, s.subGraphName as name")
    List<Map<String,String>> findAllDistinctSubGraphId();
}
