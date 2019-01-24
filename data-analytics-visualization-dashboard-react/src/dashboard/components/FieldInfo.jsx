import React from 'react';

import { Dropdown, Header } from 'semantic-ui-react'
import ChartHeader from './ChartHeader';
import ReactTable from "react-table";
import 'react-table/react-table.css'

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
    const styles = {   
            position: 'absolute',
            right: 25
            }
      ;
      const data = [{
        name: 'Tanner Linsley',
        age: 26
      },{name: 'Tanner Linsley',
      age: 26},
      {name: 'Tanner Linsley',
      age: 26}];

     const  columns=[
        {
          columns: [
            {
              Header: "First Name",
              accessor: "name"
            },
            {
              Header: "Last Name",
              accessor: "age"
            }
          ]
        }
    ];

    return (
    <div className='ui clearing '>
        <ChartHeader  title={"Selected Field Info"}></ChartHeader>
        <br/> 
        <ReactTable
                data={data} 
                columns={columns}
                showPagination={false}
                defaultPageSize={5}

  />
  </div>
    );
  }
}

export default FieldInfo;