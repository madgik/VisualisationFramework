import React from 'react';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import ClickableButton from './ClickableButton';
import { Button } from 'semantic-ui-react';

class Grid extends React.Component {

  handleNewItemClick = () => {
    this.props.onNewItemClick();
  }

  handleEditItemClick = (item) => {
    this.props.onEditItemClick(item);
  }

  render() {
    var finalColumns = [];

    if (this.props.enableEdit) {
      finalColumns.push({
        Header: '',
        Cell: row => (
          <ClickableButton item={row.value} clickButtonCallback={this.handleEditItemClick} />
        ),
        accessor: this.props.idProperty,
        sortable: false,
        width: 50,
        style: {
          textAlign: 'center',
          cursor: 'pointer'
        }
      });
    }

    finalColumns = finalColumns.concat(this.props.columns);

    return (
      <div>
        <div><Button onClick={this.handleNewItemClick} primary>Create</Button></div>
        <ReactTable
          data={this.props.data}
          columns={finalColumns}
          defaultPageSize={10}
          loading={this.props.loading}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default Grid;