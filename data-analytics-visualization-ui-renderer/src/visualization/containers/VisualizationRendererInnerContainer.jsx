import { connect } from 'react-redux'

import VisualizationRendererInner from '../components/VisualizationRendererInner'

const mapStateToProps = state => ({
  visualization: state.data,
  document: state.document
})



export default connect(
  mapStateToProps)(VisualizationRendererInner)
