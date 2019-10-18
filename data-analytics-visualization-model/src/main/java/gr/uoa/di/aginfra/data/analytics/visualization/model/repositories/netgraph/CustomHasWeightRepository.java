package gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.netgraph;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.HasWeight;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.Node;
import org.neo4j.ogm.session.Session;

import java.util.List;
import java.util.Map;

public interface CustomHasWeightRepository {

    List<HasWeight> findHasWeightsByProperties(Session session, String graphId, Map<String, String> queryParams);

    List<Node> findNodesByProperties(Session session, String graphId, Map<String, String> queryParams, Integer nodesNumber);
}
