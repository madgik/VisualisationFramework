import { connect } from 'react-redux'
import CustomLoader from '../components/CustomLoader'


function mapStateToProps(state) {
  return {
    loading: state.data.loader.loading,
  };
}


const mapDispatchToProps = dispatch => ({
   
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomLoader)
