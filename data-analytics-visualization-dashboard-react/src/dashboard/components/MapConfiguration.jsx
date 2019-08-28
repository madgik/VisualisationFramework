import React from 'react';

import { Button, Dropdown } from 'semantic-ui-react'

class MapConfiguration extends React.Component {

    

  constructor(props) {
    super(props);
   
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleDropDownChange.bind(this);
  }

  handleDropDownChange = (value) => {
    this.props.onSelectYearElementClick(value);
  }

  loadData(){
      this.props.getMapData();
      }

  render() {
    const options = [
        { key: 1, text: '2012', value: 2012 },
        { key: 2, text: '2013', value: 2013 },
        { key: 3, text: '2014', value: 2014 },
        { key: 4, text: '2015', value: 2015 },
        { key: 5, text: '2016', value: 2016 },
        { key: 6, text: '2017', value: 2017 },
        { key: 7, text: '2018', value: 2018 },
        { key: 8, text: '2019', value: 2019 }

      ]
    return (
    <div className='ui clearing segment '>
        
        <Dropdown options={options}   value={this.props.visualization.selectedYear}  placeholder='Select Year'  selection  
        onChange={(e, { value }) => this.handleDropDownChange( value)}/>
        <Button floated='right' disabled={this.props.visualization.disableFetchData} onClick={this.loadData.bind(this)}>Fetch Data</Button>
        
  </div>
    );
  }
}

export default MapConfiguration;