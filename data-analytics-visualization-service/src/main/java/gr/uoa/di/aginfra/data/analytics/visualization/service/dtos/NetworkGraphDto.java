package gr.uoa.di.aginfra.data.analytics.visualization.service.dtos;

import java.util.List;
import java.util.Map;

public class NetworkGraphDto {
    String id;

    String name;

    Map<String, String> nodes;

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

    public Map<String, String> getNodes() {
        return nodes;
    }

    public void setNodes(Map<String, String> nodes) {
        this.nodes = nodes;
    }
}
