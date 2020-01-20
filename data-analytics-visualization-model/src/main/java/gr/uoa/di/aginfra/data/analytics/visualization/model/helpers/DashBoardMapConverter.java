package gr.uoa.di.aginfra.data.analytics.visualization.model.helpers;

import gr.uoa.di.aginfra.data.analytics.visualization.model.services.DashBoardService;

import java.util.*;

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

    public static class SoilDetails{
        private String fieldid;
        private String soilid;
        private String soilcode;
        private String area;
        private String perimeter;
        private Soil soil;


        public SoilDetails(){
        }

        public SoilDetails(String fieldid, String soilid, String soilcode, String area, String perimeter){
            this.fieldid = fieldid;
            this.soilid = soilid;
            this.soilcode = soilcode;
            this.area = area;
            this.perimeter = perimeter;

        }

        public Soil getSoil() {
            return soil;
        }

        public void setSoil(Soil soil) {
            this.soil = soil;
        }

        public String getPerimeter() {
            return perimeter;
        }

        public void setPerimeter(String perimeter) {
            this.perimeter = perimeter;
        }

        public String getFieldid() {
            return fieldid;
        }

        public void setFieldid(String fieldid) {
            this.fieldid = fieldid;
        }

        public String getSoilid() {
            return soilid;
        }

        public void setSoilid(String soilid) {
            this.soilid = soilid;
        }

        public String getSoilcode() {
            return soilcode;
        }

        public void setSoilcode(String soilcode) {
            this.soilcode = soilcode;
        }

        public String getArea() {
            return area;
        }

        public void setArea(String area) {
            this.area = area;
        }
    }

    public static class Soil {
        private String entityid;
        private String soilcode;
        private String soilname;
        private String soiltype;
        private String area;
        private String perimeter;


        public  Soil(){

        }

        public Soil(String entityid,String soilcode,String soilname,String soiltype,String area,String perimeter){

            this.entityid = entityid;
            this.soilcode = soilcode;
            this.soilname = soilname;
            this.soiltype = soiltype;
            this.area = area;
            this.perimeter = perimeter;

        }

        public String getEntityid() {
            return entityid;
        }

        public void setEntityid(String entityid) {
            this.entityid = entityid;
        }

        public String getSoilcode() {
            return soilcode;
        }

        public void setSoilcode(String soilcode) {
            this.soilcode = soilcode;
        }

        public String getSoilname() {
            return soilname;
        }

        public void setSoilname(String soilname) {
            this.soilname = soilname;
        }

        public String getSoiltype() {
            return soiltype;
        }

        public void setSoiltype(String soiltype) {
            this.soiltype = soiltype;
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

    public static List<FieldDetails> FieldDetailsConvert(Map<String,?> properties)
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

    public static List<SoilDetails> soilDetailsConvert(String fieldId, List<Feature> features)
    {
        List<SoilDetails> soilDetailsList = new ArrayList<>();
        for(Feature feature : features){
            Map<String, ?> properties = feature.getProperties();
            List<LinkedHashMap<String, String>> props = (List<LinkedHashMap<String, String>>) properties.get(("soilunits"));
            if(props.size() > 0){
                LinkedHashMap<String, String> stringStringLinkedHashMap = props.get(0);
                SoilDetails soilDetails = new SoilDetails(fieldId, String.valueOf((stringStringLinkedHashMap.get("id"))), String.valueOf((stringStringLinkedHashMap.get("soil_code")))
                    , String.valueOf(properties.get("area")), String.valueOf((properties.get("perimeter"))));
//
            soilDetailsList.add(soilDetails);
            }
            String οbject = String.valueOf(properties.get("soilunits"));


//            SoilDetails soilDetails = new SoilDetails(String.valueOf((properties.get("fieldid"))), String.valueOf((properties.get("soilid"))), String.valueOf((properties.get("soilcode")))
//                    , String.valueOf(properties.get("area")), String.valueOf((properties.get("perimeter"))));
//
//            soilDetailsList.add(soilDetails);
        }

        return soilDetailsList;
    }

    public static Soil soilConvert(Feature feature)
    {
            Map<String, ?> properties = feature.getProperties();
            Soil soil = new Soil(String.valueOf((properties.get("entityid"))), String.valueOf((properties.get("soilcode"))), String.valueOf((properties.get("soilname")))
                    , String.valueOf(properties.get("soiltype")), String.valueOf((properties.get("area"))), String.valueOf((properties.get("perimeter"))));

        return soil;
    }

    public static List<CropDetails> cropDetailsConvert(List<Feature> features, DashBoardService dashBoardService, String gCubeUrl, Map<String, Object> params) throws Exception {
        List<CropDetails> cropDetails = new ArrayList<>();
        params.remove("geometry");
        for(Feature feature : features){
            Map<String, ?> properties = feature.getProperties();
            FeatureCollection fieldDetailsFeatureCollection = dashBoardService.getFieldDetails(gCubeUrl + "/" + properties.get("fieldid"), params);
            List<DashBoardMapConverter.FieldDetails> fieldDetails = DashBoardMapConverter.fieldInfoConvert(fieldDetailsFeatureCollection.getFeatures().get(0).getProperties());


            CropDetails cropDetail = new CropDetails(String.valueOf((properties.get("year"))), String.valueOf((properties.get("crop_code"))), String.valueOf((properties.get("crop_name")))
            , String.valueOf((properties.get("fieldid"))), String.valueOf((fieldDetails.get(3).value)), String.valueOf((fieldDetails.get(1  ).value)));

            cropDetails.add(cropDetail);
        }
        cropDetails.sort(Comparator.comparing(CropDetails::getYear));

        return cropDetails;
    }


    public static String getColor(Feature feature){

        int crop_code = Integer.parseInt(String.valueOf(feature.getProperties().get("crop_code")));
        String grondgebruik = String.valueOf(feature.getProperties().get("grondgebruik"));

        if(crop_code == 256)
            return "#BC1AE4";
        else if(crop_code == 236)
            return "#FB5599";
        else if(crop_code == 252 || crop_code == 253)
            return "#FF7F00";
        else if(crop_code == 259)
            return "#DBDB30";
        else if(crop_code == 233)
            return "#D55C24";
        else if(grondgebruik.equals("Bouwland"))
            return "#FDF1E3";
        else if(grondgebruik.equals("Grasland"))
            return "#E3ECD4";
        else if(grondgebruik.equals("Natuurterrein"))
            return "#C2E4CC";
        else if(grondgebruik.equals("Braakland") || grondgebruik.equals("Overige"))
            return "#D3D3D3";
        else
            return "#E6C4DC";
    }
}
