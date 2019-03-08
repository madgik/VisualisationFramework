package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph;

import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;

import java.util.Map;

@NodeEntity
public class Node extends SubGraphEntity{

    @Id
    private String id;

    private double latitude;

    private double longitude;

    private Map<String, String> timeData;

    private Map<String, String> attributes;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public Map<String, String> getTimeData() {
        return timeData;
    }

    public void setTimeData(Map<String, String> timeData) {
        this.timeData = timeData;
    }

    public Map<String, String> getAttributes() {
        return attributes;
    }

    public void setAttributes(Map<String, String> attributes) {
        this.attributes = attributes;
    }
}
