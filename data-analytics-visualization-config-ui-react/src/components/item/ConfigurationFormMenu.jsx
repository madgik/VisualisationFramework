import React from 'react';

import { Menu } from 'semantic-ui-react'

class ConfigurationFormMenu extends React.Component {

  handleItemClick = (e, { name }) => this.props.onMenuItemClick(name);

  render() {
    
    const activeItem = this.props.activeItem;

    return (<Menu fluid vertical tabular>
      <Menu.Item name='general' active={activeItem === 'general'} onClick={this.handleItemClick} />
      <Menu.Item name='data' active={activeItem === 'data'} onClick={this.handleItemClick} />
      <Menu.Item name='filters' active={activeItem === 'filters'} onClick={this.handleItemClick} />
      <Menu.Item name='documents' active={activeItem === 'documents'} onClick={this.handleItemClick} />
    </Menu>);
  }
}

export default ConfigurationFormMenu;