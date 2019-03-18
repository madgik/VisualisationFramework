import { connect } from 'react-redux'

import DataImportForm  from '../components/forms/DataImportForm';
import { configGraphActions } from '../actions/configGraph.actions'




const mapStateToProps = state => ({
   fileDetails: state.configGraph.fileDetails,
});

const mapDispatchToProps = dispatch => ({
    upload: (file) => dispatch(configGraphActions.uploadFile(file)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataImportForm)