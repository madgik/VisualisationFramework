import { connect } from 'react-redux'
import React from 'react';

import GraphView from '../components/graph/GraphView';
import { configGraphActions } from '../actions/configGraph.actions'
import { controlGraphActions } from '../actions/controlGraph.actions';

const mapStateToProps = state => ({
    graph: state.controlGraph.graph,
    prevGraphState: state.controlGraph.prevGraphState,
    graphData: state.controlGraph.graphData,
    linkColor: state.controlGraph.linkColor,
    selectedNode: state.controlGraph.selectedNode,
    selectedLink: state.controlGraph.selectedLink,
    selectedWeight:state.controlGraph.selectedWeight,
    sliderValue: state.controlGraph.sliderValue,
    propModalIsOpen: state.controlGraph.propModalIsOpen,
    selectedGraph: state.configGraph.selectedGraph,
    record: state.controlGraph.record,
    availRecord: state.controlGraph.availRecord,
    topNodes: state.controlGraph.topNodes,
    filename: state.configGraph.filename,
    isStatic: state.controlGraph.isStatic,
    currentDate: state.controlGraph.currentDate,
    movieRef: state.movieRef,
    
    // canvasRef: state.canvasRef
});

const mapDispatchToProps = dispatch => ({
    setSelectedNode: (nodeId) => dispatch(controlGraphActions.setSelectedNode(nodeId)),
    getNeighbors: (graphId, nodeId, graphData) => dispatch(controlGraphActions.getNeighbors(graphId, nodeId, graphData)),
    setSelectedWeight: (weight) => dispatch(controlGraphActions.setSelectedWeight(weight)),
    setSelectedLink: (link) => dispatch(controlGraphActions.setSelectedLink(link)),
    setSliderValue: (sliderValue) => dispatch(controlGraphActions.setSliderValue(sliderValue)),
    setPropModalIsOpen : (propModalIsOpen) => dispatch(controlGraphActions.setPropModalIsOpen(propModalIsOpen)),
    setRecord: (record) => dispatch(controlGraphActions.setRecord(record)),
    setAvailRecord: (availRecord) => dispatch(controlGraphActions.setAvailRecord(availRecord)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GraphView);

// const GraphComponent = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(GraphView);

// export default React.forwardRef((props, ref) =>
//   <GraphComponent {...props} graphRef={ref} />
// );