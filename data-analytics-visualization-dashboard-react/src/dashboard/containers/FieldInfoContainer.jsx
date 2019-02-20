import { connect } from 'react-redux'
import FieldInfo from '../components/FieldInfo'


function mapStateToProps(state) {
  return {
    fieldDetails: state.visualization.selectedLayerFieldDetails,
    fieldDetailsData: state.visualization.selectedLayerFieldDetailsData,
    soilDetails: state.visualization.selectedLayerFieldSoilDetails,
    soilDetailsData: state.visualization.selectedLayerFieldSoilDetailsData,
    selectedProperty: state.visualization.fieldDetails.selected
  };
}


const mapDispatchToProps = dispatch => ({
   
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FieldInfo)
