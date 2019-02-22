package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions;


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
}
