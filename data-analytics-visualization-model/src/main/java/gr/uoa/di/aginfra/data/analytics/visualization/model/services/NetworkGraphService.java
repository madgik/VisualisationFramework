package gr.uoa.di.aginfra.data.analytics.visualization.model.services;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.DateNode;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.NetworkGraph;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.SubGraphEntity;
import gr.uoa.di.aginfra.data.analytics.visualization.model.dtos.NodeDto;

import java.util.List;

public interface NetworkGraphService {
    NetworkGraph getNetworkGraph(String id) throws Exception;

    List<DateNode> getNeighborNodes(NodeDto node, String graphId) throws Exception;

    SubGraphEntity getNextSubGraph(String id) throws Exception;

    DataDocumentMetadata getDataDocumentMetadata(String id) throws Exception;

    String storeNetworkGraph(NetworkGraph graph) throws Exception;


    void deleteNetworkGraph(String id) throws Exception;
}
