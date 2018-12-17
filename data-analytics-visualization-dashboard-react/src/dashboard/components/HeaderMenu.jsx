import React from 'react';

import { Button, Header } from 'semantic-ui-react'

class HeaderMenu extends React.Component {

  constructor(props) {
    super(props);
    
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.clickButtonCallback(this.props.item);
  }

  render() {
    return (
    <div className='ui clearing segment'>
    <Header as='h2'>Dashboard Title</Header>
        <Button floated='right'>Save</Button>
        <Button floated='right'>Open</Button>
        <Button floated='right'>Share</Button>
        <Button floated='right'>Remove</Button>

  </div>
    );
  }
}

export default HeaderMenu;