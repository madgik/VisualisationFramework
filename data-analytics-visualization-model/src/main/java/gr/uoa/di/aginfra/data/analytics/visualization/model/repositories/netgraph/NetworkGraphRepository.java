package gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.netgraph;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.NetworkGraph;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.AbstractGraphRepositoryQuery;
import org.springframework.stereotype.Repository;

public interface NetworkGraphRepository extends Neo4jRepository<NetworkGraph, String> {

}
