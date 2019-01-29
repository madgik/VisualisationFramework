import { connect } from 'react-redux'

import { visualizationActions } from '../actions/visualization.actions';
import { VisualizationRendererInnerContainer } from 'data-analytics-visualization-library'


function mapStateToProps(state) {
  return {
    visualization: state.data.map,
    document: state.document
  };
}


const mapDispatchToProps = dispatch => ({
  onMapElementClick: (feature) => {
    dispatch(visualizationActions.selectLayer(feature));
    if(feature !== ""){
      dispatch(visualizationActions.getSelectedFieldDetails(feature));
      dispatch(visualizationActions.enableFieldDetailsDropdown());
      dispatch(visualizationActions.setFieldDetailsDropdownValue(1));
    }
    else
    {
      dispatch(visualizationActions.reloadSelectedLayer([]));
      dispatch(visualizationActions.disableFieldDetailsDropdown());
      dispatch(visualizationActions.setFieldDetailsDropdownValue(''));
    }
  },

  updateCurrentGeometry: (geometry) => {
    dispatch(visualizationActions.updateCurrentGeometry(geometry))
    }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisualizationRendererInnerContainer)
