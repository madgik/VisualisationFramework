package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions;

import java.util.ArrayList;
import java.util.List;

public class MMNode {
	private String id;
	private String color;
	private String topic;
	private String direction;
	private String link;
	private List<MMNode> children;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getTopic() {
		return topic;
	}

	public void setTopic(String topic) {
		this.topic = topic;
	}

	public String getDirection() {
		return direction;
	}

	public void setDirection(String direction) {
		this.direction = direction;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public List<MMNode> getChildren() {
		if (children == null) children = new ArrayList<>();
		return children;
	}

	public void setChildren(List<MMNode> children) {
		this.children = children;
	}
}
