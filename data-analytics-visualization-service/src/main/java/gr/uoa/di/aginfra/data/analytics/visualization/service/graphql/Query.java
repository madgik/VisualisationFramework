package gr.uoa.di.aginfra.data.analytics.visualization.service.graphql;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;

import java.util.ArrayList;
import java.util.List;

public class Query implements GraphQLQueryResolver {

	public List<Post> getRecentPosts(int count, int offset) {
		List<Post> posts = new ArrayList<>();
		Post p = new Post();
		p.setId("1");
		p.setTitle("2");
		p.setCategory("3");
		p.setAuthorId("4");
		posts.add(p);
		return posts;
	}
}
