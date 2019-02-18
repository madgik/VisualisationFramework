import { connect } from 'react-redux'
import { visualizationActions } from '../actions/visualization.actions';
import TimeSeriesHeader from '../components/TimeSeriesChartHeader';



function mapStateToProps(state) {
  return{
    weatherChartDetails: state.data.weatherChartDetails,
    fieldDetails: state.visualization.fieldDetails,
    chart: state.data.chart1,
    chartProperties: state.data.chart1Properties

  };
};

const mapDispatchToProps = dispatch => ({
    onDatesChange : (startDate, endDate) => {
    },

    onFocusChange : (inputFocus) => {
    },

    setDateRange : (dateRange, dropdownValue) => {
        dispatch(visualizationActions.setDateRange(dateRange));
        dispatch(visualizationActions.updateFieldDataDropdownValue(dropdownValue));

    },
    clickButtonCallback(isOpen) {
        dispatch(visualizationActions.setDateRangeOpen(isOpen) )
    },
    onFieldCharacteristicsChange : (selected) => {
        dispatch(visualizationActions.updateFieldDataDropdownValue(selected))
        },
    setWeatherPropertiesDropdownValue : (value, text) => {
      dispatch(visualizationActions.setWeatherPropertiesDropdownValue(value));
      dispatch(visualizationActions.setWeatherPropertiesDropdownText(text));
      dispatch(visualizationActions.getSelectedFieldData());
    },
    setNdviPropertiesDropdownValue : (value, text) => {
      dispatch(visualizationActions.setNdviPropertiesDropdownValue(value));
      dispatch(visualizationActions.setNdviPropertiesDropdownText(text));
      dispatch(visualizationActions.getNDVIFieldData());
    }
})

export default connect(
  mapStateToProps, mapDispatchToProps)(TimeSeriesHeader)
