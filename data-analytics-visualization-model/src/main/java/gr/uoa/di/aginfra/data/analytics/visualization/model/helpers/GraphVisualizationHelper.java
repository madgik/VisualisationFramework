package gr.uoa.di.aginfra.data.analytics.visualization.model.helpers;

import gr.uoa.di.aginfra.data.analytics.visualization.model.config.NetworkGraphConfig;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.*;
import gr.uoa.di.aginfra.data.analytics.visualization.model.services.NetworkGraphService;
import org.springframework.beans.factory.annotation.Autowired;
import sun.nio.ch.Net;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import static org.neo4j.ogm.session.Utils.map;

public class GraphVisualizationHelper {
	private static int minSize = 200;

	@Autowired
	private NetworkGraphConfig config;

	public static Map<String, Object> nodesToD3Format(Collection<Node> nodeEntities, boolean isInitialization) {
		List<Map<String, Object>> nodes = new ArrayList<>();
		List<Map<String, Object>> rels = new ArrayList<>();
		int i = 0;
		Iterator<Node> result = nodeEntities.iterator();
		while (result.hasNext()) {
			Node node = result.next();

			Map<String, Object> nodeMap = map("id", node.getNodeId(), "x", Math.abs(node.getX())+1000, "y", node.getY(), "size", node.getSize(), "color", node.getColor());
			for (NodeProperty property : node.getNodeProperties()) {
				nodeMap.put(property.getName(), property.getValue());
			}

			double value = 0.0;
			for (HasDateNode hasDateNode : node.getHasDateNodes()) {
				double temp = Double.parseDouble(hasDateNode.getTarget().getProperty());
				if (temp > value) {
					value = Double.parseDouble(hasDateNode.getTarget().getProperty());
				}
				rels.add(map("source", node.getNodeId(), "target", hasDateNode.getTarget().getHasWeight().getTarget().getParentId(), "weight", hasDateNode.getTarget().getHasWeight().getWeight(), "color", "lightblue", "highlightColor", "lightblue")); // "color", "blue"
			}
			nodeMap.put("value", value);
			nodes.add(nodeMap);

		}
		//spoof links for visualization
		if (isInitialization) {

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

			Map<String, Object> nodeMap = map("id", node.getNodeId(), "x",  Math.abs(node.getX())+1000, "y", node.getY());
			for (NodeProperty property : node.getNodeProperties()) {
				nodeMap.put(property.getName(), property.getValue());
			}
			nodeMap.put("value", "0.0");

			nodes.add(nodeMap);


			rels.add(map("source", sourceId, "target", node.getNodeId(), "color", "lightblue", "highlightColor", "blue")); // "color", "blue"

		}
		//spoof links for visualization
		if (isInitialization) {

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

			Map<String, Object> nodeMap = map("id", dateNode.getParentId()); //"latitude",  dateNode.getParentNode().getX(), "longitude", dateNode.getParentNode().getY()
			for (NodeProperty property : dateNode.getParentNode().getNodeProperties()) {
				nodeMap.put(property.getName(), property.getValue());
			}
			nodeMap.put("value", dateNode.getProperty());
			nodes.add(nodeMap);

			rels.add(map("source", dateNode.getParentNode().getNodeId(), "target", dateNode.getHasWeight().getTarget().getParentNode().getNodeId(),
					"weight", dateNode.getHasWeight().getWeight()));

		}
		return map("nodes", nodes, "links", rels);
	}


