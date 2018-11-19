import { connect } from 'react-redux'

//import { documentActions } from '../actions';
import { VisualizationRendererInnerContainer } from 'data-analytics-visualization-ui-renderer'


// const mapStateToProps = state => 
// ({
//   visualization: state.data.map,
//   document: state.document
  
// })

function mapStateToProps(state) {
  console.log('Update selectLayout!!! ', state.data.map);   
  //When I dispatch action, I can get update selectLayout value right away here, but it can't map the state to props right away.
  return {
    visualization: state.data.map,
    document: state.document
  };
}


const mapDispatchToProps = dispatch => ({
  onMapElementClick: (feature) => {
   // dispatch(documentActions.showDocument(url, modalSrc, activeDocuments))
   console.log(feature);
  }
})

// const mapDispatchToProps = dispatch => ({
//   onChartElementClick: (url, modalSrc, activeDocuments) => {
//     dispatch(documentActions.showDocument(url, modalSrc, activeDocuments))
//   },
//   onChartCanvasClick: () => {
//     dispatch(documentActions.hideDocument())
//   },
//   onUpdateDocuments: (modalSrc) => {
//     dispatch(documentActions.updateDocumentData(modalSrc))
//   }
// })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisualizationRendererInnerContainer)
