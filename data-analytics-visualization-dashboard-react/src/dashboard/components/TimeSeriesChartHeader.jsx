import React from 'react';

import { Dropdown, Header, Button } from 'semantic-ui-react'
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import { visualizationActions } from '../actions/visualization.actions';
import Modal from '@trendmicro/react-modal';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-modal/dist/react-modal.css';

export const dataValues = Object.freeze({"weather":1, "ndvi":2})

const options = [
  { key: dataValues.weather, text: 'Weather Data', value: dataValues.weather },
  { key: dataValues.ndvi, text: 'Ndvi', value: dataValues.ndvi }
]

class TimeSeriesHeader extends React.Component {

  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    

  }

   setDateRange(dateRange) {

    return function (dispatch) {

      dispatch(visualizationActions.setDateRange(dateRange))
    }
  }
  

  handleClick() {
    this.props.clickButtonCallback(true);
  }



  onCloseModal = () => {
    this.props.clickButtonCallback(false);
  };



  onFieldChange = (field) => {
    this.props.onFieldCharacteristicsChange(field);
  }

  onSelect = (value, states) => {
    this.props.setDateRange(value, this.props.fieldDetails.selectedFieldData);
  };

  render() {
    const styles = {   
            position: 'absolute',
            right: 25,
            
            }
    const buttonStyle = {   
              position: 'absolute',
              right: 25,
              top: 70

              }

      ;
      const centerStyle = {
        fontFamily: "sans-serif",
        textAlign: "center"
      };
    return (
    <div >
        <Header as='h3'>Chart of field related data from AgroDataCube</Header>

        <Dropdown
          placeholder='Field data'
          selection
          options={options}
          disabled={this.props.fieldDetails.disabled}
          style={styles}
          value={this.props.fieldDetails.selectedFieldData}
          onChange={(e, { value }) => this.onFieldChange(value)} 
        />
        {/* <Modal open={this.props.weatherChartDetails.isOpen } onClose={this.onCloseModal} center> */}
          {/* <DateRangePicker
              value={this.props.weatherChartDetails.dateRange}
              onSelect={this.onSelect}
              singleDateRange={true}
            /> */}
        
        {/* </Modal> */}


        <Modal center showOverlay={true} show={this.props.weatherChartDetails.isOpen } onClose={this.onCloseModal} >
          <Modal.Header>
              <Modal.Title>
                  Modal title
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DateRangePicker
                      value={this.props.weatherChartDetails.dateRange}
                      onSelect={this.onSelect}
                      singleDateRange={true}
                    />
          </Modal.Body>
</Modal>

        {this.props.fieldDetails.selectedFieldData === dataValues.weather && (<div>
          <div style={centerStyle}>
            <Header as='h4'>Date Range</Header>
            <Header as='h4'>
              {this.props.weatherChartDetails.dateRange.start.format("YYYY-MM-DD")}
              {" - "}
              {this.props.weatherChartDetails.dateRange.end.format("YYYY-MM-DD")}
            </Header>
          </div>
          <Button style={buttonStyle} onClick={this.handleClick.bind(this)} >Open date picker</Button>
        </div>)}

  </div>
    )}
}

export default TimeSeriesHeader;