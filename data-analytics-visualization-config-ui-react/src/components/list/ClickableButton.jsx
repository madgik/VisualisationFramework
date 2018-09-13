import React from 'react';

import { Icon } from 'semantic-ui-react'

class ClickableButton extends React.Component {

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
      <Icon name='edit' onClick={this.handleClick} />
    );
  }
}

export default ClickableButton;