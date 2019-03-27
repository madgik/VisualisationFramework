package gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.netgraph;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.DateNode;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.Node;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NodeRepository extends Neo4jRepository<Node, Long> {

    @Query("MATCH (n:Node) -[n1:HAS_DATENODE]-()-[:HAS_WEIGHT]-()-[n2:HAS_DATENODE]-(nf)-[h:HAS_PROPERTY]-(p:NodeProperty) where n.subGraphId={0} and n.nodeId={1} return  collect(distinct nf),h,p")
    List<Node> findNeighboursOfNodeById(String subGraphId, String nodeId);
}

