import React from 'react';

import './graph.css';

import Force from '../../utilities/Force';

import Node from './Node';
import { Graph } from 'react-d3-graph';

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

  myConfig = {
    height: 800,
    nodeHighlightBehavior: true,
    d3: {
      gravity:-100
    },
    node: {
      color: 'lightgreen',
      size: 520,
      highlightStrokeColor: 'blue'
    },
    link: {
      // highlightColor: 'lightblue'  
    }
  }
  
  data = {
    nodes: this.props.graph.nodes,
    links: this.props.graph.links
  }

  onClickNode(nodeId) {
    this.props.setSelectedNode(nodeId);
    this.props.setSelectedWeight('');

  };

  onClickLink(source, target) {
    var links = this.props.graph.links
    for (var i = 0; i < links.length; i++){
      // look for the entry with a matching `code` value
      if (links[i].source == source && links[i].target){
        this.props.setSelectedWeight(links[i].weight);
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
            {(this.props.graph.nodes === '') ?
              <div className='unavailable'>
                <h2>Select Graph and top Nodes</h2>
              </div>
              :
              <Graph
                id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                data={this.props.graphData}
                config={this.myConfig}
                onClickNode={this.onClickNode}
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
