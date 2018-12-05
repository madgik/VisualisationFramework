import { connect } from 'react-redux'

import { visualizationActions } from '../actions/visualization.actions';
import { VisualizationRendererInnerContainer } from 'data-analytics-visualization-ui-renderer'


function mapStateToProps(state) {
  return {
    visualization: state.data.map,
    document: state.document
  };
}


const mapDispatchToProps = dispatch => ({
  onMapElementClick: (feature) => {
  dispatch(visualizationActions.selectLayer(feature))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisualizationRendererInnerContainer)
