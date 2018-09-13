package gr.uoa.di.aginfra.data.analytics.visualization.service.graphql;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;

public class Mutation implements GraphQLMutationResolver {

	public Post writePost(String title, String text, String category) {
		Post p = new Post();
		p.setId("1");
		p.setTitle("2");
		p.setCategory("3");
		p.setAuthorId("4");
		return p;
	}
}
