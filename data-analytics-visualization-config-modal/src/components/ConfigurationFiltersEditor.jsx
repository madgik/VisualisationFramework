import React from 'react';

import { Grid, Icon } from 'semantic-ui-react'

import ConfigurationFilterEditor from './ConfigurationFilterEditor'

class ConfigurationFiltersEditor extends React.Component {

  handleFilterAddition() {
    this.props.onFilterAddition({
      label: '',
      field: '',
      required: false,
      type: 'CheckBoxList'
    });
  }

  render() {
    return (<div className="configuration-filters-editor">
      {(this.props.filters || []).map((item, index) => {
        return <ConfigurationFilterEditor
          key={index}
          id={index}
          filter={item}
          dataSources={this.props.dataSources}
          onFilterRemoval={this.props.onFilterRemoval}
          onFieldChange={this.props.onFilterFieldChange} />;
      })}
      <Grid>
        <Grid.Column width="15" className="add-filter-container">
          <Icon name='add circle' size='big' link onClick={this.handleFilterAddition.bind(this)} />
        </Grid.Column>
        <Grid.Column width="1">
        </Grid.Column>
      </Grid>
    </div>);
  }
}

export default ConfigurationFiltersEditor;