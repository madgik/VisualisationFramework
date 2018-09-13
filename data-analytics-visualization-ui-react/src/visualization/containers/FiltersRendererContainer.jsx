import { connect } from 'react-redux'

import { visualizationActions } from '../actions'

import FiltersRenderer from '../components/filters/FiltersRenderer'

const mapStateToProps = state => ({
  filters: state.data.filters
})

const mapDispatchToProps = dispatch => ({
  onFilterChange: (field, value) => {
    dispatch(visualizationActions.updateFilterAndReload(field, value))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FiltersRenderer)
