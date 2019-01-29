import { connect } from 'react-redux'
import FieldInfo from '../components/FieldInfo'


function mapStateToProps(state) {
  return {
    fieldDetails: state.visualization.selectedLayerFieldDetails,
    fieldDetailsData: state.visualization.selectedLayerFieldDetailsData
  };
}


const mapDispatchToProps = dispatch => ({
   
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FieldInfo)
