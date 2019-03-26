import React from 'react'

import { Message, Image } from 'semantic-ui-react'

import csvImage from '../imgs/csv.png'
import pieImage from '../imgs/pie.png'
import treeImage from '../imgs/tree.png'
import graphImage from '../imgs/graph.png'
import freeMindImage from '../imgs/freemind.png'
import geoJsonImage from '../imgs/geojson.png'

class UploadDataMessage extends React.Component {

  typeToMessage = {
    Spline: 'Please upload a valid csv file',
    Scatter: 'Please upload a valid csv file',
    Bar: 'Please upload a valid csv file',
    Line: 'Please upload a valid csv file',
    Step: 'Please upload a valid csv file',
    Pie: 'Please upload a valid csv file',
    Doughnut: 'Please upload a valid csv file',
    Polar: 'Please upload a valid csv file',
    ThreeD: 'Please upload a valid csv file',
    Graph: 'Please upload a valid json file of the following form',
    MindMap: 'Please upload a valid free mind file',
    Tree: 'Please upload a valid json file of the following form',
    Map: 'Please upload a valid geogson file with coordinates in WGS 84',
    WorldWindMap: 'Please upload a valid geogson file with coordinates in WGS 84',
    Table: 'Please upload a valid csv file',
    HeatMap: 'Please upload a valid csv file'

  }

  typeToImage = {
    Spline: csvImage,
    Scatter: csvImage,
    Bar: csvImage,
    Line: csvImage,
    Step: csvImage,
    Pie: pieImage,
    Doughnut: pieImage,
    Polar: pieImage,
    ThreeD: csvImage,
    Graph: graphImage,
    MindMap: freeMindImage,
    Tree: treeImage,
    Map: geoJsonImage,
    WorldWindMap: geoJsonImage,
    Table: csvImage,
    HeatMap: csvImage
  }

  render() {
    return <Message warning visible>
      <Message.Header>{this.typeToMessage[this.props.type]}</Message.Header>
      <p>
        <Image src={this.typeToImage[this.props.type]} alt='tree.json' />
      </p>
    </Message>;
  }
}

export default UploadDataMessage;