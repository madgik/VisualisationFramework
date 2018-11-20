import { connect } from 'react-redux'

//import { documentActions } from '../actions';
import { VisualizationRendererInnerContainer } from 'data-analytics-visualization-ui-renderer'


function mapStateToProps(state) {
  console.log('data 2: ', state.data.chart2);   
  return{
    visualization: state.data.chart2,
    document: state.document
  };
};


export default connect(
  mapStateToProps)(VisualizationRendererInnerContainer)
