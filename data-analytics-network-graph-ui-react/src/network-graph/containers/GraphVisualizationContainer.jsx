import { connect } from 'react-redux'
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

});

const mapDispatchToProps = dispatch => ({
    setSelectedNode: (nodeId) => dispatch(controlGraphActions.setSelectedNode(nodeId)),
    getNeighbors: (graphId, nodeId, graphData) => dispatch(controlGraphActions.getNeighbors(graphId, nodeId, graphData)),
    setSelectedWeight: (weight) => dispatch(controlGraphActions.setSelectedWeight(weight)),
    setSelectedLink: (link) => dispatch(controlGraphActions.setSelectedLink(link)),
    setSliderValue: (sliderValue) => dispatch(controlGraphActions.setSliderValue(sliderValue)),
    setPropModalIsOpen : (propModalIsOpen) => dispatch(controlGraphActions.setPropModalIsOpen(propModalIsOpen)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GraphView)