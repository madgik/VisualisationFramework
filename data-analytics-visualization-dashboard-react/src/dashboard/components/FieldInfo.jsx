import React from 'react';

import ReactTable from "react-table";
import 'react-table/react-table.css'
import ChartHeaderContainer from '../containers/ChartHeaderContainer';

class FieldInfo extends React.Component {

  constructor(props) {
    super(props);
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
        <ChartHeaderContainer  title={"Selected Field Info"}></ChartHeaderContainer>
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