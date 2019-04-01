import React from 'react';

import { Menu } from 'semantic-ui-react'

class BaseViewMenu extends React.Component {

  handleItemClick = (e, { name }) => this.props.onMenuItemClick(name);

  render() {
    
    const activeItem = this.props.activeItem;

    return (
    <Menu fluid horizontal tabular>
        {/* <Menu.Item name='general' active={activeItem === 'general'} onClick={this.handleItemClick} />
        <Menu.Item name='data' active={activeItem === 'data'} onClick={this.handleItemClick} />
        <Menu.Item name='visualization' active={activeItem === 'filters'} onClick={this.handleItemClick} /> */}
    </Menu>);
  }
}

export default BaseViewMenu;