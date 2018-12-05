import { connect } from 'react-redux'

import { VisualizationRendererInnerContainer } from 'data-analytics-visualization-ui-renderer'


function mapStateToProps(state) {
  return{
    visualization: state.data.chart2,
    document: state.document
  };
};


export default connect(
  mapStateToProps)(VisualizationRendererInnerContainer)
