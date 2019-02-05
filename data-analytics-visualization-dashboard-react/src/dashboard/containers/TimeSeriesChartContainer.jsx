import { connect } from 'react-redux'
import { visualizationActions } from '../actions/visualization.actions';
import TimeSeriesHeader from '../components/TimeSeriesChartHeader';



function mapStateToProps(state) {
  return{
    weatherChartDetails: state.data.weatherChartDetails,
    fieldDetails: state.visualization.fieldDetails,
  };
};

const mapDispatchToProps = dispatch => ({
    onDatesChange : (startDate, endDate) => {
        console.log(startDate + " ," + endDate);
    },

    onFocusChange : (inputFocus) => {
        console.log(inputFocus);
    },

    setDateRange : (dateRange) => {
        dispatch(visualizationActions.setDateRange(dateRange));
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
