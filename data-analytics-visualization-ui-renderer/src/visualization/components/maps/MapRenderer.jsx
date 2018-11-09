import React from 'react';
import { Map as LeafletMap, TileLayer, GeoJSON } from 'react-leaflet'

class MapRenderer extends React.Component {

  constructor() {
    super()
    this.state = {
      lat: 48,
      lng: 8,
      zoom: 4
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
      <LeafletMap center={position} zoom={this.state.zoom} style={style}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
        <GeoJSON data={features} />
      </LeafletMap>
    )
  }
}

export default MapRenderer;
