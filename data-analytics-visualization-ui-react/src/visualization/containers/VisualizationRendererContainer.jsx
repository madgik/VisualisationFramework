import { connect } from 'react-redux'

import { documentActions } from '../actions';
import { VisualizationRendererInnerContainer } from 'data-analytics-visualization-library'


const mapStateToProps = state => ({
  visualization: state.data,
  document: state.document
})

const mapDispatchToProps = dispatch => ({
  onChartElementClick: (url, modalSrc, activeDocuments, lineChartId, pointId, color) => {
    console.log("Color :::::::: " + color);
    dispatch(documentActions.showDocument(url, modalSrc, activeDocuments, lineChartId, pointId,color))
  },
  onChartCanvasClick: () => {
    dispatch(documentActions.hideDocument())
  },
  onUpdateDocuments: (modalSrc) => {
    dispatch(documentActions.updateDocumentData(modalSrc))
  },
  onMapElementClick: (feature) => {
    // dispatch(documentActions.showDocument(url, modalSrc, activeDocuments))
    console.log(feature);
   },
   updateCurrentGeometry: (geometry, zoom) => {
   }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisualizationRendererInnerContainer)
