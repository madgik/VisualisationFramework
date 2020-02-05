package gr.uoa.di.aginfra.data.analytics.visualization.model.helpers;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Objects;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SoilUnit {
    private int id;
    @JsonProperty("soil_code")
    private String soilCode;
    @JsonProperty("soilname")
    private String soilName;
    @JsonProperty("soiltype")
    private String soilType;

    public int getId() { return id; }

    public void setId(int id) { this.id = id; }

    public String getSoilCode() { return soilCode; }

    public void setSoilCode(String soilCode) { this.soilCode = soilCode; }

    public String getSoilName() { return soilName; }

    public void setSoilName(String soilName) { this.soilName = soilName; }

    public String getSoilType() { return soilType; }

    public void setSoilType(String soilType) { this.soilType = soilType; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SoilUnit soilUnit = (SoilUnit) o;
        return getId() == soilUnit.getId() &&
                Objects.equals(getSoilCode(), soilUnit.getSoilCode()) &&
                Objects.equals(getSoilName(), soilUnit.getSoilName()) &&
                Objects.equals(getSoilType(), soilUnit.getSoilType());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getSoilCode(), getSoilName(), getSoilType());
    }

    @Override
    public String toString() {
        return "SoilUnit{" +
                "id=" + id +
                ", soilCode='" + soilCode + '\'' +
                ", soilName='" + soilName + '\'' +
                ", soilType='" + soilType + '\'' +
                '}';
    }
}
