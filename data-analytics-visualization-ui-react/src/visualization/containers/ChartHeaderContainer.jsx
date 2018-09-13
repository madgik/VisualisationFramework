import { connect } from 'react-redux'

import { visualizationActions } from '../actions'

import ChartHeader from '../components/charts/ChartHeader'

const mapStateToProps = state => ({
  chart: state.visualization.selected,
  availableCharts: state.visualization.options,
  label: state.data.label,
  description: state.data.description,
  type: state.data.type,
  availableTypes: state.data.availableTypes
})

const mapDispatchToProps = dispatch => ({
  onChartSelectionChange: (e, { value }) => {
    dispatch(visualizationActions.changeVisualizationAndLoad(value))
  },
  onChartTypeSelectionChange: (e, { value }) => {
    dispatch(visualizationActions.changeChartType(value))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartHeader)
