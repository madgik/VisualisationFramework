package gr.uoa.di.aginfra.data.analytics.visualization.model.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import gr.uoa.di.aginfra.data.analytics.visualization.model.config.NetworkGraphConfig;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.*;
import gr.uoa.di.aginfra.data.analytics.visualization.model.helpers.GraphVisualizationHelper;
import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.netgraph.*;
import org.neo4j.ogm.session.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
public class NetworkGraphServiceImpl implements NetworkGraphService {

    private static final ObjectMapper mapper = new ObjectMapper();

    private HasWeightRepository hasWeightRepository;

    private DateNodeRepository dateNodeRepository;

    private NodeRepository nodeRepository;

    private NodePropertyRepository nodePropertyRepository;

    private SubGraphRepository subGraphRepository;

    private Session session;

    private NetworkGraphConfig networkGraphConfig;

    @Autowired
    public NetworkGraphServiceImpl(HasWeightRepository hasWeightRepository, DateNodeRepository dateNodeRepository,
                                   NodeRepository nodeRepository, SubGraphRepository subGraphRepository,
                                   NodePropertyRepository nodePropertyRepository, Session session, NetworkGraphConfig networkGraphConfig) {
        this.hasWeightRepository = hasWeightRepository;
        this.dateNodeRepository = dateNodeRepository;
        this.nodeRepository = nodeRepository;
        this.subGraphRepository = subGraphRepository;
        this.nodePropertyRepository= nodePropertyRepository;
        this.session = session;
        this.networkGraphConfig = networkGraphConfig;
    }

    @Override
    public NetworkGraph getNetworkGraph(String id) throws Exception {
        return null;
    }

    @Override
    public List<Node> getNeighborNodes(String graphId, String nodeId) throws Exception {
        return nodeRepository.findNeighboursOfNodeById(graphId, nodeId);

    }

    @Override
    public Map<String, Object> getNextTimestampSubGraph(String subGraphId, List<String> nodes, String date) throws Exception {
        return null;
    }

    @Override
    public List<Node> getCurrentTimestampSubGraph(String subGraphId, List<String> nodes, String date) throws Exception {

        return nodeRepository.findNodesAndHasWeightByDate(subGraphId,nodes,Integer.parseInt(date.replace(".","")));
    }

    @Override
    public List<HasWeight> getCurrentTimestampGraph(String subGraphId, List<String> nodes, String date) throws Exception {
        return hasWeightRepository.findNodesAndHasWeightByDate(subGraphId,nodes,Integer.parseInt(date.replace(".","")));
    }

    @Override
    public Node findNodeById(String nodeId, String graphId) {
        return nodeRepository.findNodeByNodeId(nodeId, graphId);
    }


    @Override
    public DataDocumentMetadata getDataDocumentMetadata(String id) throws Exception {
        return null;
    }

    @Override
    @Async
    @Transactional
    public int storeNetworkGraph(NetworkGraph graph) throws Exception {

        List<Long> insertedNodes = new ArrayList<>();

        List<Long> insertedEdges = new ArrayList<>();
        graph.getLinks().stream().forEach(edge ->
                edge.getTransfers().stream().forEach(transfer ->
                        insertedEdges.add(hasWeightRepository.save(transfer).getId())
                )
        );

        System.out.println("Inserted successfully:" + insertedEdges.size() + "relations");
        int results = insertedNodes.size() + insertedEdges.size();
        return results;
    }

    @Override
    public List<Node> getTopNodesOfGraph(String subGraphId, int num) throws Exception {
    	List<TopNodesResult> nodes = nodeRepository.findTopNodes(subGraphId, num);
		return GraphVisualizationHelper.resizeNodesWithLinks(nodes, networkGraphConfig);
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

    @Override
    public List<String> getAllTimestamps(String graphId) throws Exception {
        String times = nodeRepository.findAllDatesOrderByDate(graphId);
        String[] t = times.split(",");
        List<String> timestamps = Arrays.asList(t);
        return timestamps;
    }

    @Override
    public List<Node> getFilteredGraph(String subGraphId, Map<String, String> query) throws Exception {
        return hasWeightRepository.findNodesByProperties( session, subGraphId, query);
    }

    @Override
    public List<String> getPropertyValues(String property,String graphId) {
        return nodePropertyRepository.findDistinctValuesByNameAndNodeSubGraphId(property, graphId);
    }

}
