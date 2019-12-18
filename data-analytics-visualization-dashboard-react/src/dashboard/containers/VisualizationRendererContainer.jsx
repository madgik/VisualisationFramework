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
      dispatch(visualizationActions.getSelectedFieldMeteoStation(feature))
      
      dispatch(visualizationActions.enableFieldDetailsDropdown())
      //const dataMiner =  'http://dataminer-prototypes.d4science.org/wps/WebProcessingService'


      if(dispatch(visualizationActions.enableDataMinerFetch()) === true)
        dispatch(visualizationActions.setDataMinerEnableCropSimulation(true));
      else
        dispatch(visualizationActions.setDataMinerEnableCropSimulation(false));

      // dispatch(visualizationActions.getSelectedFieldDetails(feature));
      dispatch(visualizationActions.cleanDataMinerData());
      // dispatch(visualizationActions.setFieldDetailsDropdownValue(1));
      // dispatch(visualizationActions.getSelectedFieldMeteoStation(feature))
      // dispatch(visualizationActions.setXaxisFieldDataLabel("Date"));
      // dispatch(visualizationActions.setYaxisFieldDataLabel("mean_temperature"));

    }
    else
    {
      dispatch(visualizationActions.reloadSelectedLayer([]));
      dispatch(visualizationActions.disableFieldDetailsDropdown());
      dispatch(visualizationActions.disableDataMinerFieldDetailsDropdown());

    //  dispatch(visualizationActions.setFieldDetailsDropdownValue(''));
      dispatch(visualizationActions.getNearestMeteoStation(''));
     // dispatch(visualizationActions.updateFieldDataDropdownValue(''));
      dispatch(visualizationActions.cleanRelatedFieldData());
      dispatch(visualizationActions.reloadSelectedLayerSoilData([]));
      dispatch(visualizationActions.setDataMinerEnableCropSimulation(false));


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
