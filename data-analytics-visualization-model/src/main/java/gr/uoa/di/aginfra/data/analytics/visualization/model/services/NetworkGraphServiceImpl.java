package gr.uoa.di.aginfra.data.analytics.visualization.model.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.DateNode;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.NetworkGraph;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.SubGraphEntity;
import gr.uoa.di.aginfra.data.analytics.visualization.model.dtos.NodeDto;
import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.netgraph.DateNodeRepository;
import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.netgraph.NodeRepository;
import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.netgraph.SubGraphRepository;
import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.netgraph.TransferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class NetworkGraphServiceImpl implements NetworkGraphService {

    private static final ObjectMapper mapper = new ObjectMapper();

    private TransferRepository transferRepository;

    private DateNodeRepository dateNodeRepository;

    private NodeRepository nodeRepository;

    private SubGraphRepository subGraphRepository;

    @Autowired
    public NetworkGraphServiceImpl(TransferRepository transferRepository, DateNodeRepository dateNodeRepository,
                                   NodeRepository nodeRepository, SubGraphRepository subGraphRepository) {
        this.transferRepository = transferRepository;
        this.dateNodeRepository = dateNodeRepository;
        this.nodeRepository = nodeRepository;
        this.subGraphRepository = subGraphRepository;
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

//        graph.getNodes().entrySet().stream().forEach(nodeEntry -> {
//                    nodeEntry.getValue().getHasDateNodes().stream().forEach(dateNode -> {
////                        nodeRepository.save(nodeEntry.getValue());
////                        dateNodeRepository.save(dateNode.getTarget());
//                        System.out.println("asdasd"+dateNode.getTarget().getDate());
//                           }
//                    );
//                }
//        );

        List<Long> insertedEdges = new ArrayList<>();
        graph.getLinks().stream().forEach(edge ->
                edge.getTransfers().stream().forEach(transfer ->
                        insertedEdges.add(transferRepository.save(transfer).getId())
                )
        );

        System.out.println("Inserted successfully:" + insertedEdges.size() + "relations");
        int results = insertedNodes.size() + insertedEdges.size();
        return results;
    }

    @Override
    public List<DateNode> getTopNodesOfGraph(String id) throws Exception {
        return null;
    }

    @Override
    public void deleteNetworkGraph(String id) throws Exception {

    }

    @Override
    public List<Map<String, String>> getAllGraphsByTenant(String tenant) throws IOException {
        List<Map<String, String>> results = subGraphRepository.findAllDistinctSubGraphId();

//        Map<String, String> results = mapper.readValue((JsonParser) nodes, new TypeReference<HashMap<String,String>>() {});

        return results;
    }
}
