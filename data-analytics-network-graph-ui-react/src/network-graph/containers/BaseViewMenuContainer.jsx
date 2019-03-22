import { connect } from 'react-redux'

import { controlGraphActions, configGraphActions } from '../actions'

import BaseViewMenu from '../components/menu/BaseViewMenu';

const mapStateToProps = state => ({
  // chart: state.visualization.selected,
  // availableCharts: state.visualization.options,
  // label: state.data.label,
  // description: state.data.description,
  // type: state.data.type,
  // availableTypes: state.data.availableTypes,
  // open: state.configItem.open,
  // isNew: state.configItem.isNew,
  // editItemId: state.configItem.editItemId
})

const mapDispatchToProps = dispatch => ({
  // onChartSelectionChange: (e, { value }) => {
  //   dispatch(visualizationActions.changeVisualizationAndLoad(value))
  // },
  // onChartTypeSelectionChange: (e, { value }) => {
  //   dispatch(visualizationActions.changeChartType(value))
  // },
  // onConfigurationClick: () => {
  //   dispatch(configItemActions.editConfiguration())
  // },
  // onModalClose: () => dispatch(configItemActions.closeItemEdit()),
  // onConfigurationLoaded: () => dispatch(configItemActions.showItemEdit()),
  // onSaveComplete: () => {
  //   dispatch(configItemActions.closeItemEdit())
    
  //   dispatch(visualizationActions.reloadVisualization())
  // }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseViewMenu)
