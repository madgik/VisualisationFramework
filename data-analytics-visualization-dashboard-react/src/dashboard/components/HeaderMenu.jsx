import React from 'react';
import {Treebeard, decorators} from 'react-treebeard';
import style from '../../style';
import styled from '@emotion/styled';

import {  Header, Input, Button } from 'semantic-ui-react'
import Modal from '@trendmicro/react-modal';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-modal/dist/react-modal.css';

const data = {
  name: 'root',
  toggled: true,
  children: [
      {
          name: 'parent',
          children: [
              { name: 'child1' },
              { name: 'child2' }
          ]
      },
      {
          name: 'loading parent',
          loading: true,
          children: []
      },
      {
          name: 'parent',
          children: [
              {
                  name: 'nested parent',
                  children: [
                      { name: 'nested child 1' },
                      { name: 'nested child 2' }
                  ]
              }
          ]
      }
  ]
};

const Div = styled('Div', {
  shouldForwardProp: prop => ['className', 'children'].indexOf(prop) !== -1
})(({style}) => style);


// Example: Customising The Header Decorator To Include Icons
const decorators1 = {
  Loading: (props) => {
      return (
          <div style={props.style}>
              loading...
          </div>
      );
  },
  Toggle: (props) => {
      return (
          <div style={props.style}>
              <svg height={props.height} width={props.width}>
                  // Vector Toggle Here
              </svg>
          </div>
      );
  },
  Header: (props) => {
      return (
          <div style={props.style}>
              {props.node.name}
          </div>
      );
  },
  Container: (props) => {
      return (
          <div onClick={this.onClick}>
              // Hide Toggle When Terminal Here
              <this.props.decorators.Toggle/>
              <this.props.decorators.Header/>
          </div>
      );
  }
};


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

  onClick(){

  }

  openDashboardWorkspaceDirectory() {
    this.props.openDashboardWorkspaceDirectory();
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
        <Button floated='right' onClick={this.openDashboardWorkspaceDirectory.bind(this)} >Save</Button>
        <Button floated='right'>Open</Button>
        <Modal center showOverlay={true} show={true} onClose={this.onCloseModal} >
          <Modal.Header>
            <Modal.Title>
              Dashboard Workspace Directory
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Treebeard
                data={data}
                onToggle={this.onToggle}
                style= {style}
                decorators={decorators1}

            />
          </Modal.Body>
        </Modal>
  </div>
    );
  }
}

export default HeaderMenu;