import React from 'react';

import $ from 'jquery';

import * as FileSaver from 'file-saver';

import { Button, Icon } from 'semantic-ui-react'

import * as d3 from 'd3';

class ChartPrinter extends React.Component {

  showPrinter() {
    return !(this.props.type === 'ThreeD' || this.props.type === 'Map' || this.props.type === 'WorldWindMap' || this.props.type === 'Table')
  }

  doPrint() {
    if (this.props.type === 'Graph' || this.props.type === 'Tree') {
      this.printSVG();
    } else if (this.props.type === 'ThreeD') {
      this.printPlotly();
    } else if (this.props.type === 'MindMap') {
      this.props.mmRender.current.screenShot();
    } else {
      this.printChartCanvas();
    }
  }

  printChartCanvas() {
    var canvas = $("canvas")[0];

    if (canvas.toBlob) {
      canvas.toBlob(
        function (blob) {
          FileSaver.saveAs(blob, "chart.png");
        },
        'image/png'
      );
    }
  }

  printSVG() {

    var svg = d3.select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height");

    var svgString = this.getSVGString(svg.node());
    this.svgString2Image(svgString, 2 * width, 2 * height, 'png', save); // passes Blob and filesize String to the callback

    function save(dataBlob, filesize) {
      FileSaver.saveAs(dataBlob, 'Graph.png'); // FileSaver.js function
    }
  }

  // Below are the functions that handle actual exporting:
  // getSVGString ( svgNode ) and svgString2Image( svgString, width, height, format, callback )
  getSVGString(svgNode) {
    svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
    var cssStyleText = getCSSStyles(svgNode);
    appendCSS(cssStyleText, svgNode);

    var serializer = new XMLSerializer();
    var svgString = serializer.serializeToString(svgNode);
    svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
    svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix

    return svgString;

    function getCSSStyles(parentElement) {
      var selectorTextArr = [];

      var c = 0, i = 0;

      // Add Parent element Id and Classes to the list
      selectorTextArr.push('#' + parentElement.id);
      for (c = 0; c < parentElement.classList.length; c++)
        if (!contains('.' + parentElement.classList[c], selectorTextArr))
          selectorTextArr.push('.' + parentElement.classList[c]);

      // Add Children element Ids and Classes to the list
      var nodes = parentElement.getElementsByTagName("*");
      for (i = 0; i < nodes.length; i++) {
        var id = nodes[i].id;
        if (!contains('#' + id, selectorTextArr))
          selectorTextArr.push('#' + id);

        var classes = nodes[i].classList;
        for (c = 0; c < classes.length; c++) {
          if (!contains('.' + classes[c], selectorTextArr))
            selectorTextArr.push('.' + classes[c]);
        }
      }

      // Extract CSS Rules
      var extractedCSSText = "";
      for (i = 0; i < document.styleSheets.length; i++) {
        var s = document.styleSheets[i];
        try {
          if (!s.cssRules) continue;
        } catch (e) {
          if (e.name !== 'SecurityError') throw e; // for Firefox
          continue;
        }

        var cssRules = s.cssRules;
        for (var r = 0; r < cssRules.length; r++) {
          if (contains(cssRules[r].selectorText, selectorTextArr))
            extractedCSSText += cssRules[r].cssText;
        }
      }

      return extractedCSSText;

      function contains(str, arr) {
        return arr.indexOf(str) === -1 ? false : true;
      }

    }

    function appendCSS(cssText, element) {
      var styleElement = document.createElement("style");
      styleElement.setAttribute("type", "text/css");
      styleElement.innerHTML = cssText;
      var refNode = element.hasChildNodes() ? element.children[0] : null;
      element.insertBefore(styleElement, refNode);
    }
  }

  svgString2Image(svgString, width, height, format, callback) {
    format = format ? format : 'png';

    var imgsrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString))); // Convert SVG string to data URL

    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    var image = new Image();
    image.onload = function () {
      context.clearRect(0, 0, width, height);
      context.fillStyle = "white";
      context.fillRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);

      canvas.toBlob(function (blob) {
        var filesize = Math.round(blob.length / 1024) + ' KB';
        if (callback) callback(blob, filesize);
      });

    };

    image.src = imgsrc;
  }

  printPlotly() {
    window.alert('3D chart printing is not yet supported')
    //console.log(window.multirenderer.graphDiv)
    //console.log(window.multirenderer.figure)
    // Plotly.toImage(window.multirenderer.graphDiv, {
    //   format: 'png',
    //   width: 1200,
    //   height: 600,
    //   filename: 'chart.png'
    // })
  }

  render() {
    return (
      this.showPrinter() ?
        <Button className="chart-printer" icon onClick={this.doPrint.bind(this)}>
          <Icon name='print' />
        </Button> : ''
    )
  }
}

export default ChartPrinter;
