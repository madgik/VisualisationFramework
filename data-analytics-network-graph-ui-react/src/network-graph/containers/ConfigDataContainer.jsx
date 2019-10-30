import { connect } from 'react-redux'

import DataImportForm from '../components/forms/DataImportForm';
import { configGraphActions } from '../actions/configGraph.actions'
import TopMenu from '../components/menu/TopMenu';
import { controlGraphActions } from '../actions/controlGraph.actions';
// import SidebarControls from '../components/menu/SidebarControls';
import Grid from '@material-ui/core/Grid';


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
    openImportModal: state.configGraph.openImportModal,
    openSidebar: state.configGraph.openSidebar,
    nodesNumber: state.configGraph.nodesNumber,
    modalIsOpen: state.configGraph.modalIsOpen,
    modalMessage: state.configGraph.modalMessage,
    username: state.configGraph.username,
    modalType: state.configGraph.modalType,
    openConfigGraphModal: state.configGraph.openConfigGraphModal,
    url: state.configGraph.url,
    testMessageDelete: state.configGraph.testMessageDelete,
});

const mapDispatchToProps = dispatch => ({
    //API CALLS
    uploadFile: (file, fileName, privacy, username) => dispatch(configGraphActions.uploadFile(file, fileName, privacy, username)),
    getAllGraphsMetadata: () => dispatch(configGraphActions.getAllGraphsMetadata()),
    getAllTimestamps: (selectedGraph) => dispatch(controlGraphActions.getAllTimestamps(selectedGraph)),
    setSliderValue: (sliderValue) => dispatch(controlGraphActions.setSliderValue(sliderValue)),
    getFromUrl: (url, filename, privacy, username) => dispatch(configGraphActions.getFromUrl(url, filename, privacy, username)),
    //SETTERS
    setFileValidation: (isValid) => dispatch(configGraphActions.setFileValidation(isValid)),
    setGraphSource: (graphSource) => dispatch(configGraphActions.setGraphSource(graphSource)),
    setSelectedGraph: (selectedGraph) => dispatch(configGraphActions.setSelectedGraph(selectedGraph)),
    getTopNodes: (graphId, number) => dispatch(controlGraphActions.getTopNodes(graphId, number)),
    getNeighbors: (graphId, nodeId, graphData) => dispatch(controlGraphActions.getNeighbors(graphId, nodeId, graphData)),
    setCurrentDate: (date) => dispatch(controlGraphActions.setCurrentDate(date)),
    getDateGraph: (date, nodes, graphId) => dispatch(controlGraphActions.getDateGraph(date, nodes, graphId)),
    playTimeGraph: (date, nodes, graphId) => dispatch(controlGraphActions.playTimeGraph(date, nodes, graphId)),
    setPaused: (paused) => dispatch(controlGraphActions.setPaused(paused)),
    setPausedPromise: (paused) => dispatch(controlGraphActions.setPausedPromise(paused)),
    setStopped: (stopped) => dispatch(controlGraphActions.setStopped(stopped)),
    setOpenImportModal: (openImportModal) => dispatch(configGraphActions.setOpenImportModal(openImportModal)),
    setOpenConfigGraphModal: (openConfigGraphModal) => dispatch(configGraphActions.setOpenConfigGraphModal(openConfigGraphModal)),
    setOpenSidebar: (openSidebar) => dispatch(configGraphActions.setOpenSidebar(openSidebar)),
    setNodesNumber: (nodesNumber) => dispatch(configGraphActions.setNodesNumber(nodesNumber)),
    setModalIsOpen: (modalIsOpen) => dispatch(configGraphActions.setModalIsOpen(modalIsOpen)),
    setModalType: (modalType) => dispatch(configGraphActions.setModalType(modalType)),
    setFilename: (filename) => dispatch(configGraphActions.setFilename(filename)),
    setUrl: (url) => dispatch(configGraphActions.setUrl(url)),
    deleteGraphMetadata: (id) => dispatch(configGraphActions.deleteGraphMetadata(id)),
    setTestMessageDelete: (testMessageDelete) => dispatch(configGraphActions.setTestMessageDelete(testMessageDelete))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopMenu)