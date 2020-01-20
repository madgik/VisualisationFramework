import React from 'react';

import RC2 from 'react-chartjs-2';

import { Chart } from 'react-chartjs-2';

import $ from 'jquery';
import { Point } from '../../utils/Point';

let currentColorIndex = 0;

let  colors = [
  {'rgb': 'rgba(243, 0, 17, 0.8)',
   'name': 'red',
   'id': 0},
  {'rgb': 'rgba(0, 255, 0, 0.8)',
   'name': 'green',
   'id': 1},
  {'rgb': 'rgba(0, 0, 255, 0.8)',
   'name': 'blue',
   'id': 2}
];

class ChartRenderer extends React.Component {

 
  componentDidMount() {
    Chart.pluginService.register({
      beforeDraw: function (chartInstance) {
        var ctx = chartInstance.chart.ctx;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
      }
    });

  }

 

  typeMap = {
    'Line': 'line',
    'Spline': 'line',
    'Step': 'line',
    'Area': 'area',
    'AreaSpline': 'area-spline',
    'AreaStep': 'area-step',
    'Bar': 'bar',
    'Scatter': 'scatter',
    'Pie': 'pie',
    'Doughnut': 'doughnut',
    'Polar': 'polarArea'
  }

  


  chartType(modelType) {
    return this.typeMap[modelType];
  }

  steppedLine(modelType) {
    return modelType === 'Step';
  }

  noInterpolation(modelType) {
    return modelType === 'Line';
  }

  isBarChart(modelType) {
    return modelType === 'Bar';
  }

  isTupleChart(modelType) {
    return modelType === 'Pie' ||
      modelType === 'Doughnut' ||
      modelType === 'Polar';
  }

  isPolarChart(modelType) {
    return modelType === 'Polar';
  }

  dynamicColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return {
      n: "rgb(" + r + "," + g + "," + b + ")",
      a: "rgba(" + r + "," + g + "," + b + ", 0.2)"
    };
  }

  extractDataSets(data) {
    var datasets = [];
    if (!data) return datasets;

    var steppedLine = this.steppedLine(this.props.visualization.type);
    var noInterpolation = this.noInterpolation(this.props.visualization.type);
    var isXAxisTimeSeriesDate = this.isXAxisTimeSeriesDate(data);

    var hasColors = this.props.visualization.hasColors;

    for (var i = 0; i < data.length; i++) {
      var series = data[i];

      var name = series.name;
      if (name === null || name.length === 0) continue;

      var color = (hasColors && series.color && series.color.length > 0) ?
        { a: series.color, n: series.color } :
        this.dynamicColors();

      var dataset = {
        label: name,
        fill: false,
        backgroundColor: color.a,
        borderColor: color.n,
        steppedLine: steppedLine
      };

      if (noInterpolation) {
        dataset['lineTension'] = 0;
      }

      var jsonData = [];
      for (var j = 0; j < series.xaxisData.length; j++) {
        jsonData.push({
          x: isXAxisTimeSeriesDate ? new Date(series.xaxisData[j]) : series.xaxisData[j],
          y: series.yaxisData[j],
          doc: series.documents[j]
        });
      }
      dataset.data = jsonData;
      var initialBackgroundColors = new Array();
      var pointRadius	 = new Array();
      for( var ii=0; ii< jsonData.length; ii++){
        initialBackgroundColors.push("rgba(0,0,0,0.1)");
        pointRadius.push(3);
      }
      dataset.pointBackgroundColor = initialBackgroundColors;
      dataset.pointRadius = pointRadius;
      datasets.push(dataset);
      console.log(datasets);

    }
    return datasets;
  }

  getLineChartData() {
    var data = {
      datasets: this.extractDataSets(this.props.visualization.timeSeries)
    }

    var isXAxisTimeSeriesDate = this.isXAxisTimeSeriesDate(this.props.visualization.timeSeries);
    var hasDocuments = this.props.visualization.hasDocuments;

    var options = {
   
      scales: {
        xAxes: [{
          type: 'linear',
          position: 'bottom',
          scaleLabel: {
            display: true,
            labelString: this.props.visualization.xAxisLabel
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.props.visualization.yAxisLabel
          }
        }]
      },
      hover: {
        onHover: function (event) {
          if (hasDocuments) {
            var point = this.getElementAtEvent(event);
            $("canvas").css("cursor", point.length > 0 ? "pointer" : "default");
          }
        }
      }
    }

    if (isXAxisTimeSeriesDate) {
      options.scales.xAxes[0].type = 'time';
      options.scales.xAxes[0].time = {
        unit: 'month',
        displayFormats: {
          unit: 'YYYY-MM'
        }
      }
    }

    return {
      d: data,
      o: options
    }
  }

  isXAxisTimeSeriesDate(data) {
    if (!data) return false;
    for (var i = 0; i < data.length; i++) {
      var series = data[i];
      var name = series.name;
      if (name === null || name.length === 0) continue;
      return series.xAxisDataType === 'Date';
    }
  }

  getBarChartData() {

    var labels = (this.props.visualization.barChartData && this.props.visualization.barChartData.xAxisGroups) ?
      this.props.visualization.barChartData.xAxisGroups : [];

    var datasets = (this.props.visualization.barChartData && this.props.visualization.barChartData.dataSets) ?
      this.props.visualization.barChartData.dataSets : [];

    var hasDocuments = this.props.visualization.hasDocuments;

    var hasColors = this.props.visualization.hasColors;

    var data = {
      labels: labels,
      datasets: datasets.map((item, index) => {

        var color = (hasColors && item.color && item.color.length > 0) ?
          { a: item.color, n: item.color } :
          this.dynamicColors();

        return {
          label: item.name,
          backgroundColor: color.a,
          borderColor: color.n,
          borderWidth: 1,
          data: item.data
        }
      })
    }

    var options = {
      responsive: true,
      maintainAspectRatio: false,	// Don't maintain w/h ratio
      legend: {
        position: 'top',
      },
      hover: {
        onHover: function (event, elements) {
          if (hasDocuments) {
            $("canvas").css("cursor", elements[0] ? "pointer" : "default");
          }
        }
      }
    }

    return {
      d: data,
      o: options
    };
  }

  getTupleChartData() {
    var tuples = this.props.visualization.tuples;

    var labels = [],
      values = [],
      colors = [];

    var showAlpha = this.isPolarChart(this.props.visualization.type);

    var hasColors = this.props.visualization.hasColors;

    for (var i = 0; i < tuples.length; i++) {
      var tuple = tuples[i];
      var color = (hasColors && tuple.color && tuple.color.length > 0) ?
        { a: tuple.color, n: tuple.color } :
        this.dynamicColors();

      labels.push(tuple.label);
      values.push(tuple.value);
      colors.push(showAlpha ? color.a : color.n);
    }

    var hasDocuments = this.props.visualization.hasDocuments;

    var data = {
      datasets: [{
        data: values,
        backgroundColor: colors
      }],
      labels: labels
    }

    var options = {
      responsive: true,
      legend: {
        position: 'top',
      },
      hover: {
        onHover: function (event, elements) {
          if (hasDocuments) {
            $("canvas").css("cursor", elements[0] ? "pointer" : "default");
          }
        }
      }
    }

    return {
      d: data,
      o: options
    }
  }

  cachedData = null
  selectedPoints =  new Array();

  onElementClick(e) {
    if (this.props.visualization.hasDocuments) {
      if (e.length > 0) {
        var _datasetIndex = e[0]._datasetIndex;
        var _index = e[0]._index;
        var _chart = e[0]._chart

        if (this.isBarChart(this.props.visualization.type)) {
          //TODO...
        } else {
          console.log(this.props.document.modalSrc);
          console.log(this.cachedData.datasets[_datasetIndex].data[_index].doc + "-" + _datasetIndex);

          var position = this.props.document.modalSrc.findIndex(image => image.imageName + "-" + image.lineChartId + "-" + image.pointId === this.cachedData.datasets[_datasetIndex].data[_index].doc + "-" + _datasetIndex + "-" + _index);
          console.log(_datasetIndex +"  , " + _index);
          console.log(position);
          console.log(this.selectedPoints);
          
          if (this.cachedData.datasets[_datasetIndex].data[_index].doc && position === -1) {
            if(currentColorIndex > 2)
              currentColorIndex = 0;
              console.log("currentColorIndex:: " +currentColorIndex);  
  
            console.log("Color:: " + colors[currentColorIndex].rgb);  
            console.log("selected points in else: " + this.selectedPoints);

            let point = new Point();
            point.chart_index = _datasetIndex;
            point.data_index = _index;
            this.shouldPointTableUpdate(point);
            this.cachedData.datasets[_datasetIndex].pointBackgroundColor[_index] = colors[currentColorIndex].rgb; //'rgba(243, 0, 17, 0.8)';
            this.cachedData.datasets[_datasetIndex].pointRadius[_index] = 6;
            _chart.update();
            console.log(colors[currentColorIndex]);
            this.props.onChartElementClick(this.cachedData.datasets[_datasetIndex].data[_index].doc, this.props.document.modalSrc, this.props.visualization.activeDocuments, _datasetIndex, _index, colors[currentColorIndex]);
            currentColorIndex++;
          }
          else {
            var image = this.props.document.modalSrc[position];
            var clone = this.props.document.modalSrc.slice(0);
            clone.splice(position, 1);
            clone.push(image);
            console.log("image: " + image)
            console.log("position: " + image.colorId)

            var color, colorIndex; // = colors[image.colorId];

            for(let count = 0; count< colors.length; count++){
              if(colors[count].id === image.colorId){
                  color = colors[count];
                  colorIndex = count;
              }
            }
            var cloneOfColours = colors.slice(0);
            cloneOfColours.splice(colorIndex, 1);
            cloneOfColours.push(color);

            console.log(color)

            colors = cloneOfColours;

            console.log(colors)
            currentColorIndex = 0;

            var firstPointElement = this.selectedPoints[position];
            console.log(firstPointElement);
            this.selectedPoints.splice(position,1);
            this.selectedPoints.push(firstPointElement);

            this.props.onUpdateDocuments(clone);
          }
          }
        } else {

          for(var k=0 ;k< this.cachedData.datasets.length ; k++ )
          {
            var initialBackgroundColors = new Array();
            var pointRadius	 = new Array();
            for( var ii=0; ii< this.cachedData.datasets[k].data.length; ii++){
              initialBackgroundColors.push("rgba(0,0,0,0.1)");
              pointRadius.push(3);
            }
            this.cachedData.datasets[k].pointBackgroundColor = initialBackgroundColors;
            this.cachedData.datasets[k].pointRadius = pointRadius;
            this.selectedPoints =  new Array();
            this.chartReference.chartInstance.update();
            this.props.onChartCanvasClick();
          }
        }
      }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.visualization !== this.props.visualization;
}

  shouldPointTableUpdate(point){

    if(this.selectedPoints.length >= this.props.visualization.activeDocuments){
      let p = this.selectedPoints[0];
      this.cachedData.datasets[p.chart_index].pointBackgroundColor[p.data_index] = "rgba(0,0,0,0.1)";
      this.cachedData.datasets[p.chart_index].pointRadius[p.data_index] = 3;
      this.selectedPoints.splice(0,1);
    }
    this.selectedPoints.push(point);
    console.log("selected points in shouldPointTableUpdate: " + this.selectedPoints);

  }

  render() {
    currentColorIndex = 0;

    var definition = this.isBarChart(this.props.visualization.type) ? this.getBarChartData() :
      this.isTupleChart(this.props.visualization.type) ? this.getTupleChartData() :
        this.getLineChartData();

    this.cachedData = definition.d;

    var style = {
      width: this.props.size.width + 'px',
      height: this.props.size.height + 'px'
    }
    return (
      <div className="chart-renderer">

        <RC2
          ref={(reference) => this.chartReference = reference }
          width={style.width}
          height={style.height}
          redraw={true}
          data={definition.d}
          type={this.chartType(this.props.visualization.type)}
          options={definition.o}
          getElementAtEvent={e => this.onElementClick(e)}
        />
      </div>

    )
  }
}




ChartRenderer.defaultProps = {
  visualization: {
    timeSeries: []
  }
};

export default ChartRenderer;
