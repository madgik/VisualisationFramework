import React from 'react';
import { Map as LeafletMap, TileLayer, GeoJSON } from 'react-leaflet'
import idGenerator from 'react-id-generator';



class MapRenderer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      zoom: 4,
      position: [48, 8]
    }
    this.previousFeature = null;
    this.previousLayer = null;
    this.hasClickedOnLayer = false;
    console.log(this.props.visualization);
    console.log(props.visualization);

    if(this.props.visualization.latitude !== null && this.props.visualization.latitude !== undefined){
      // this.setState({position : [this.props.visualization.latitude, this.props.visualization.longitude]});
      // this.setState({zoom : this.props.visualization.zoom});
      this.state = {
        zoom: this.props.visualization.zoom,
        position: [this.props.visualization.latitude, this.props.visualization.longitude]
      }
      console.log("Zoom: " + this.props.visualization.zoom + " , position: " + this.props.visualization.latitude +", " + this.props.visualization.longitude);
    }
  }

  componentDidUpdate(prevProps,prevState) {
   
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


    if(feature.properties.color !== undefined){
      layer.setStyle({
        fillColor: '#ffaa33',
        fillOpacity: 1
      });
      this.previousFeature = feature;
      this.previousLayer = layer;
     
       if (this.state.zoom !== 15) {
         this.setState({ zoom: 15 });
         let coordinates = feature.geometry.coordinates[0];
         let point = coordinates[0];
         this.setState({ position: [ point[1], point[0]] });
       }
    }


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

  onZoomEvent= (map) => {
    if(this.map !== null)
      this.props.updateCurrentGeometry(this.createPolygonFromBounds(this.map.leafletElement.getBounds()), this.map.leafletElement.getZoom());
  };

  handleMoveend= (map) => {
    if(this.map !== null)
      this.props.updateCurrentGeometry(this.createPolygonFromBounds(this.map.leafletElement.getBounds()), this.map.leafletElement.getZoom());
  };

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
      touchExtend: false,
      zIndex: 0

    }

    console.log("position: " + this.state.position + "   zoom: ," + this.state.zoom)
  

    return (
      <LeafletMap   ref={(ref) => { this.map = ref; }} onZoomend={this.onZoomEvent.bind(this)} onMoveend={this.handleMoveend.bind(this)} center={this.state.position} zoom={this.state.zoom} style={style} onclick={this.onMapClick.bind(this)}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
        <GeoJSON key={idGenerator()} data={features}
          onEachFeature={this.onEachFeature.bind(this)}

        />
      </LeafletMap>
    )
  }


   createPolygonFromBounds(latLngBounds) {
    var center = latLngBounds.getCenter()
      latlngs = [];
  
    latlngs.push(latLngBounds.getSouthWest());//bottom left
    latlngs.push({ lat: latLngBounds.getSouth(), lng: center.lng });//bottom center
    latlngs.push(latLngBounds.getSouthEast());//bottom right
    latlngs.push({ lat: center.lat, lng: latLngBounds.getEast() });// center right
    latlngs.push(latLngBounds.getNorthEast());//top right
    latlngs.push({ lat: latLngBounds.getNorth(), lng: this.map.leafletElement.getCenter().lng });//top center
    latlngs.push(latLngBounds.getNorthWest());//top left
    latlngs.push({ lat: this.map.leafletElement.getCenter().lat, lng: latLngBounds.getWest() });//center left
    let polygon = new L.polygon(latlngs);
    return polygon.toGeoJSON();
  }

}

export default MapRenderer;
