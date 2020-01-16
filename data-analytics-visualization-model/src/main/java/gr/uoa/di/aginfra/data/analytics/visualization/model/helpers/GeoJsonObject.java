package gr.uoa.di.aginfra.data.analytics.visualization.model.helpers;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import java.io.Serializable;
import java.util.Arrays;

@JsonTypeInfo(property = "type", use = JsonTypeInfo.Id.NAME)
@JsonSubTypes({ @JsonSubTypes.Type(Feature.class), @JsonSubTypes.Type(Polygon.class), @JsonSubTypes.Type(MultiPolygon.class), @JsonSubTypes.Type(FeatureCollection.class),
        @JsonSubTypes.Type(Point.class), @JsonSubTypes.Type(MultiPoint.class), @JsonSubTypes.Type(MultiLineString.class), @JsonSubTypes.Type(LineString.class),
        @JsonSubTypes.Type(GeometryCollection.class) })
@JsonInclude(JsonInclude.Include.NON_NULL)
public abstract class GeoJsonObject implements Serializable {

    private Crs crs;
    private double[] bbox;

    public Crs getCrs() {
        return crs;
    }

    public void setCrs(Crs crs) {
        this.crs = crs;
    }

    public double[] getBbox() {
        return bbox;
    }

    public void setBbox(double[] bbox) {
        this.bbox = bbox;
    }

    public abstract <T> T accept(GeoJsonObjectVisitor<T> geoJsonObjectVisitor);

    @Override public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        GeoJsonObject that = (GeoJsonObject)o;
        if (crs != null ? !crs.equals(that.crs) : that.crs != null)
            return false;
        return Arrays.equals(bbox, that.bbox);
    }

    @Override public int hashCode() {
        int result = crs != null ? crs.hashCode() : 0;
        result = 31 * result + (bbox != null ? Arrays.hashCode(bbox) : 0);
        return result;
    }

    @Override
    public String toString() {
        return "GeoJsonObject{}";
    }
}
