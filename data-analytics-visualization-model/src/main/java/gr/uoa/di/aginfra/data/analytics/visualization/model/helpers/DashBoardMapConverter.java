package gr.uoa.di.aginfra.data.analytics.visualization.model.helpers;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class DashBoardMapConverter {

    public static class FieldDetails{
        private String key;
        private String value;

        public FieldDetails(){
        }

        public FieldDetails(String key, String value){
            this.key = key;
            this.value = value;
        }

        public String getKey() {
            return key;
        }

        public void setKey(String key) {
            this.key = key;
        }

        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }
    }

    public static List<FieldDetails> fieldInfoConvert(Map<String,?> properties)
    {
        List<FieldDetails> fieldDetails = new ArrayList<>();
        properties.forEach((k,v)->{
            System.out.println("Key : " + k + " Value : " + v);
           FieldDetails fieldDetail = new FieldDetails(k,String.valueOf(v));
           fieldDetails.add(fieldDetail);
        });

        return fieldDetails;
    }


}
