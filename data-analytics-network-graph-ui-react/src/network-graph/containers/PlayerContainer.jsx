import { connect } from 'react-redux'

import { configGraphActions } from '../actions/configGraph.actions'
import { controlGraphActions } from '../actions/controlGraph.actions';
import PlayerBar from '../components/menu/PlayerBar';


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
  playerTimestamps: state.controlGraph.playerTimestamps,
  openSidebar: state.configGraph.openSidebar,
  showOldNodes:state.controlGraph.showOldNodes,
  topNodes: state.controlGraph.topNodes,
  record: state.controlGraph.record
});

const mapDispatchToProps = dispatch => ({
  
    //SETTERS
    setCurrentDate: (date) => dispatch(controlGraphActions.setCurrentDate(date)),
    getDateGraph: (date, nodes, graphId, showOldNodes, topNodes)=> dispatch(controlGraphActions.getDateGraph(date, nodes, graphId, showOldNodes, topNodes)),
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
    setRecord: (record) => dispatch(controlGraphActions.setRecord(record))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerBar)