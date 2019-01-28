import React from 'react';

import { Dropdown, Header } from 'semantic-ui-react'
import ChartHeader from './ChartHeader';
import ReactTable from "react-table";
import 'react-table/react-table.css'

class FieldInfo extends React.Component {

  constructor(props) {
    super(props);
    
    let x = this.props.fieldDetails.columns;
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.clickButtonCallback(this.props.item);
  }

  // getColumns() {
    
  //   if(this.props.fieldDetails && this.props.fieldDetails.data){
  //     this.props.fieldDetails.data.columns.map(key => {
  //       console.log(key);
  //     });
  //   }
  //   else{
  //       return  [
  //       {
  //         columns: [
  //           {
  //             Header: "First Name",
  //             accessor: "name"
  //           },
  //           {
  //             Header: "Last Name",
  //             accessor: "age"
  //           }
  //         ]
  //       }
  //   ];
  //   }
  // }

  render() {
    return (
    <div className='ui clearing '>
        <ChartHeader  title={"Selected Field Info"}></ChartHeader>
        <br/> 
        <ReactTable
                data={this.props.fieldDetailsData} 
                columns={this.props.fieldDetails.columns}
                showPagination={false}
                defaultPageSize={5}
        />
  </div>
    );
  }
}

export default FieldInfo;