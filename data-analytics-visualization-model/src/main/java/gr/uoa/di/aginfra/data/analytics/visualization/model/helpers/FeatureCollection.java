package gr.uoa.di.aginfra.data.analytics.visualization.model.helpers;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

public class FeatureCollection extends GeoJsonObject implements Iterable<Feature> {
//    @JsonCreator
//    public CustomFeatureCollection(@JsonProperty("metadata") List<Metadata> metadata) {
//        this.metadata = metadata;
//    }

    private List<Metadata> metadata = new ArrayList<Metadata>();

    public List<Metadata> getMetadata() { return metadata; }

    public void setMetadata(List<Metadata> metadata) { this.metadata = metadata; }

    private List<Feature> features = new ArrayList<Feature>();

    public List<Feature> getFeatures() {
        return features;
    }

    public void setFeatures(List<Feature> features) {
        this.features = features;
    }

    public FeatureCollection add(Feature feature) {
        features.add(feature);
        return this;
    }

    public void addAll(Collection<Feature> features) {
        this.features.addAll(features);
    }

    @Override
    public Iterator<Feature> iterator() {
        return features.iterator();
    }

    @Override
    public <T> T accept(GeoJsonObjectVisitor<T> geoJsonObjectVisitor) {
        return geoJsonObjectVisitor.visit(this);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof FeatureCollection))
            return false;
        FeatureCollection features1 = (FeatureCollection)o;
        return features.equals(features1.features);
    }

    @Override
    public int hashCode() {
        return features.hashCode();
    }

    @Override
    public String toString() {
        return "FeatureCollection{" + "features=" + features + '}';
    }
}