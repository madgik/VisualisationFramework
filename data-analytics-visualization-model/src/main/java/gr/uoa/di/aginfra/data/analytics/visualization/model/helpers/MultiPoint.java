package gr.uoa.di.aginfra.data.analytics.visualization.model.helpers;

public class MultiPoint extends Geometry<LngLatAlt> {
    public MultiPoint() {
    }

    public MultiPoint(LngLatAlt... points) {
        super(points);
    }

    @Override
    public <T> T accept(GeoJsonObjectVisitor<T> geoJsonObjectVisitor) {
        return geoJsonObjectVisitor.visit(this);
    }

    @Override
    public String toString() {
        return "MultiPoint{} " + super.toString();
    }
}