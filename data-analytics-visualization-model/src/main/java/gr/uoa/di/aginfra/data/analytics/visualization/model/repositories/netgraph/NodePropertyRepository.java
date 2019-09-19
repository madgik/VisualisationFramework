package gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.netgraph;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.NetworkGraph;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.NodeProperty;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NodePropertyRepository extends Neo4jRepository<NodeProperty, String> {

	@Query("Match(p:NodeProperty)-[:HAS_PROPERTY]-(n:Node) where p.name={0} and n.subGraphId={1} Return distinct(p.value)")
	List<String> findDistinctValuesByNameAndNodeSubGraphId(String name, String graphId);
}
