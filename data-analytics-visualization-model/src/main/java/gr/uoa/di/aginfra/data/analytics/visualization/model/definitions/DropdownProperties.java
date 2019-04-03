package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;

public class DropdownProperties {

    private String text;
    private int key, value;

    public  DropdownProperties(){

    }

    public DropdownProperties(int key, String text, int value)
    {
        this.text = text;
        this.key = key;
        this.value = value;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getKey() {
        return key;
    }

    public void setKey(int key) {
        this.key = key;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class NodeDto {
        private String id;

        @JsonProperty("x")
        private double x;

        @JsonProperty("y")
        private double y;

        private Map<String, String> attributes;

        private double size;

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public double getX() {
            return x;
        }

        public void setX(double x) {
            this.x = x;
        }

        public double getY() {
            return y;
        }

        public void setY(double y) {
            this.y = y;
        }

        public Map<String, String> getAttributes() {
            return attributes;
        }

        public void setAttributes(Map<String, String> attributes) {
            this.attributes = attributes;
        }

        public double getSize() {
            return size;
        }

        public void setSize(double size) {
            this.size = size;
        }
    }
}
