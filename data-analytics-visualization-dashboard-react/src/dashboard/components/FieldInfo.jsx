import React from 'react';

import ReactTable from "react-table";
import 'react-table/react-table.css'
import ChartHeaderContainer from '../containers/ChartHeaderContainer';
import {  List } from 'semantic-ui-react'

class FieldInfo extends React.Component {

  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.clickButtonCallback(this.props.item);
  }

  render() {
    return (
      <div className='ui clearing '>
        <ChartHeaderContainer title={"Field information"}></ChartHeaderContainer>
        <br />

        {this.props.selectedProperty !== 3 && (<ReactTable
          data={this.props.fieldDetailsData}
          columns={this.props.fieldDetails.columns}
          showPagination={true}
          defaultPageSize={8}
          resizable={true}
          showPageSizeOptions={false}

        />)}

        {this.props.selectedProperty === 3 && (<ReactTable
          data={this.props.soilDetailsData}
          columns={this.props.soilDetails.columns}
          showPagination={true}
          defaultPageSize={8}
          resizable={true}
          className="-striped -highlight"
          showPageSizeOptions={false}
          SubComponent={row => {
            return (

              <div style={{ padding: "20px" }}>

                <List divided relaxed>
                <List.Item>
                    <List.Content>
                      Entity id : {row.original.soil.entityid}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      Soil Code : {row.original.soil.soilcode}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      Soil name : {row.original.soil.soilname}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      Soil type : {row.original.soil.soiltype}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      Area :   {row.original.soil.area}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      Perimeter : {row.original.soil.perimeter}
                    </List.Content>
                  </List.Item>
                </List>

              </div>
            );
          }}
        />)}
      </div>
    );
  }
}

export default FieldInfo;