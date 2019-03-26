package gr.uoa.di.aginfra.data.analytics.visualization.model.services;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.DateNode;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.NetworkGraph;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.SubGraphEntity;
import gr.uoa.di.aginfra.data.analytics.visualization.model.dtos.NodeDto;
import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.netgraph.DateNodeRepository;
import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.netgraph.NodeRepository;
import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.netgraph.TransferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLOutput;
import java.util.ArrayList;
import java.util.List;

@Service
public class NetworkGraphServiceImpl implements NetworkGraphService {

    private TransferRepository tranferRepository;

    private DateNodeRepository dateNodeRepository;

    private NodeRepository nodeRepository;

    @Autowired
    public NetworkGraphServiceImpl(TransferRepository tranferRepository, DateNodeRepository dateNodeRepository, NodeRepository nodeRepository) {
        this.tranferRepository = tranferRepository;
        this.dateNodeRepository = dateNodeRepository;
        this.nodeRepository = nodeRepository;
    }

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
    public int storeNetworkGraph(NetworkGraph graph) throws Exception {

        List<Long> insertedNodes = new ArrayList<>();
        graph.getNodes().entrySet().stream().forEach(nodeEntry -> {

//                    nodeEntry.getValue().getHasDateNodes().stream().forEach(dateNode -> {
//                            dateNodeRepository.save(dateNode.getTarget());
//                        System.out.println("asdasd"+dateNode.getTarget().getDateNodeId());
//                           }
//                    );
                    nodeRepository.save(nodeEntry.getValue());
                }
        );
        System.out.println("Inserted successfully:" + insertedNodes.size() + "nodes");

        List<Long> insertedEdges = new ArrayList<>();
        graph.getLinks().stream().forEach(edge ->
                edge.getTransfers().stream().forEach(transfer ->
                        insertedEdges.add(tranferRepository.save(transfer).getId())
                )
        );

        System.out.println("Inserted successfully:" + insertedEdges.size() + "relations");
        int results = insertedNodes.size() + insertedEdges.size();
        return results;
    }

    @Override
    public void deleteNetworkGraph(String id) throws Exception {

    }
}
