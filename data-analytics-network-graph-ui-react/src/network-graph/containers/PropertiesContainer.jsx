import { connect } from 'react-redux'

import { configGraphActions } from '../actions/configGraph.actions'
import { controlGraphActions } from '../actions/controlGraph.actions';
import SidebarProperties from '../components/menu/SidebarProperties';


const mapStateToProps = state => ({
   fileDetails: state.configGraph.fileDetails,
   graphSource: state.configGraph.graphSource,
   selectedGraph: state.configGraph.selectedGraph,
   allGraphsMetadata: state.configGraph.allGraphsMetadata,
   selectedNode: state.controlGraph.selectedNode,
   graph: state.controlGraph.graph,
   graphData: state.controlGraph.graphData,
   currentDate: state.controlGraph.currentDate,
   paused: state.controlGraph.paused,
   selectedWeight: state.controlGraph.selectedWeight,
   selectedLink: state.controlGraph.selectedLink,
   sliderValue: state.controlGraph.sliderValue
});

const mapDispatchToProps = dispatch => ({
    //API CALLS
    uploadFile: (file) => dispatch(configGraphActions.uploadFile(file)),
    getAllGraphsMetadata: () => dispatch(configGraphActions.getAllGraphsMetadata()),
    //SETTERS
    setFileValidation: (isValid) => dispatch(configGraphActions.setFileValidation(isValid)),
    setGraphSource: (graphSource) => dispatch(configGraphActions.setGraphSource(graphSource)),
    setSelectedGraph: (selectedGraph) => dispatch(configGraphActions.setSelectedGraph(selectedGraph)),
    getTopNodes: (graphId, number) => dispatch(controlGraphActions.getTopNodes(graphId, number)),
    getNeighbors: (graphId, nodeId, graphData) => dispatch(controlGraphActions.getNeighbors(graphId, nodeId, graphData)),
    setCurrentDate: (date) => dispatch(controlGraphActions.setCurrentDate(date)),
    getDateGraph: (date, nodes, graphId)=> dispatch(controlGraphActions.getDateGraph(date, nodes, graphId)),
    playTimeGraph: (date, nodes, graphId)=> dispatch(controlGraphActions.playTimeGraph(date, nodes, graphId)),
    setPaused: (paused) => dispatch(controlGraphActions.setPaused(paused)),
    setSliderValue: (sliderValue) => dispatch(controlGraphActions.setSliderValue(sliderValue))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarProperties)