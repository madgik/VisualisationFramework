package gr.uoa.di.aginfra.data.analytics.visualization.model.helpers;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.*;
import gr.uoa.di.aginfra.data.analytics.visualization.model.services.NetworkGraphService;

import java.util.*;
import java.util.stream.Collectors;

import static org.neo4j.ogm.session.Utils.map;

public class D3Helper {

    public static Map<String, Object> nodesToD3Format(Collection<Node> nodeEntities, boolean isInitialization) {
        List<Map<String, Object>> nodes = new ArrayList<>();
        List<Map<String, Object>> rels = new ArrayList<>();
        int i = 0;
        Iterator<Node> result = nodeEntities.iterator();
        while (result.hasNext()) {
            Node node = result.next();

            Map<String,Object> nodeMap = map("id", node.getNodeId(), "latitude",  node.getX(), "longitude", node.getY());
            for(NodeProperty property: node.getNodeProperties()){
                nodeMap.put(property.getName(), property.getValue());
            }

            nodes.add(nodeMap);

            for (HasDateNode hasDateNode : node.getHasDateNodes()) {
                rels.add(map("source", node.getNodeId(), "target", hasDateNode.getTarget().getHasWeight().getTarget().getParentId(),"weight",hasDateNode.getTarget().getHasWeight().getWeight(), "color", "lightblue","highlightColor", "lightblue")); // "color", "blue"
            }
        }
        //spoof links for visualization
        if( isInitialization) {

            if (rels.size() == 0) {
                Node source = null;
                for (Node node : nodeEntities) {
                    if (i > 0) {
                        rels.add(map("source", source.getNodeId(), "target", node.getNodeId(), "color", "transparent", "highlightColor", "lightblue"));
                    } else {
                        source = node;
                    }
                    i++;
                }
            }
        }
        return map("nodes", nodes, "links", rels);
    }

    public static Map<String, Object> neighborsNodesToD3Format(Collection<Node> nodeEntities, String sourceId, boolean isInitialization) {
        List<Map<String, Object>> nodes = new ArrayList<>();
        List<Map<String, Object>> rels = new ArrayList<>();
        int i = 0;
        Iterator<Node> result = nodeEntities.iterator();
        while (result.hasNext()) {
            Node node = result.next();

            Map<String,Object> nodeMap = map("id", node.getNodeId()) ;//"latitude",  node.getX(), "longitude", node.getY()
            for(NodeProperty property: node.getNodeProperties()){
                nodeMap.put(property.getName(), property.getValue());
            }

            nodes.add(nodeMap);


            rels.add(map("source", sourceId, "target", node.getNodeId(), "color", "lightblue","highlightColor", "blue")); // "color", "blue"

        }
        //spoof links for visualization
        if( isInitialization) {

            if (rels.size() == 0) {
                Node source = null;
                for (Node node : nodeEntities) {
                    if (i > 0) {
                        rels.add(map("source", source.getNodeId(), "target", node.getNodeId(), "color", "transparent", "highlightColor", "transparent"));
                    } else {
                        source = node;
                    }
                    i++;
                }
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

            Map<String,Object> nodeMap = map("id", dateNode.getParentId()); //"latitude",  dateNode.getParentNode().getX(), "longitude", dateNode.getParentNode().getY()
            for(NodeProperty property: dateNode.getParentNode().getNodeProperties()){
                nodeMap.put(property.getName(), property.getValue());
            }
            nodes.add(nodeMap);

            rels.add(map("source", dateNode.getParentNode().getNodeId(), "target", dateNode.getHasWeight().getTarget().getParentNode().getNodeId(),
                    "weight", dateNode.getHasWeight().getWeight()));

        }
        return map("nodes", nodes, "links", rels);
    }


    public static Map<String, Object> hasWeightToD3Format(Collection<HasWeight> nodeEntities, String graphId, NetworkGraphService networkGraphService) {
        List<Map<String, Object>> nodes = new ArrayList<>();
        Set<Map<String, Object>> rels = new HashSet<>();
        int i = 0;
        Iterator<HasWeight> result = nodeEntities.iterator();
        Map<String, Node> existedNodes = new HashMap<>();
        Map<String, String> existedLinks = new HashMap<>();

        Set<String> targetIds = new HashSet<>();
        while (result.hasNext()) {
            HasWeight hasWeight= result.next();
            Node node = hasWeight.getSource().getParentNode();
            if(node == null ) {
                node= networkGraphService.findNodeById(hasWeight.getSource().getParentId(),graphId);
            }
            if(existedNodes.get(node.getNodeId()) == null) {
                existedNodes.put(hasWeight.getSource().getParentId(), node);

                Map<String, Object> nodeMap = map("id", node.getNodeId(),  "value", hasWeight.getSource().getProperty()); // "x", node.getX(), "y", node.getY(),
                for (NodeProperty property : node.getNodeProperties()) {
                    nodeMap.put(property.getName(), property.getValue());
                }
                nodes.add(nodeMap);
            }

            if( existedLinks.get(node.getNodeId() + "," + hasWeight.getTarget().getParentId()) == null) {
                existedLinks.put(node.getNodeId() + "," + hasWeight.getTarget().getParentId(),"");
                targetIds.add(hasWeight.getTarget().getParentId());
                rels.add(map("source", node.getNodeId(), "target", hasWeight.getTarget().getParentId(), "weight", hasWeight.getWeight(), "color", "lightblue", "highlightColor", "blue")); // "color", "blue"

            }
        }
        targetIds.stream().forEach(t->{
            if( existedNodes.get(t) == null) {
                Node node= networkGraphService.findNodeById(t,graphId);
                Map<String,Object> nodeMap = map("id", node.getNodeId()); // "x",  node.getX(), "y"
                for(NodeProperty property: node.getNodeProperties()){
                    nodeMap.put(property.getName(), property.getValue());
                }
                nodes.add(nodeMap);
            }
        });

        return map("nodes", nodes, "links", rels);
    }

}
