import { connect } from 'react-redux'

//import { documentActions } from '../actions';
import { VisualizationRendererInnerContainer } from 'data-analytics-visualization-ui-renderer'


const mapStateToProps = state => ({
  visualization: state.data.map,
  document: state.document
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
  mapStateToProps
)(VisualizationRendererInnerContainer)
