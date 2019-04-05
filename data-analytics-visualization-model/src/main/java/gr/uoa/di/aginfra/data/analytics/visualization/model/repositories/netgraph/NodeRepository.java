package gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.netgraph;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.DateNode;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.Node;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface NodeRepository extends Neo4jRepository<Node, Long> {

    @Query("MATCH (n:Node) -[n1:HAS_DATENODE]-()-[:HAS_WEIGHT]-()-[n2:HAS_DATENODE]-(nf)-[h:HAS_PROPERTY]-(p:NodeProperty) " +
            "where n.subGraphId={0} and n.nodeId={1} return  collect(distinct nf),h,p")
    List<Node> findNeighboursOfNodeById(String subGraphId, String nodeId);

    @Query("Match(n:Node) where n.subGraphId={0}  " +
            "WITH n, SIZE((n)-[]-()-[:HAS_WEIGHT]-()-[]-()) as links ORDER BY links DESC LIMIT {1} " +
            "Match (n)-[h:HAS_PROPERTY]-(p:NodeProperty) " +
            "RETURN n,h,p")
    List<Node> findTopNodes(String subGraphId, int number);

    @Query("MATCH (dn1:DateNode)-[hw:HAS_WEIGHT]-(dn2:DateNode)," +
            " (n:Node)-[h:HAS_DATENODE]-(dn1:DateNode)," +
            " (dn2:DateNode)-[h2:HAS_DATENODE]-(n2:Node)," +
            " (n)-[hp:HAS_PROPERTY]-(p:NodeProperty)" +
            "WHERE n.nodeId in {1} and n.subGraphId={0} " +
            "and hw.date = {2} and hw.weight>0 return n,h,dn1,hw,dn2,h2,n2,hp,p")
    List<Node> findNodesAndHasWeightByDate(String subGraphId, List<String> nodes, int date);

    @Query("MATCH (n:Node)-[h:HAS_PROPERTY]-(p:NodeProperty) where n.nodeId={0} and n.subGraphId={1} return n,h,p")
    Node findNodeByNodeId(String nodeId, String graphId);

    @Query("MATCH (dn:DateNode)" +
            "where dn.subGraphId={0} "+
            "with dn " +
            "order by dn.date asc " +
            "return  collect(distinct dn.date)")
    String[] findAllDatesOrderByDate(String graphId);

}

