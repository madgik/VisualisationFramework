import React from 'react';

import { Dropdown, Header , Button} from 'semantic-ui-react'
import Center from 'react-center';

export const optionValues = Object.freeze({"field":1, "altitude":2, "soil":3, "crop":4})

class DataMinerChartHeader extends React.Component {

  constructor(props) {
    super(props);
    
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  handleClick() {
    this.props.clickButtonCallback(this.props.item);
  }

  // onFieldChange = (value) => {
  //   this.props.onFieldChange(value, this.props.chartProperties.headerProperties[value].text);
  // }

  onFieldChange(value) {
    this.props.onFieldChange(value, this.props.chartProperties.headerProperties[value].text);
  }

  getDataMinerData() {
    this.props.getDataMinerData();
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
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Center>
          <Button disabled={!this.props.loader.enableCropSimulation} className="ui positive button" onClick={this.getDataMinerData.bind(this)} >Run Crop Simulation</Button>
        </Center>

  </div>
    );
  }
}

export default DataMinerChartHeader;