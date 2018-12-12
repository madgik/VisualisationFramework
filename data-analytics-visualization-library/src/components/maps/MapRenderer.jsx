import React from 'react';
import { Map as LeafletMap, TileLayer, GeoJSON } from 'react-leaflet'



class MapRenderer extends React.Component {

  constructor(props) {
    super(props)
    console.log(props);
    this.state = {
      lat: 48,
      lng: 8,
      zoom: 4
    }
    this.previousFeature = null;
    this.previousLayer = null;
    this.hasClickedOnLayer = false;
  }

  onMapClick(e) {
    if (!this.hasClickedOnLayer) {
      this.unHighlightFeature(this.previousFeature, this.previousLayer);
      this.previousFeature = null;
      this.previousLayer = null;
      this.props.onMapElementClick('');
    }
    else {
      this.hasClickedOnLayer = false;
    }
  }

  onEachFeature(feature, layer) {
    const func = (e) => {
      this.unHighlightFeature(this.previousFeature, this.previousLayer);
      this.highlightFeature(feature, layer);
      this.props.onMapElementClick(feature);
      this.previousFeature = feature;
      this.previousLayer = layer;
    };

    layer.on({
      click: func
    });
  }

  highlightFeature(feature, layer) {
    this.hasClickedOnLayer = true;

    if (feature.geometry.type === 'LineString') {
      layer.setStyle({
        color: '#ffaa33',
      });
    } else {
      layer.setStyle({
        fillColor: '#ffaa33',
        fillOpacity: 1
      });
    }
  }

  unHighlightFeature(feature, layer) {
    if (feature !== null) {
      if (feature.geometry.type === 'LineString') {
        layer.setStyle({
          color: '#3388ff',
          fillOpacity: 0.2
        });
      } else {
        layer.setStyle({
          fillColor: '#3388ff',
          fillOpacity: 0.2
        });
      }
    }

  }
  render() {
    var features = JSON.parse(this.props.visualization.json);

    var style = {
      width: '100%',
      height: this.props.size.height + 'px',
      touchExtend: false
    }

    const position = [this.state.lat, this.state.lng];
    return (
      <LeafletMap  center={position} zoom={this.state.zoom} style={style} onclick={this.onMapClick.bind(this)}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
        <GeoJSON data={features}
          onEachFeature={this.onEachFeature.bind(this)}

        />
      </LeafletMap>
    )
  }
}

export default MapRenderer;
