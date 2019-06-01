import React from 'react';

import './graph.css';

import Force from '../../utilities/Force';

import { Graph, reactD3GraphUtils } from 'react-d3-graph';
import { Sidebar } from 'semantic-ui-react';
import SidebarProperties from '../menu/SidebarProperties';
import NodePropeties from "./NodeProperties";
import LinkProperties from "./LinkProperties";
import Modal from 'react-modal';
import RecordControls from '../controls/RecordControls';

// import reactD3GraphUtils from "../src/utils";

const customStyles = {
  content: {
    top: '50%',
    left: 'auto',
    right: '5%',
    bottom: 'auto',
    marginRight: '-5%',
    transform: 'translate(-50%, -50%)',
    opacity: '1'
  }
};

Modal.setAppElement('#root')

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
    this.onClickGraph = this.onClickGraph.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.graphRef = React.createRef();
    this.canvasRef = React.createRef();
  }

  getGraph = () => {
    return this.graphRef;
  }

  getCanvas = () => {
    return this.canvasRef;
  }


  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.props.setPropModalIsOpen(false)
  }
  // componentDidUpdate() {
  //   console.log("UPDATED")
  // }

  myConfig = {
    height: window.innerHeight * 0.73,
    width: window.innerWidth,
    nodeHighlightBehavior: true,
    node: {
      color: 'green',
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
    this.closeModal();
    this.props.setSelectedNode(nodeId);
    this.props.setSelectedWeight('');
    console.log("---" + nodeId);
    this.props.setPropModalIsOpen(!this.props.propModalIsOpen)
    // var xPosition = parseFloat(d3.select(this).attr("x")) + this.xScale.bandwidth() / 2;
    // var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + this.height / 2;
    // console.log(xPosition + "---" + yPosition);
  };

  onClickLink(source, target) {
    this.closeModal();

    var links = this.props.graph.links
    for (var i = 0; i < links.length; i++) {
      // look for the entry with a matching `code` value
      if (links[i].source == source && links[i].target == target) {
        this.props.setSelectedWeight(links[i].weight);
        // let selectedLink ={};
        // selectedLink.source = source;
        // selectedLink.target = target;
        // selectedLink.weight = links[i].weight;
        // console.log(selectedLink)
        this.props.setSelectedLink({ "source": source, "target": target, "weight": links[i].weight });
        this.props.setSelectedNode('');
        this.props.setPropModalIsOpen(!this.props.propModalIsOpen);
      }
    }
  };

  onClickGraph() {
    this.closeModal();
  };


  render() {
    return (
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
          <div>
            <div ref={this.graphRef} >
              <Graph

                id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                data={(this.props.graph.nodes === undefined || this.props.graph.nodes.length == 0) ? null : this.props.graph}
                config={this.myConfig}
                onClickNode={this.onClickNode}
                checkForGraphElementsChanges={this.checkForGraphElementsChanges}
                refreshGraph={this.refreshGraph}
                // onRightClickNode={onRightClickNode}
                onClickGraph={this.onClickGraph}
                onClickLink={this.onClickLink}
              // onRightClickLink={onRightClickLink}
              // onMouseOverNode={onMouseOverNode}
              // onMouseOutNode={onMouseOutNode}
              // onMouseOverLink={onMouseOverLink}
              // onMouseOutLink={onMouseOutLink}
              />
            </div>
            <canvas id="background-canvas" ref={this.canvasRef} className="canvas">

            </canvas>

          </div>
        }
        <Modal
          isOpen={this.props.propModalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          overlayClassName="overlay"

        >
          <NodePropeties
            graph={this.props.graph}
            topNodes={this.props.topNodes}
            selectedGraph={this.props.selectedGraph}
            selectedNode={this.props.selectedNode}
            getNeighbors={this.props.getNeighbors}
            graphData={this.props.graphData}
          />

          <LinkProperties
            selectedWeight={this.props.selectedWeight}
            selectedLink={this.props.selectedLink}
          />
        </Modal>

        <RecordControls
          record={this.props.record}
          setRecord={this.props.setRecord}
          graphRef={this.getGraph}
          canvasRef={this.getCanvas}
          graph={this.props.graph}
          availRecord={this.props.availRecord}
          setAvailRecord={this.props.setAvailRecord}
        />

      </div>

    );
  }
}

export default GraphView;

// export default React.forwardRef((props, ref) =>
//   <GraphView {...props} graphRef={ref} />
// );