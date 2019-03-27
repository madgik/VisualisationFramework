package gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.netgraph;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.HasWeight;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HasWeightRepository extends Neo4jRepository<HasWeight, Long> {
    @Query("MATCH (n:Node)-[hd:HAS_DATENODE]-(dn1:DateNode)-[hw:HAS_WEIGHT]-(dn2:DateNode) WHERE n in {1} and dn1.subGraphId = {0} and dn2.subGraphId={0} and hw.date > {2} return Distinct(hw);")
    List<HasWeight> findHasWeightOf(String subGraphId, List<String> nodes, String date);
}
