package gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.netgraph;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.HasWeight;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.Node;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface HasWeightRepository extends Neo4jRepository<HasWeight, Long> {
    @Query("MATCH (n:Node)-[hd:HAS_DATENODE]-(dn1:DateNode)-[hw:HAS_WEIGHT]-(dn2:DateNode) WHERE n in {1} and dn1.subGraphId = {0} and dn2.subGraphId={0} and hw.date > {2} return Distinct(hw);")
    List<HasWeight> findHasWeightOf(String subGraphId, List<String> nodes, String date);

    @Query("MATCH (n:Node)-[h:HAS_DATENODE]-(dn1:DateNode)-[hw:HAS_WEIGHT]-(dn2:DateNode)-[h2:HAS_DATENODE]-(n2:Node), " +
            "(n)-[hp:HAS_PROPERTY]-(p:NodeProperty) " +
            "WHERE n.nodeId in {1} and n.subGraphId={0} " +
            "and hw.date = {2} and hw.weight>0 Return dn1,hw,dn2,h,h2,n,n2,hp,p")
    List<HasWeight> findNodesAndHasWeightByDate(String subGraphId, List<String> nodes, int date);
}
