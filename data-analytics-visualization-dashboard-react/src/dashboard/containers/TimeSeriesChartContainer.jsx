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
        console.log(startDate + " ," + endDate);
    },

    onFocusChange : (inputFocus) => {
        console.log(inputFocus);
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
      // dispatch(visualizationActions.setXaxisFieldDataLabel("Date"));
      // dispatch(visualizationActions.setYaxisFieldDataLabel(text));


    },
    setNdviPropertiesDropdownValue : (value, text) => {
      dispatch(visualizationActions.setNdviPropertiesDropdownValue(value));
      dispatch(visualizationActions.setNdviPropertiesDropdownText(text));
      dispatch(visualizationActions.getNDVIFieldData());
      // dispatch(visualizationActions.setXaxisFieldDataLabel("Date"));
      // dispatch(visualizationActions.setYaxisFieldDataLabel(text));

      console.log(value, text);

    }
})

export default connect(
  mapStateToProps, mapDispatchToProps)(TimeSeriesHeader)
