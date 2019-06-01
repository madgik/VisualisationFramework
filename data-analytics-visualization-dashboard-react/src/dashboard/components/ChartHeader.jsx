import React from 'react';

import { Dropdown, Header } from 'semantic-ui-react'

export const optionValues = Object.freeze({"field":1, "altitude":2, "soil":3, "crop":4})

const options = [
  { key: 1, text: '2012', value: 2012 },
  { key: 2, text: '2013', value: 2013 },
  { key: 3, text: '2014', value: 2014 },
  { key: 4, text: '2015', value: 2015 },
  { key: 5, text: '2016', value: 2016 },
  { key: 6, text: '2017', value: 2017 },
  { key: 7, text: '2018', value: 2018 }
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

  onFieldChange = (value) => {
    this.props.onFieldChange(value, this.props.chartProperties.headerProperties[value].text);
  }

  render() {
    const styles = {   
            position: 'absolute',
            right: 25
            }
      ;
    return (
    <div >
        <Header as='h3'>Crop simulation series</Header>
        <Dropdown
            placeholder='Properties'
            selection
            options={this.props.chartProperties.headerProperties}
            style={styles}
            disabled={this.props.fieldDetails.disabled}
            value={this.props.chartProperties.selectedFieldInYAxisId}
             onChange={(e, { value }) => this.onFieldChange(value)}
        />
  </div>
    );
  }
}

export default ChartHeader;