	public static Map<String, Object> hasWeightToD3Format(Collection<HasWeight> nodeEntities, String graphId, NetworkGraphService networkGraphService, NetworkGraphConfig config) {
		List<Map<String, Object>> nodes = new ArrayList<>();
		Set<Map<String, Object>> rels = new HashSet<>();
		int i = 0;
		Iterator<HasWeight> result = nodeEntities.iterator();
		Map<String, Node> existedNodes = new HashMap<>();
		Map<String, String> existedLinks = new HashMap<>();

		Map<HasWeight, String> targetIds = new HashMap<>();
		while (result.hasNext()) {
			HasWeight hasWeight = result.next();
			Node node = hasWeight.getSource().getParentNode();
			if (node == null) {
				node = networkGraphService.findNodeById(hasWeight.getSource().getParentId(), graphId);
			}
			if (existedNodes.get(node.getNodeId()) == null) {
				existedNodes.put(hasWeight.getSource().getParentId(), node);
				node.setSize(resizeNode(node, hasWeight));
				node.setColor(getNodeColor(hasWeight, config));

				Map<String, Object> nodeMap = map("id", node.getNodeId(), "value", hasWeight.getSource().getProperty(), "size", node.getSize(), "color", node.getColor(),"x", Math.abs(node.getX())+1000, "y", node.getY());
				for (NodeProperty property : node.getNodeProperties()) {
					nodeMap.put(property.getName(), property.getValue());
				}
				nodes.add(nodeMap);
			}

			if (existedLinks.get(node.getNodeId() + "," + hasWeight.getTarget().getParentId()) == null) {
				existedLinks.put(node.getNodeId() + "," + hasWeight.getTarget().getParentId(), "");
				targetIds.put(hasWeight, hasWeight.getTarget().getProperty());
				rels.add(map("source", node.getNodeId(), "target", hasWeight.getTarget().getParentId(), "weight", hasWeight.getWeight(), "color", "lightblue", "highlightColor", "blue")); // "color", "blue"

			}
		}
		targetIds.entrySet().stream().forEach(t -> {
			if (existedNodes.get(t) == null) {
				Node node = networkGraphService.findNodeById(t.getKey().getTarget().getParentId(), graphId);
				if (node != null) {
					node.setSize(resizeNode(node, t.getKey()));
					node.setColor(getNodeColor(t.getKey(), config));

					Map<String, Object> nodeMap = map("id", node.getNodeId(), "value", t.getValue(), "size", node.getSize(), "color", node.getColor(), "x",  Math.abs(node.getX())+1000, "y", node.getY());
					for (NodeProperty property : node.getNodeProperties()) {
						nodeMap.put(property.getName(), property.getValue());
					}

					nodes.add(nodeMap);
				}
			}
		});

		return map("nodes", nodes, "links", rels);
	}

	public static List<String> datesToDateStrings(List<String> dates) {

		List<String> dateStrings = dates.stream().map(date -> {
			StringBuilder sb = new StringBuilder(date);
			sb.insert(4, '.');
			return sb.toString();
		}).collect(Collectors.toList());
		return dateStrings;
	}

	public static List<Node> resizeNodesWithLinks(List<TopNodesResult> nodes, NetworkGraphConfig config) {

		List<Node> result = nodes.stream()
				.filter(distinctByKey(node->node.getNode().getId()))
				.map(node -> {
//					System.out.println(node.getLinks());
					node.getNode().setSize(minSize + 3 * node.getLinks());
					if (node.getLinks() < config.getMinNodeLinks()) {
						node.getNode().setColor(config.getMinNodeColor());
					}
					else if (node.getLinks() > config.getMaxNodeLinks()) {
						node.getNode().setColor(config.getMaxNodeColor());
					}
					else {
						node.getNode().setColor(config.getMediumNodeColor());
					}
					return node.getNode();
				})
				.collect(Collectors.toList());
		return result;
	}


	public static int resizeNode(Node node, HasWeight hasWeight) {
		if(hasWeight.getWeight()<100)
			return (int) (hasWeight.getWeight() * 100 + minSize);
		else
			return (int) (hasWeight.getWeight() + minSize);
	}

	public static String getNodeColor(HasWeight hasWeight, NetworkGraphConfig config) {
		if (hasWeight.getWeight() < config.getMinNodeSize()) {
			return  config.getMinNodeColor();
		}
		else if (hasWeight.getWeight() > config.getMaxNodeSize()) {
			return config.getMaxNodeColor();
		}
		else {
			return config.getMediumNodeColor();
		}
	}


	public static <T> Predicate<T> distinctByKey(Function<? super T, Object> keyExtractor) {
		Map<Object, Boolean> map = new ConcurrentHashMap<>();
		return t -> map.putIfAbsent(keyExtractor.apply(t), Boolean.TRUE) == null;
	}

}
