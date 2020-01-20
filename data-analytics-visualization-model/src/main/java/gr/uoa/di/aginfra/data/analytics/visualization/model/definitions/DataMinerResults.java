package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions;

import java.util.List;

public class DataMinerResults {

    private List<DropdownProperties> header ;
    private String[][] data ;

    public DataMinerResults(){

    }
    public DataMinerResults(List<DropdownProperties> header, String[][] data){
        this.header = header;
        this.data = data;
    }

    public List<DropdownProperties> getHeader() {
        return header;
    }

    public void setHeader(List<DropdownProperties> header) {
        this.header = header;
    }

    public String[][] getData() {
        return data;
    }

    public void setData(String[][] data) {
        this.data = data;
    }
}
