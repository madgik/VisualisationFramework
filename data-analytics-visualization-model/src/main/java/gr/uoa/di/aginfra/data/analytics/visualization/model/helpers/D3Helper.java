package gr.uoa.di.aginfra.data.analytics.visualization.model.helpers;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.DateNode;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.HasDateNode;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.Node;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.NodeProperty;

import java.util.*;

import static org.neo4j.ogm.session.Utils.map;

public class D3Helper {

    public static Map<String, Object> nodesToD3Format(Collection<Node> nodeEntities) {
        List<Map<String, Object>> nodes = new ArrayList<>();
        List<Map<String, Object>> rels = new ArrayList<>();
        int i = 0;
        Iterator<Node> result = nodeEntities.iterator();
        while (result.hasNext()) {
            Node node = result.next();

            Map<String,Object> nodeMap = map("id", node.getNodeId(), "latitude",  node.getLatitude(), "longitude", node.getLongitude());
            for(NodeProperty property: node.getNodeProperties()){
                nodeMap.put(property.getName(), property.getValue());
            }
            nodes.add(nodeMap);

            int source = i;
            i++;
            for (HasDateNode hasDateNode : node.getHasDateNodes()) {
                rels.add(map("source", hasDateNode.getSource(), "target", hasDateNode));
            }
        }
        return map("nodes", nodes, "links", rels);
    }

    public static Map<String, Object> dateNodesToD3Format(Collection<DateNode> dateNodesEntities) {
        List<Map<String, Object>> nodes = new ArrayList<>();
        List<Map<String, Object>> rels = new ArrayList<>();

        Iterator<DateNode> result = dateNodesEntities.iterator();
        while (result.hasNext()) {
            DateNode dateNode = result.next();

            Map<String,Object> nodeMap = map("id", dateNode.getParentId(), "latitude",  dateNode.getParentNode().getLatitude(), "longitude", dateNode.getParentNode().getLongitude());
            for(NodeProperty property: dateNode.getParentNode().getNodeProperties()){
                nodeMap.put(property.getName(), property.getValue());
            }
            nodes.add(nodeMap);

            rels.add(map("source", dateNode.getParentNode().getNodeId(), "target", dateNode.getHasWeight().getTarget().getParentNode().getNodeId(),
                    "weight", dateNode.getHasWeight().getWeight()));

        }
        return map("nodes", nodes, "links", rels);
    }

}
