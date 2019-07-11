import React from 'react';

import { Loader } from 'semantic-ui-react'



class CustomLoader extends React.Component {

 

  render() {
  
    return (
        <div>
             {this.props.loading === true  &&   <Loader active={this.props.loading}>Loading</Loader>
 } 
        </div>
    );
  }
}

export default CustomLoader;