package gr.uoa.di.aginfra.data.analytics.visualization.model.services;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.HasWeight;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.NetworkGraph;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.Node;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface NetworkGraphService {
    NetworkGraph getNetworkGraph(String id) throws Exception;

    List<Node> getNeighborNodes(String graphId, String nodeId) throws Exception;

    Map<String, Object> getNextTimestampSubGraph(String subGraphId, List<String> nodes, String date) throws Exception;

    List<Node> getCurrentTimestampSubGraph(String subGraphId, List<String> nodes, String date) throws Exception;

    List<HasWeight> getCurrentTimestampGraph(String subGraphId, List<String> nodes, String date) throws Exception;

    Node findNodeById(String nodeId, String graphId);

    DataDocumentMetadata getDataDocumentMetadata(String id) throws Exception;

    int storeNetworkGraph(NetworkGraph graph) throws Exception;

    List<Node> getTopNodesOfGraph(String subGraphId, int num) throws Exception;

    void deleteNetworkGraph(String id) throws Exception;

    List<Map<String, String>> getAllGraphsByTenant(String tenant) throws IOException;

    List<String> getAllTimestamps(String graphId) throws Exception;

    List<Node> getFilteredGraph(String subGraphId, Map<String, String> query, Integer nodesNumber) throws Exception;

	List<String> getPropertyValues(String property, String id);

	String deleteSubGraph(String sub);
}
