package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.HashMap;
import java.util.Map;

public class DropdownProperties {

    private String text;
    private int key, value;
    private String unit;

    public DropdownProperties() {

    }

    public DropdownProperties(int key, String text, int value) {
        this.text = text;
        this.key = key;
        this.value = value;
    }

    public DropdownProperties(int key, String text, int value, String unit) {
        this.text = text;
        this.key = key;
        this.value = value;
        ScientificUnit scientificUnit = ScientificUnit.get(unit);
        if(scientificUnit != null)
            this.unit = scientificUnit.toString();
//        for(ScientificUnit env : ScientificUnit.values())
//        {
//            System.out.println( ScientificUnit.get(env.getScientificUnit()));
//        }
//        System.out.println(this.unit);
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

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
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

    public enum ScientificUnit {
        /**
         * not applicable
         */
        NA("[NA]"),
        Days("Days"),
        /**
         * dimensionless
         */
        NODIM("[-]"),
        /**
         * dimensionless, volume.volume-1, for bulk density a.o., must have 0-1 range
         */
        NODIM_VOLUME("[volume.volume-1]"),
        /**
         * dimensionless, mass.mass-1, for conversion factors etc., must have 0-1 range
         */
        NODIM_MASS("[mass.mass-1]"),
        /**
         * dimensionless, area.area-1, for leaf area index etc., must NOT have 0-inf range
         */
        NODIM_AREA("[area.area-1]"),
        /**
         * dimensionless, radiation energy.radiation energy-1, for atmospheric transmission etc., must have 0-inf range
         */
        NODIM_RADIATION("[radiation energy.radiation energy-1]"),
        /**
         * percentage (no range restriction !)
         */
        PRC("%s"),
        /**
         * hectopascal
         */
        HPA("[hpa]"),
        /**
         * millibar
         */
        MBAR("[mbar]"),
        /**
         * ppm
         */
        PPM("[ppm]"),
        /**
         * yearly change in ppm
         */
        PPM_Y("[ppm.y-1]"),
        /**
         * number per square meter
         */
        CNT_M2("[no.m-2]"),
        /**
         * number per hectare
         */
        CNT_HA("[no.ha-1]"),
        /**
         * kilogram per square meter
         */
        KG_M2("[kg.m-2]"),
        /**
         * kilogram per hectare
         */
        KG_HA("[kg.ha-1]"),
        /**
         * kilogram per kilogram per day
         */
        KG_KG1D1("[kg.kg-1.d-1]"),
        /**
         * kilogram per hectare per hour
         */
        KG_HA1HR1("[kg.ha-1.hr-1]"),
        /**
         * hectare per hectare per day
         */
        HA_HA1D1("[ha.ha-1.d-1]"),
        /**
         * hectare per kilogram
         */
        HA_KG("[ha.kg-1]"),
        /**
         * degrees Celsius
         */
        CELSIUS("[C]"),
        /**
         * Celsius degree days
         */
        CELSIUS_DAYS("[C.d]"),
        /**
         * degrees Fahrenheit
         */
        FAHRENHEIT("[F]"),
        /**
         * Kelvin
         */
        KELVIN("[K]"),
        /**
         * megajoules per square meter per day
         */
        MJ_M2D1("[mj.m-2.d-1]"),
        /**
         * kilojoules per square meter per day
         */
        KJ_M2D1("[kj.m-2.d-1]"),
        /**
         * joules per square meter per day
         */
        J_M2D1("[j.m-2.d-1]"),
        /**
         * millimeter
         */
        MM("[mm]"),
        /**
         * millimeter per day
         */
        MM_D1("[mm.d-1]"),
        /**
         * centimeter
         */
        CM("[cm]"),
        /**
         * centimeter per day
         */
        CM_D1("[cm.d-1]"),
        /**
         * meter
         */
        M("[m]"),
        /**
         * meter per second
         */
        M_S("[m.s-1]"),
        /**
         * meter per day
         */
        M_D1("[m.d-1]"),
        /**
         * angular decimal degrees for latitude, longitude etc.
         */
        ANGULARDD("[deg]"),
        /**
         * decimal hours
         */
        HOUR("[hr]"),
        /**
         * normal calendar date
         */
        DATE("[date]"),
        /**
         * relative number of days
         */
        DATEREL("[Date relative]"),
        /**
         * day
         */
        DAYS("[d]"),
        /**
         * 1 / day-1
         */
        PER_DAY("[d-1]"),
        /**
         * day number in the year since Jan 1st (1/jan = doy 1)
         */
        DAYOFYEAR("[doy]"),
        /**
         * year
         */
        YEAR("[year]"),
        /**
         * light use efficiency
         */
        KG_HA1HR1J1_M2S1("[kg.ha-1.hr-1.J-1.m2.s1]");

        private String scientificUnit;

        ScientificUnit(String scientificUnit) {
            this.scientificUnit = scientificUnit;
        }

        public String getScientificUnit() {
            return scientificUnit;
        }

        //Lookup table
        private static final Map<String, ScientificUnit> lookup = new HashMap<>();

        //Populate the lookup table on loading time
        static
        {
            for(ScientificUnit env : ScientificUnit.values())
            {
                lookup.put(env.getScientificUnit(), env);
            }
        }

        //This method can be used for reverse lookup purpose
        public static ScientificUnit get(String scientificUnit)
        {
            return lookup.get(scientificUnit);
        }

    }
}
