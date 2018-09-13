package gr.uoa.di.aginfra.data.analytics.visualization.service.controllers;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Configuration;
import gr.uoa.di.aginfra.data.analytics.visualization.model.services.ConfigurationService;
import gr.uoa.di.aginfra.data.analytics.visualization.service.dtos.ConfigurationDto;
import gr.uoa.di.aginfra.data.analytics.visualization.service.graphql.GraphQLRequest;
import gr.uoa.di.aginfra.data.analytics.visualization.service.graphql.Mutation;
import gr.uoa.di.aginfra.data.analytics.visualization.service.graphql.PostResolver;
import gr.uoa.di.aginfra.data.analytics.visualization.service.graphql.Query;
import gr.uoa.di.aginfra.data.analytics.visualization.service.mappers.EntityMapper;
import gr.uoa.di.aginfra.data.analytics.visualization.service.vres.VREResolver;
import graphql.ExecutionResult;
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.SchemaParser;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@CrossOrigin(exposedHeaders = "Location")
@RequestMapping("/" + GraphQLController.GRAPHQL_BASE_PATH)
public class GraphQLController extends BaseController {

	private static final Logger logger = LogManager.getLogger(GraphQLController.class);

	protected static final String GRAPHQL_BASE_PATH = "quering";

	private EntityMapper modelMapper;

	private VREResolver vreResolver;

	@Autowired
	public GraphQLController(ConfigurationService configurationService,
							 EntityMapper modelMapper,
							 VREResolver vreResolver) {
		this.modelMapper = modelMapper;
		this.vreResolver = vreResolver;
	}

	@RequestMapping(value = "/graphql", method = RequestMethod.POST)
	public ResponseEntity graphql(@RequestBody GraphQLRequest input) {
		String queryString = input.getQuery();

		GraphQLSchema schema = buildSchema();

		GraphQL build = GraphQL.newGraphQL(schema).build();
		ExecutionResult executionResult = build.execute(queryString);

		return ResponseEntity.ok(executionResult.getData());
	}

	private static GraphQLSchema buildSchema() {
		return com.coxautodev.graphql.tools.SchemaParser.newParser()
				.file("configurations.graphqls")
				.resolvers(new gr.uoa.di.aginfra.data.analytics.visualization.service.quering.Query())
				.build()
				.makeExecutableSchema();
	}
}
