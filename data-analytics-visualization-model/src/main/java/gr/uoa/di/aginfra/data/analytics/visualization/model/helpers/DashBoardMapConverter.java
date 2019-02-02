package gr.uoa.di.aginfra.data.analytics.visualization.model.helpers;

import org.geojson.Feature;
import org.geojson.FeatureCollection;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.*;
import java.util.stream.Collectors;

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

    public static class CropDetails{
        private String year;
        private String crop_code;
        private String crop_name;
        private String fieldid;
        private String area;
        private String perimeter;


        public CropDetails(){
        }

        public CropDetails(String year, String crop_code, String crop_name, String fieldid, String area, String perimeter){
            this.year = year;
            this.crop_code = crop_code;
            this.crop_name = crop_name;
            this.fieldid = fieldid;
            this.area = area;
            this.perimeter = perimeter;

        }

        public String getYear() {
            return year;
        }

        public void setYear(String year) {
            this.year = year;
        }

        public String getCrop_code() {
            return crop_code;
        }

        public void setCrop_code(String crop_code) {
            this.crop_code = crop_code;
        }

        public String getCrop_name() {
            return crop_name;
        }

        public void setCrop_name(String crop_name) {
            this.crop_name = crop_name;
        }

        public String getFieldid() {
            return fieldid;
        }

        public void setFieldid(String fieldid) {
            this.fieldid = fieldid;
        }

        public String getArea() {
            return area;
        }

        public void setArea(String area) {
            this.area = area;
        }

        public String getPerimeter() {
            return perimeter;
        }

        public void setPerimeter(String perimeter) {
            this.perimeter = perimeter;
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

    public static List<FieldDetails> soilDetailsConvert(Map<String,?> properties)
    {
        List<FieldDetails> fieldDetails = new ArrayList<>();
        if(properties.get("soilcode") != null) {
            FieldDetails fieldDetail = new FieldDetails("soilcode",String.valueOf((properties.get("soilcode"))));
            fieldDetails.add(fieldDetail);
        }
        if(properties.get("soilname") != null) {
            FieldDetails fieldDetail = new FieldDetails("soilname",String.valueOf((properties.get("soilname"))));
            fieldDetails.add(fieldDetail);
        }
        if(properties.get("soiltype") != null) {
            FieldDetails fieldDetail = new FieldDetails("soiltype",String.valueOf((properties.get("soiltype"))));
            fieldDetails.add(fieldDetail);
        }

        return fieldDetails;
    }

    public static List<CropDetails> cropDetailsConvert(List<Feature> features){
        List<CropDetails> cropDetails = new ArrayList<>();
        for(Feature feature : features){
            Map<String, ?> properties = feature.getProperties();
            CropDetails cropDetail = new CropDetails(String.valueOf((properties.get("year"))), String.valueOf((properties.get("crop_code"))), String.valueOf((properties.get("crop_name")))
            , String.valueOf((properties.get("fieldid"))), String.valueOf((properties.get("area"))), String.valueOf((properties.get("perimeter"))));

            cropDetails.add(cropDetail);
        }

        return cropDetails;
    }

}
