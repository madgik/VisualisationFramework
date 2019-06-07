import { connect } from 'react-redux'

import { visualizationActions } from '../actions/visualization.actions';
import { VisualizationRendererInnerContainer } from 'data-analytics-visualization-library'

function mapStateToProps(state) {
  return {
    visualization: state.data.map,
    document: state.document,

  };
}


const mapDispatchToProps = dispatch => ({
  
  onMapElementClick: (feature) => {
    dispatch(visualizationActions.selectLayer(feature));
    if(feature !== ""){
      dispatch(visualizationActions.getSelectedFieldMeteoStation(feature))
      
      dispatch(visualizationActions.enableFieldDetailsDropdown())
      //const dataMiner =  'http://dataminer-prototypes.d4science.org/wps/WebProcessingService'

      dispatch(visualizationActions.getDataMinerData())

      // dispatch(visualizationActions.getSelectedFieldDetails(feature));
     
      // dispatch(visualizationActions.setFieldDetailsDropdownValue(1));
      // dispatch(visualizationActions.getSelectedFieldMeteoStation(feature))
      // dispatch(visualizationActions.setXaxisFieldDataLabel("Date"));
      // dispatch(visualizationActions.setYaxisFieldDataLabel("mean_temperature"));

    }
    else
    {
      dispatch(visualizationActions.reloadSelectedLayer([]));
      dispatch(visualizationActions.disableFieldDetailsDropdown());
    //  dispatch(visualizationActions.setFieldDetailsDropdownValue(''));
      dispatch(visualizationActions.getNearestMeteoStation(''));
     // dispatch(visualizationActions.updateFieldDataDropdownValue(''));
      dispatch(visualizationActions.cleanRelatedFieldData());
      dispatch(visualizationActions.reloadSelectedLayerSoilData([]));

      // dispatch(visualizationActions.setXaxisFieldDataLabel(""));
      // dispatch(visualizationActions.setYaxisFieldDataLabel(""));
     // dispatch(visualizationActions.setWeatherPropertiesDropdownValue(0));
     // dispatch(visualizationActions.setWeatherPropertiesDropdownText("mean_temperature"));


    }
  },

  updateCurrentGeometry: (geometry, zoom) => {
    dispatch(visualizationActions.updateCurrentGeometry(geometry));
    dispatch(visualizationActions.shouldDisableibableFetchData(zoom));
    dispatch(visualizationActions.updateCurrentZoomLevel(zoom));

    }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisualizationRendererInnerContainer)
