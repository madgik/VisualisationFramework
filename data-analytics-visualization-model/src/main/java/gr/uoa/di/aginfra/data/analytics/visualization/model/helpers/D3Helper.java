package gr.uoa.di.aginfra.data.analytics.visualization.model.helpers;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.DateNode;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.HasDateNode;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.Node;

import java.util.*;

import static org.neo4j.ogm.session.Utils.map;

public class D3Helper {

    private static Map<String, Object> nodesToD3Format(Collection<Node> nodeEntities) {
        List<Map<String, Object>> nodes = new ArrayList<>();
        List<Map<String, Object>> rels = new ArrayList<>();
        int i = 0;
        Iterator<Node> result = nodeEntities.iterator();
        while (result.hasNext()) {
            Node node = result.next();

            nodes.add(map("id", node.getNodeId(), "label", "movie"));
            int target = i;
            i++;
            for (HasDateNode hasDateNode : node.getHasDateNodes()) {
                Map<String, Object> actor = map("id", node.getNodeId(), "label", "actor");

                int source = nodes.indexOf(actor);
                if (source == -1) {
                    nodes.add(actor);
                    source = i++;
                }
                rels.add(map("source", source, "target", target));
            }
        }
        return map("nodes", nodes, "links", rels);
    }

    private static Map<String, Object> dateNodesToD3Format(Collection<DateNode> dateNodesEntities) {
        List<Map<String, Object>> nodes = new ArrayList<>();
        List<Map<String, Object>> rels = new ArrayList<>();

        return map("nodes", nodes, "links", rels);
    }

}
