import { connect } from 'react-redux'

import { configGraphActions } from '../actions/configGraph.actions'
import { controlGraphActions } from '../actions/controlGraph.actions';
import SidebarControls from '../components/menu/SidebarControls';


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
  stopped: state.controlGraph.stopped,
  selectedWeight: state.controlGraph.selectedWeight,
  selectedLink: state.controlGraph.selectedLink,
  sliderValue: state.controlGraph.sliderValue,
  timestamps: state.controlGraph.timestamps,
  openSidebar: state.configGraph.openSidebar,
  showOldNodes: state.controlGraph.showOldNodes,
  topNodes: state.controlGraph.topNodes,
  timestampFrom: state.controlGraph.timestampFrom,
  timestampTo: state.controlGraph.timestampTo,
  propertyValues: state.controlGraph.propertyValues
});

const mapDispatchToProps = dispatch => ({
    //API CALLS
    uploadFile: (file) => dispatch(configGraphActions.uploadFile(file)),
    getAllGraphsMetadata: () => dispatch(configGraphActions.getAllGraphsMetadata()),
    getFilteredGraph: (query, graphId) => dispatch(controlGraphActions.getFilteredGraph(query, graphId)),
    getPropertyValues: (property, graphId) => dispatch(controlGraphActions.getPropertyValues(property, graphId)),
    
    //SETTERS
    setFileValidation: (isValid) => dispatch(configGraphActions.setFileValidation(isValid)),
    setGraphSource: (graphSource) => dispatch(configGraphActions.setGraphSource(graphSource)),
    setSelectedGraph: (selectedGraph) => dispatch(configGraphActions.setSelectedGraph(selectedGraph)),
    getTopNodes: (graphId, number) => dispatch(controlGraphActions.getTopNodes(graphId, number)),
    getNeighbors: (graphId, nodeId, graphData) => dispatch(controlGraphActions.getNeighbors(graphId, nodeId, graphData)),
    setCurrentDate: (date) => dispatch(controlGraphActions.setCurrentDate(date)),
    getDateGraph: (date, nodes, graphId)=> dispatch(controlGraphActions.getDateGraph(date, nodes, graphId)),
    setOpenSidebar: (openSidebar) => dispatch(configGraphActions.setOpenSidebar(openSidebar)),

    //GraphControls
    getAllGraphsMetadata: () => dispatch(configGraphActions.getAllGraphsMetadata()),
    getAllTimestamps: (selectedGraph) => dispatch(controlGraphActions.getAllTimestamps(selectedGraph)),
    setSliderValue: (sliderValue) => dispatch(controlGraphActions.setSliderValue(sliderValue)),
    setPaused: (paused) => dispatch(controlGraphActions.setPaused(paused)),
    playTimeGraph: (date, nodes, graphId)=> dispatch(controlGraphActions.playTimeGraph(date, nodes, graphId)),

    //SETTERS
    setPausedPromise: (paused) => dispatch(controlGraphActions.setPausedPromise(paused)),
    setStopped: (stopped) => dispatch(controlGraphActions.setStopped(stopped)),
    setShowOldNodes: (showOldNodes) => dispatch(controlGraphActions.setShowOldNodes(showOldNodes)),
    setTimestampFrom: (timestampFrom) => dispatch(controlGraphActions.setTimestampFrom(timestampFrom)),
    setTimestampTo: (timestampTo) => dispatch(controlGraphActions.setTimestampTo(timestampTo)),
    setFilteredTimestamps:(timestamps, timestampFrom, timestampTo) => dispatch(controlGraphActions.setFilteredTimestamps(timestamps, timestampFrom, timestampTo))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarControls)