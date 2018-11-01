import { connect } from 'react-redux'

import VisualizationRenderer from '../components/VisualizationRenderer'
import { documentActions } from '../actions';

const mapStateToProps = state => ({
  visualization: state.data,
  document: state.document
})

const mapDispatchToProps = dispatch => ({
  onChartElementClick: (url, modalSrc, activeDocuments) => {
    dispatch(documentActions.showDocument(url, modalSrc, activeDocuments))
  },
  onChartCanvasClick: () => {
    dispatch(documentActions.hideDocument())
  },
  onUpdateDocuments: (modalSrc) => {
    dispatch(documentActions.updateDocumentData(modalSrc))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisualizationRenderer)
