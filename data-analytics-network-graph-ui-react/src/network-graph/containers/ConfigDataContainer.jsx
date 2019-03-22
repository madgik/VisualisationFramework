import { connect } from 'react-redux'

import DataImportForm  from '../components/forms/DataImportForm';
import { configGraphActions } from '../actions/configGraph.actions'
import SidebarControls from '../components/menu/SidebarControls';
// import SidebarControls from '../components/menu/SidebarControls';


const mapStateToProps = state => ({
   fileDetails: state.configGraph.fileDetails,
});

const mapDispatchToProps = dispatch => ({
    uploadFile: (file) => dispatch(configGraphActions.uploadFile(file)),
    setFileValidation: (isValid) => dispatch(configGraphActions.setFileValidation(isValid))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarControls)