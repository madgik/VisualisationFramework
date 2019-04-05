import React from 'react';

import { connect } from 'react-redux'

import { configItemActions } from '../../actions'

import Grid from './Grid';
import { Message } from 'semantic-ui-react'

class CongigurationsGrid extends React.Component {

  columns = [{
    Header: 'Label',
    accessor: 'label'
  }, {
    Header: 'Type',
    accessor: 'type',
  }]

  render() {
    return (
      <div>
        {this.props.errorMessage && this.props.errorMessage.length > 0 ?
          <Message negative>
            <Message.Header>{this.props.errorMessage}</Message.Header>
          </Message> : ''}
        <Grid
          idProperty={'id'}
          enableEdit={true}
          onNewItemClick={this.props.onNewItemClick}
          onEditItemClick={this.props.onEditItemClick}
          data={this.props.data}
          loading={this.props.loading}
          columns={this.columns}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    data,
    loading,
    errorMessage,
    enableChartCreation
  } = state.configList

  return {
    data,
    loading,
    errorMessage,
    enableChartCreation
  }
}

const mapDispatchToProps = dispatch => ({
  onNewItemClick: () => dispatch(configItemActions.createConfiguration()),
  onEditItemClick: (id) => dispatch(configItemActions.editConfiguration(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CongigurationsGrid)
