import { connect } from 'react-redux'
import { visualizationActions } from '../actions/visualization.actions';
import MapConfiguration from '../components/MapConfiguration'


function mapStateToProps(state) {
  return {
    visualization: state.visualization,
    document: state.document
  };
}


const mapDispatchToProps = dispatch => ({
  onSelectYearElementClick: (year) => {
  dispatch(visualizationActions.selectYear(year))
  },

 getMapData: () => {
    dispatch(visualizationActions.getMapDataset())
    }

 
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapConfiguration)
