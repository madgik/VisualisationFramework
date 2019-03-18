package gr.uoa.di.aginfra.data.analytics.visualization.service.dtos;



import java.util.List;

public class NetworkGraphDto {

    String id;

    String name;

    List<NodeDto> nodes;

    List<EdgeDto> edgeDtos;

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

    public List<EdgeDto> getEdgeDtos() {
        return edgeDtos;
    }

    public void setEdgeDtos(List<EdgeDto> edgeDtos) {
        this.edgeDtos = edgeDtos;
    }
}
