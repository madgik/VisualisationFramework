import { connect } from 'react-redux'

//import { documentActions } from '../actions';
import { VisualizationRendererInnerContainer } from 'data-analytics-visualization-library'


const mapStateToProps = state => ({
  visualization: state.data.chart1,
  document: state.document,
  fieldDetails: state.visualization.fieldDetails,

})


export default connect(
  mapStateToProps)(VisualizationRendererInnerContainer)
