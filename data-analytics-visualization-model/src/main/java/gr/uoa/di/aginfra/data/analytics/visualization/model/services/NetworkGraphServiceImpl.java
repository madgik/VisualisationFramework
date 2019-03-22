package gr.uoa.di.aginfra.data.analytics.visualization.model.services;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.DateNode;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.NetworkGraph;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.SubGraphEntity;
import gr.uoa.di.aginfra.data.analytics.visualization.model.dtos.NodeDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NetworkGraphServiceImpl implements NetworkGraphService {
    @Override
    public NetworkGraph getNetworkGraph(String id) throws Exception {
        return null;
    }

    @Override
    public List<DateNode> getNeighborNodes(NodeDto node, String graphId) throws Exception {
        return null;
    }

    @Override
    public SubGraphEntity getNextSubGraph(String id) throws Exception {
        return null;
    }

    @Override
    public DataDocumentMetadata getDataDocumentMetadata(String id) throws Exception {
        return null;
    }

    @Override
    public String storeNetworkGraph(NetworkGraph graph) throws Exception {
        return null;
    }

    @Override
    public void deleteNetworkGraph(String id) throws Exception {

    }
}
