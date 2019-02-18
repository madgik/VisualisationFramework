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

  render() {
    return (
    <div className='ui clearing '>
        <ChartHeaderContainer  title={"Selected Field Info"}></ChartHeaderContainer>
        <br/> 
        <ReactTable
                data={this.props.fieldDetailsData} 
                columns={this.props.fieldDetails.columns}
                showPagination={true}
                defaultPageSize={8}
                resizable={true}
                showPageSizeOptions= {false}

        />
  </div>
    );
  }
}

export default FieldInfo;