package gr.uoa.di.aginfra.data.analytics.visualization.service.dtos;

import java.util.Map;

public class EdgeDto {
    private String source;

    private String target;

    private Map<String, String> attributes;

    private int value;

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public Map<String, String> getAtributes() {
        return attributes;
    }

    public void setAttributes(Map<String, String> attributes) {
        this.attributes = attributes;
    }
}

