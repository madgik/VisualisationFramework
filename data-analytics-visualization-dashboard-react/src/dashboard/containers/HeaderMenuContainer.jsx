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

    console.log("open dashboard!!");
    dispatch(visualizationActions.showOpenFromWorkspace(open))
  },

  saveDashboardWorkspaceDirectory: (open) => {

    console.log("σαωε dashboard!!");
    dispatch(visualizationActions.showSaveToWorkspace(open))
  }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderMenu)
