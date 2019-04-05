package gr.uoa.di.aginfra.data.analytics.visualization.service.dtos.netgraph;



import com.fasterxml.jackson.annotation.JsonProperty;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DropdownProperties;

import java.util.List;

public class NetworkGraphDto {

    String id;

    String name;

    @JsonProperty("nodes")
    List<DropdownProperties.NodeDto> nodes;

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

    public List<DropdownProperties.NodeDto> getNodes() {
        return nodes;
    }

    public void setNodes(List<DropdownProperties.NodeDto> nodes) {
        this.nodes = nodes;
    }

    public List<EdgeDto> getEdges() {
        return edges;
    }

    public void setEdges(List<EdgeDto> edges) {
        this.edges = edges;
    }
}
