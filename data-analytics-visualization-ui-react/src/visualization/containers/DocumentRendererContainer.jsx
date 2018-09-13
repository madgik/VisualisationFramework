import { connect } from 'react-redux'

import DocumentRenderer from '../components/documents/DocumentRenderer'

const mapStateToProps = state => ({
  loading: state.document.loading,
  open: state.document.isModalOpen,
  src: state.document.modalSrc,
  hasDocuments: state.data.hasDocuments
})

const mapDispatchToProps = dispatch => ({
 
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentRenderer)
