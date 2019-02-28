import { connect } from 'react-redux'

import DocumentRenderer from '../components/documents/DocumentRenderer'
import { documentActions } from '../actions';

const mapStateToProps = state => ({
  loading: state.document.loading,
  open: state.document.isModalOpen,
  src: state.document.modalSrc,
  hasDocuments: state.data.hasDocuments
})

const mapDispatchToProps = dispatch => ({
  onChartCanvasClick: () => {
    dispatch(documentActions.resetSelectedPoints())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentRenderer)
