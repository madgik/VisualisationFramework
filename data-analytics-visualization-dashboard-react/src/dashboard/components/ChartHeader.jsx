import React from 'react';

import { Dropdown, Header } from 'semantic-ui-react'

export const optionValues = Object.freeze({"field":1, "altitude":2, "soil":3, "crop":4})

const options = [
  { key: optionValues.field, text: 'Basic field characteristics', value: optionValues.field },
  { key: optionValues.altitude, text: 'Field altitude data', value: optionValues.altitude },
  { key: optionValues.soil, text: 'Field soil information', value: optionValues.soil },
  { key: optionValues.crop, text: 'Crop History', value: optionValues.crop }
]

class ChartHeader extends React.Component {

  constructor(props) {
    super(props);
    
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  handleClick() {
    this.props.clickButtonCallback(this.props.item);
  }

  // onFieldChange = (field) => {
  //   this.props.onFieldCharacteristicsChange(field);
  // }
  onFieldChange(field) {
    this.props.onFieldCharacteristicsChange(field);
  }

  render() {
    const styles = {   
            position: 'absolute',
            right: 25,
            width: '300px'
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