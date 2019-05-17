package gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.netgraph;

import com.google.common.collect.Lists;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.HasWeight;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.Node;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.NodeProperty;
import org.neo4j.ogm.cypher.ComparisonOperator;
import org.neo4j.ogm.cypher.Filter;
import org.neo4j.ogm.cypher.Filters;
import org.neo4j.ogm.session.Session;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


public class CustomHasWeightRepositoryImpl implements CustomHasWeightRepository {

    @Override
    public List<HasWeight> findHasWeightsByProperties(Session session, String graphId, Map<String, String> queryParams) {

        Filters filters = new Filters(new Filter("subGraphId", ComparisonOperator.EQUALS, graphId));
        queryParams.entrySet().stream().forEach(q -> {
            String[] params = q.getKey().split("-");
            if (params.length > 1) {
                if (params[1].equals("1")) {
                    filters.and(new Filter("name", ComparisonOperator.EQUALS, q.getKey()));
                    filters.and(new Filter("value", ComparisonOperator.GREATER_THAN_EQUAL, q.getValue()));
                } else {
                    filters.and(new Filter("name", ComparisonOperator.EQUALS, q.getKey()));
                    filters.and(new Filter("value", ComparisonOperator.LESS_THAN_EQUAL, q.getValue()));
                }
            } else {
                filters.and(new Filter("name", ComparisonOperator.EQUALS, q.getKey()));
                filters.and(new Filter("value", ComparisonOperator.EQUALS, q.getValue()));
            }
        });

        Collection<NodeProperty> properties = session.loadAll(NodeProperty.class, filters, 2);

        return null;
    }

    public List<Node> findNodesByProperties(Session session, String graphId, Map<String, String> queryParams) {

        String cypher = "";
        Map<String, String> params = new HashMap<>();
        int i = 0;
        for (Map.Entry<String, String> entry : queryParams.entrySet()) {
            cypher += "MATCH (p" + i + ":NodeProperty)-[hp" + i + ":HAS_PROPERTY]-(n:Node{subGraphId: $id})\n";
            cypher += " ";
            params.put("id", graphId);

            String[] rangeParams = entry.getKey().split("-");

            if (rangeParams.length > 2) {
                if (rangeParams[1].equals("property") && rangeParams[2].equals("1")) {
                    cypher += "WHERE n.property>=$propertyFrom \n";
                    params.put("propertyFrom", entry.getValue());
                } else if (rangeParams[1].equals("property") && rangeParams[2].equals("2")) {
                    cypher += "WHERE n.property<=$propertyTo \n";
                    params.put("propertyTo", entry.getValue());
                } else if (rangeParams[1].equals("weight") && rangeParams[2].equals("1")) {
//                    cypher += "WHERE n.weight>=$property \n";
//                    params.put("weight", rangeParams[0]);
                } else if (rangeParams[1].equals("weight") && rangeParams[2].equals("2")) {
//                    cypher += "WHERE n.weight<=$property \n";
//                    params.put("weight", rangeParams[0]);
                }
            }
            else if (rangeParams.length > 1) {
                if (rangeParams[1].equals("1")) {
                    cypher += "WHERE p" + i + ".name=$name" + i + " and p" + i + ".value>=$valueFrom" + i + "\n";
                    params.put("value" + i, entry.getValue());
                } else {
                    cypher += "WHERE p" + i + ".name=$name" + i + " and p" + i + ".value<=$valueTo" + i + "\n";
                    params.put("value" + i, entry.getValue());
                }
                params.put("name" + i, rangeParams[0]);
            } else {
                cypher += "WHERE p" + i + ".name=$name" + i + " and p" + i + ".value=$value" + i + "\n";
                params.put("name" + i, entry.getKey());
                params.put("value" + i, entry.getValue());
            }
//            cypher += "Return p" + i + ",hp" + i +",";

            i++;
        }
        cypher += "MATCH (p:NodeProperty)-[hp:HAS_PROPERTY]-(n)\n";
        cypher += "Return p,hp,n LIMIT 50";
        System.out.println(cypher);
//        for(int j =0)
//        Map<String, Object> params = new HashMap<>();


        Iterable<Node> nodes = session.query(Node.class, cypher, params);

        return Lists.newArrayList(nodes);
    }
}
