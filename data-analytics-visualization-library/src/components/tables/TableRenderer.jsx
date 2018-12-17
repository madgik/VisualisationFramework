import React from 'react';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

class TableRenderer extends React.Component {
  render() {
    var columns = this.props.visualization.tabularData.fields.map((item, index) => {
      return {
        Header: item.split(/-(.+)/)[1],
        accessor: "" + index
      }
    });

    return (
      <ReactTable
        data={this.props.visualization.tabularData.data}
        columns={columns}
        defaultPageSize={10}
        className="-striped -highlight"
      />
    )
  }
}

export default TableRenderer;
