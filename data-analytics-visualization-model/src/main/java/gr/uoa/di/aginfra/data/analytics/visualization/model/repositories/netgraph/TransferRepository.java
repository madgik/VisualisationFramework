package gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.netgraph;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.HasWeight;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransferRepository extends Neo4jRepository<HasWeight, String> {

}
