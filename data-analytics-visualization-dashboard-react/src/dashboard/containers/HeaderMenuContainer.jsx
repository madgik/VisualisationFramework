import { connect } from 'react-redux'
import { visualizationActions } from '../actions/visualization.actions';
import HeaderMenu from '../components/HeaderMenu'


function mapStateToProps(state) {
  return {
    visualization: state.data.map,
    document: state.document
  };
}


const mapDispatchToProps = dispatch => ({
    updateDashBoardTitle: (title) => {
  dispatch(visualizationActions.updateDashBoardTitle(title))
  }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderMenu)
