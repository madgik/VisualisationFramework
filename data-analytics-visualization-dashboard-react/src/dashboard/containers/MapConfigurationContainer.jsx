import { connect } from 'react-redux'
import { visualizationActions } from '../actions/visualization.actions';
import MapConfiguration from '../components/MapConfiguration'


function mapStateToProps(state) {
  return {
    visualization: state.data.map,
    document: state.document
  };
}


const mapDispatchToProps = dispatch => ({
  onSelectYearElementClick: (year) => {
  dispatch(visualizationActions.selectYear(year))
  },

  updateCurrentGeometry: (geometry) => {
    dispatch(visualizationActions.updateCurrentGeometry(geometry))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapConfiguration)
