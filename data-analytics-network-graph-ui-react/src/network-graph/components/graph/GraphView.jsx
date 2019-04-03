import React from 'react';

import './graph.css';

import Force from '../../utilities/Force';

import Node from './Node';
import { Graph, reactD3GraphUtils } from 'react-d3-graph';
import { Sidebar } from 'semantic-ui-react';
import SidebarProperties from '../menu/SidebarProperties';

// import reactD3GraphUtils from "../src/utils";


// graph event callbacks
// const onClickGraph = function () {
//   // window.alert(`Clicked the graph background`);
// };



// const onRightClickNode = function (event, nodeId) {
//   // window.alert(`Right clicked node ${nodeId}`);
// };

// const onMouseOverNode = function (nodeId) {
//   // window.alert(`Mouse over node ${nodeId}`);
// };

// const onMouseOutNode = function (nodeId) {
//   // window.alert(`Mouse out node ${nodeId}`);
// };

// const onClickLink = function (source, target) {
//   // window.alert(`Clicked link between ${source} and ${target}`);
// };

// const onRightClickLink = function (event, source, target) {
//   // window.alert(`Right clicked link between ${source} and ${target}`);
// };

// const onMouseOverLink = function (source, target) {
//   // window.alert(`Mouse over in link between ${source} and ${target}`);
// };

// const onMouseOutLink = function (source, target) {
//   // window.alert(`Mouse out link between ${source} and ${target}`);
// };

class GraphView extends React.Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    // this.submit = this.submit.bind(this);
    this.onClickNode = this.onClickNode.bind(this);
    this.onClickLink = this.onClickLink.bind(this);
  }

  // componentDidUpdate() {
  //   console.log("UPDATED")
  // }

  myConfig = {
    height: 800,
    nodeHighlightBehavior: true,
    node: {
      color: 'lightgreen',
      highlightStrokeColor: 'blue'
    },
    link: {
      highlightStrokeColor: 'blue'
      // highlightColor: 'lightblue'  
    },
    directed: true
  }

  // data = {
  //   nodes: this.props.graph.nodes,
  //   links: this.props.graph.links
  // }

  refreshGraph = data => {
    const { config, schemaPropsValues } = this._buildGraphConfig(data);

    this.state.schema.properties = reactD3GraphUtils.merge(this.state.schema.properties, schemaPropsValues);
  };

  checkForGraphElementsChanges(nextProps, current) {
    console.log("Im called")
  }
  onClickNode(nodeId) {
    this.props.setSelectedNode(nodeId);
    this.props.setSelectedWeight('');

  };

  onClickLink(source, target) {
    var links = this.props.graph.links
    for (var i = 0; i < links.length; i++) {
      // look for the entry with a matching `code` value
      if (links[i].source == source && links[i].target== target) {
        this.props.setSelectedWeight(links[i].weight);
        // let selectedLink ={};
        // selectedLink.source = source;
        // selectedLink.target = target;
        // selectedLink.weight = links[i].weight;
        // console.log(selectedLink)
        this.props.setSelectedLink({"source": source, "target": target, "weight": links[i].weight});
        this.props.setSelectedNode('');

      }
    }
    console.log()
  };

  render() {
    return (
      <div className="main-content">
        <div className='graph-container'>

          {/* <svg className="graph"
              width={Force.width}
              height={Force.height} >
              <g> {this.props.graph.links} </g>
              <g> {this.props.graph.nodes} </g> 
              </svg>*/}
          {(this.props.graph.nodes === undefined || this.props.graph.nodes.length == 0) ?
            <div className='unavailable'>
              <h2>Select Graph and top Nodes</h2>
            </div>
            :
            <Graph
              id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
              data={(this.props.graph.nodes === undefined || this.props.graph.nodes.length == 0)  ? null : this.props.graph}
              config={this.myConfig}
              onClickNode={this.onClickNode}
              checkForGraphElementsChanges={this.checkForGraphElementsChanges}
              refreshGraph={this.refreshGraph}
              // onRightClickNode={onRightClickNode}
              // onClickGraph={onClickGraph}
              onClickLink={this.onClickLink}
            // onRightClickLink={onRightClickLink}
            // onMouseOverNode={onMouseOverNode}
            // onMouseOutNode={onMouseOutNode}
            // onMouseOverLink={onMouseOverLink}
            // onMouseOutLink={onMouseOutLink}
            />}
          
        </div>
      </div>
   
    );
  }
}

export default GraphView;
   /* <SidebarProperties
      graph={this.props.graph}
      selectedGraph={this.props.selectedGraph}
      selectedNode={this.props.selectedNode}
      getNeighbors={this.props.getNeighbors}
      graphData={this.props.graphData}
      selectedWeight={this.props.selectedWeight}
      selectedLink={this.props.selectedLink}
      graph={this.props.graph}
      currentDate={this.props.currentDate}
      getDateGraph={this.props.getDateGraph}
      /> */