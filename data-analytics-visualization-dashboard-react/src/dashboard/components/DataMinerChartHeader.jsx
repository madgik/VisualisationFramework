import React from 'react';

import { Dropdown, Header, Loader } from 'semantic-ui-react'

export const optionValues = Object.freeze({"field":1, "altitude":2, "soil":3, "crop":4})

class DataMinerChartHeader extends React.Component {

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
            disabled={this.props.fieldDetails.dataMinerDropdownDisabled}
            value={this.props.chartProperties.selectedFieldInYAxisId}
             onChange={(e, { value }) => this.onFieldChange(value)}
        />
  </div>
    );
  }
}

export default DataMinerChartHeader;