import { connect } from 'react-redux'
import { visualizationActions } from '../actions/visualization.actions';

import ChartHeader from '../components/ChartHeader';


function mapStateToProps(state) {
  return{
    fieldDetails: state.visualization.fieldDetails,
  };
};

const mapDispatchToProps = dispatch => ({
    onFieldCharacteristicsChange : (selected) => {
  dispatch(visualizationActions.updateFieldDetailsDropdownValue(selected))
  }
})

export default connect(
  mapStateToProps, mapDispatchToProps)(ChartHeader)
