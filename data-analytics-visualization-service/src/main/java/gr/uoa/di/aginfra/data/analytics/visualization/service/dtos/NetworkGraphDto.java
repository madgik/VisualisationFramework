package gr.uoa.di.aginfra.data.analytics.visualization.service.dtos;



import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class NetworkGraphDto {

    String id;

    String name;

    @JsonProperty("nodes")
    List<NodeDto> nodes;

    @JsonProperty("edges")
    List<EdgeDto> edges;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<NodeDto> getNodes() {
        return nodes;
    }

    public void setNodes(List<NodeDto> nodes) {
        this.nodes = nodes;
    }

    public List<EdgeDto> getEdges() {
        return edges;
    }

    public void setEdges(List<EdgeDto> edges) {
        this.edges = edges;
    }
}
