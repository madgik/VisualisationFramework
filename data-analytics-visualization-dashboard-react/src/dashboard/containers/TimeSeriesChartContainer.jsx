import { connect } from 'react-redux'
import { visualizationActions } from '../actions/visualization.actions';
import TimeSeriesHeader from '../components/TimeSeriesChartHeader';



function mapStateToProps(state) {
  return{
    weatherChartDetails: state.data.weatherChartDetails,
    fieldDetails: state.visualization.fieldDetails,
    chart: state.data.chart1
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
        }
})

export default connect(
  mapStateToProps, mapDispatchToProps)(TimeSeriesHeader)
