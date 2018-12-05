import React from 'react';

import { Dropdown, Header } from 'semantic-ui-react'

class ChartHeader extends React.Component {

  constructor(props) {
    super(props);
    
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.clickButtonCallback(this.props.item);
  }

  render() {
    const styles = {   
            position: 'absolute',
            right: 25
            }
      ;
    return (
    <div className='ui clearing '>
        <Header as='h3'>Dashboard Title</Header>
            <Dropdown style={styles} placeholder='Configure'  selection  />
  </div>
    );
  }
}

export default ChartHeader;