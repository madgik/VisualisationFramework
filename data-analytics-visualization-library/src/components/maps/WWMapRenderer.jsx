import React from 'react';

class WWMapRenderer extends React.Component {

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate() {
    this.refresh();
  }

  refresh() {
    // Create the WorldWindow.
    var wwd = new window.WorldWind.WorldWindow("canvasOne");

    // Create and add layers to the WorldWindow.
    var layers = [
      // Imagery layers.
      { layer: new window.WorldWind.BMNGLayer(), enabled: true },
      // Add atmosphere layer on top of base layer.
      { layer: new window.WorldWind.AtmosphereLayer(), enabled: true },
      // WorldWindow UI layers.
      { layer: new window.WorldWind.CompassLayer(), enabled: true },
      { layer: new window.WorldWind.CoordinatesDisplayLayer(wwd), enabled: true },
      { layer: new window.WorldWind.ViewControlsLayer(wwd), enabled: true }
    ];

    for (var l = 0; l < layers.length; l++) {
      layers[l].layer.enabled = layers[l].enabled;
      wwd.addLayer(layers[l].layer);
    }

    // Set up the common placemark attributes.
    var placemarkAttributes = new window.WorldWind.PlacemarkAttributes(null);
    placemarkAttributes.imageScale = 0.05;
    placemarkAttributes.imageColor = window.WorldWind.Color.WHITE;
    placemarkAttributes.labelAttributes.offset = new window.WorldWind.Offset(
      window.WorldWind.OFFSET_FRACTION, 0.5,
      window.WorldWind.OFFSET_FRACTION, 1.5);
    placemarkAttributes.imageSource = window.WorldWind.configuration.baseUrl + "images/white-dot.png";

    var shapeConfigurationCallback = function (geometry, properties) {
      var configuration = {};

      if (geometry.isPointType() || geometry.isMultiPointType()) {
        configuration.attributes = new window.WorldWind.PlacemarkAttributes(placemarkAttributes);

        if (properties && (properties.name || properties.Name || properties.NAME)) {
          configuration.name = properties.name || properties.Name || properties.NAME;
        }
        if (properties && properties.POP_MAX) {
          var population = properties.POP_MAX;
          configuration.attributes.imageScale = 0.01 * Math.log(population);
        }
      }
      else if (geometry.isLineStringType() || geometry.isMultiLineStringType()) {
        configuration.attributes = new window.WorldWind.ShapeAttributes(null);
        configuration.attributes.drawOutline = true;
        configuration.attributes.outlineColor = new window.WorldWind.Color(
          0.1 * configuration.attributes.interiorColor.red,
          0.3 * configuration.attributes.interiorColor.green,
          0.7 * configuration.attributes.interiorColor.blue,
          1.0);
        configuration.attributes.outlineWidth = 2.0;
      }
      else if (geometry.isPolygonType() || geometry.isMultiPolygonType()) {
        configuration.attributes = new window.WorldWind.ShapeAttributes(null);

        // Fill the polygon with a random pastel color.
        configuration.attributes.interiorColor = new window.WorldWind.Color(
          0.375 + 0.5 * Math.random(),
          0.375 + 0.5 * Math.random(),
          0.375 + 0.5 * Math.random(),
          0.5);
        // Paint the outline in a darker variant of the interior color.
        configuration.attributes.outlineColor = new window.WorldWind.Color(
          0.5 * configuration.attributes.interiorColor.red,
          0.5 * configuration.attributes.interiorColor.green,
          0.5 * configuration.attributes.interiorColor.blue,
          1.0);
      }

      return configuration;
    };

    var polygonLayer = new window.WorldWind.RenderableLayer("GeoJson");
    var polygonGeoJSON = new window.WorldWind.GeoJSONParser(this.props.visualization.json);
    polygonGeoJSON.load(null, shapeConfigurationCallback, polygonLayer);
    wwd.addLayer(polygonLayer);

    var goToAnimator = new window.WorldWind.GoToAnimator(wwd);
    goToAnimator.goTo(new window.WorldWind.Location(48, 8));
  }

  render() {
    return <canvas id="canvasOne" width={this.props.size.width} height={this.props.size.height}>
      Your browser does not support HTML5 Canvas.
    </canvas>;
  }
}

export default WWMapRenderer;
