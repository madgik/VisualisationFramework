package gr.uoa.di.aginfra.data.analytics.visualization.service.graphql;

import com.coxautodev.graphql.tools.GraphQLResolver;

public class PostResolver implements GraphQLResolver<Post> {

	public Author getAuthor(Post post) {
		Author author = new Author();
		author.setId("12");
		author.setName("123");
		author.setThumbnail("aaaaa");
		return author;
	}
}
