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
    dispatch(visualizationActions.reloadSelectedLayer([]));
      dispatch(visualizationActions.disableFieldDetailsDropdown());
      dispatch(visualizationActions.disableDataMinerFieldDetailsDropdown());

    //  dispatch(visualizationActions.setFieldDetailsDropdownValue(''));
      dispatch(visualizationActions.getNearestMeteoStation(''));
     // dispatch(visualizationActions.updateFieldDataDropdownValue(''));
      dispatch(visualizationActions.cleanRelatedFieldData());
      dispatch(visualizationActions.reloadSelectedLayerSoilData([]));

    dispatch(visualizationActions.selectYear(year))
  },

 getMapData: () => {
    dispatch(visualizationActions.reloadSelectedLayer([]));
    dispatch(visualizationActions.disableFieldDetailsDropdown());
  //  dispatch(visualizationActions.setFieldDetailsDropdownValue(''));
    dispatch(visualizationActions.getNearestMeteoStation(''));
  // dispatch(visualizationActions.updateFieldDataDropdownValue(''));
    dispatch(visualizationActions.cleanRelatedFieldData());
    dispatch(visualizationActions.reloadSelectedLayerSoilData([]));
    
    dispatch(visualizationActions.getMapDataset())
    }

 
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapConfiguration)
