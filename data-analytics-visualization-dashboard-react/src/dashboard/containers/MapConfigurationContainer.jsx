import { connect } from 'react-redux'
import { visualizationActions } from '../actions/visualization.actions';
import MapConfiguration from '../components/MapConfiguration'
import originalMoment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(originalMoment);


function mapStateToProps(state) {
  return {
    visualization: state.visualization,
    document: state.document
  };
}


const mapDispatchToProps = dispatch => ({
  onSelectYearElementClick: (year) => {
    const dateToFormat = year + '-12-31';
    const today = moment(dateToFormat);
    let range = moment.range(today.clone().subtract(1, "years"), today.clone());
    dispatch(visualizationActions.setDateRange(range));
    dispatch(visualizationActions.reloadSelectedLayer([]));
      dispatch(visualizationActions.disableFieldDetailsDropdown());
      dispatch(visualizationActions.disableDataMinerFieldDetailsDropdown());

    //  dispatch(visualizationActions.setFieldDetailsDropdownValue(''));
      dispatch(visualizationActions.getNearestMeteoStation(''));
     // dispatch(visualizationActions.updateFieldDataDropdownValue(''));
      dispatch(visualizationActions.cleanRelatedFieldData());
      dispatch(visualizationActions.reloadSelectedLayerSoilData([]));
      dispatch(visualizationActions.reloadData([]));

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
