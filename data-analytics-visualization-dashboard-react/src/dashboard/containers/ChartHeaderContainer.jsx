import { connect } from 'react-redux'
import { visualizationActions } from '../actions/visualization.actions';

import ChartHeader from '../components/ChartHeader';


function mapStateToProps(state) {
  return{
    fieldDetails: state.visualization.fieldDetails,
    chartProperties: state.data.chart2Properties

  };
};

const mapDispatchToProps = dispatch => ({
    onFieldChange : (value, text) => {
      dispatch(visualizationActions.setCropHistoryPropertiesDropdownValue(value));
      dispatch(visualizationActions.setCropHistoryPropertiesDropdownText(text));
      dispatch(visualizationActions.setDataMinerChartDetails());
  }
})

export default connect(
  mapStateToProps, mapDispatchToProps)(ChartHeader)
