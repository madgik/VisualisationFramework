import { connect } from 'react-redux'

//import { documentActions } from '../actions';
import { VisualizationRendererInnerContainer } from 'data-analytics-visualization-ui-renderer'


const mapStateToProps = state => ({
  visualization: state.data.chart1,
  document: state.document
})


export default connect(
  mapStateToProps)(VisualizationRendererInnerContainer)