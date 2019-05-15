import { connect } from 'react-redux'
import { visualizationActions } from '../actions/visualization.actions';
import HeaderMenu from '../components/HeaderMenu'


function mapStateToProps(state) {
  return {
    visualization: state.data.map,
    document: state.document,
    workspace: state.data.workspaceDetails
  };
}


const mapDispatchToProps = dispatch => ({
    updateDashBoardTitle: (title) => {
  dispatch(visualizationActions.updateDashBoardTitle(title))
  },
  openDashboardWorkspaceDirectory: (open) => {
    dispatch(visualizationActions.showOpenFromWorkspace(open))
  },

  saveDashboardWorkspaceDirectory: (open) => {
    dispatch(visualizationActions.showSaveToWorkspace(open))
  },
  onFieldChange(value)
  {
    dispatch(visualizationActions.setFilenameForWorkspace(value))
  },
  onFileSaveToWorkspace(){
    console.log("save to dashboard file!!")
    dispatch(visualizationActions.saveNewFileToWorkspace());
  },
  onLoadFromWorkspace(event){
    console.log("On load from workspace");
    console.log(event);
  //  dispatch(visualizationActions.saveNewFileToWorkspace());
  }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderMenu)
