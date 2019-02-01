import React from 'react';

import { Dropdown, Header } from 'semantic-ui-react'

const options = [
  { key: 1, text: 'Basic field characteristics', value: 1 },
  { key: 2, text: 'Field altitude data', value: 2 },
  { key: 3, text: 'Field soil information', value: 3 },
]

class ChartHeader extends React.Component {

  constructor(props) {
    super(props);
    
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.clickButtonCallback(this.props.item);
  }

  onFieldChange = (field) => {
    this.props.onFieldCharacteristicsChange(field);
  }

  render() {
    const styles = {   
            position: 'absolute',
            right: 25
            }
      ;
    return (
    <div >
        <Header as='h3'>{this.props.title}</Header>
        <Dropdown
                placeholder='Field'
                selection
                options={options}
                disabled={this.props.fieldDetails.disabled}
                style={styles}
                value={this.props.fieldDetails.selected}
                onChange={(e, { value }) => this.onFieldChange(value)} />
  </div>
    );
  }
}

export default ChartHeader;