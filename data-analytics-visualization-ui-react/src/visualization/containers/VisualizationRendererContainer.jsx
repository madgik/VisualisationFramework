import { connect } from 'react-redux'

import VisualizationRenderer from '../components/VisualizationRenderer'
import { documentActions } from '../actions';

const mapStateToProps = state => ({
  visualization: state.data
})

const mapDispatchToProps = dispatch => ({
  onChartElementClick: (url) => {
    dispatch(documentActions.showDocument(url))
  },
  onChartCanvasClick: () => {
    dispatch(documentActions.hideDocument())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisualizationRenderer)
