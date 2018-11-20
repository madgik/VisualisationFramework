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

  onMapClick(e){
    if(!this.hasClickedOnLayer){
      console.log(e);
      this.unHighlightFeature(this.previousFeature, this.previousLayer);

    }
    else{
      this.hasClickedOnLayer = false;

    }


  }

  onEachFeature(feature, layer) {
    const func = (e)=>{
      console.log(feature);

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

  highlightFeature(feature, layer){
    this.hasClickedOnLayer = true;

    if (feature.geometry.type === 'LineString') {
      layer.setStyle({
        color: '#ffff00',
      });
    } else {
      layer.setStyle({
        fillColor: '#ffff00',
        fillOpacity: 1
      });
    }
  }

  unHighlightFeature(feature, layer){
    if(feature !== null){
      if (feature.geometry.type === 'LineString') {
        layer.setStyle({
          color: '#3388ff',
        });
      } else {
        layer.setStyle({
          fillColor: '#3388ff',
          fillOpacity: 1
        });
      }
    }
    
  }
  render() {
    var features = JSON.parse(this.props.visualization.json);
    var style = {
      width: this.props.size.width + 'px',
      height: this.props.size.height + 'px'
    }

    const position = [this.state.lat, this.state.lng];
    return (
      <LeafletMap center={position} zoom={this.state.zoom} style={style} onclick={this.onMapClick.bind(this)}>
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
