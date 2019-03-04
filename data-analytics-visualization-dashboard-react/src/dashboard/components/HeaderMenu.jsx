import React from 'react';

import { Button, Header, Input } from 'semantic-ui-react'

class HeaderMenu extends React.Component {

  constructor(props) {
    super(props);
    
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  handleClick() {
    this.props.clickButtonCallback(this.props.item);
  }

  onSave(e) {
    this.props.updateDashBoardTitle(e);
 //   visualizationActions.updateDashBoardTitle(e);
  }

  render() {
    return (
    <div className='ui clearing segment'>

        <Header as='h1'>
        <div className="ui transparent input">
            <Input
                maxLength={750}
                placeholder="Dashboard Title"
                onChange={(e) => this.onSave(e.target.value)}
            />
            </div>
        </Header>
        {/* <Button floated='right'>Save</Button>
        <Button floated='right'>Open</Button>
        <Button floated='right'>Share</Button>
        <Button floated='right'>Remove</Button> */}

  </div>
    );
  }
}

export default HeaderMenu;