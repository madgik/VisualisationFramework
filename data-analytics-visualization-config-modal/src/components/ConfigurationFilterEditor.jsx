import React from 'react';

import update from 'immutability-helper';

import TransformationFiltering from '../utilities/TransformationsFiltering';

import { Grid, Segment, Form, Input, Checkbox, Dropdown, Icon } from 'semantic-ui-react'

import ConfigurationValidators from '../validation/ConfigurationValidators'


class ConfigurationFilterEditor extends React.Component {

  handleFieldChange = (field, value, e) => {

    const filter = update(this.props.filter, {
      [field]: { $set: value }
    });
    this.props.onFieldChange(this.props.id, filter);
    // const data = update(this.props.data, {
    //   [prop]: { $set: value }
    // });
    if (field === "label") {
      field = "filterLabel"
    }
    else if (field === "field") {
      field = "filterField"
    }

    var { state } = ConfigurationValidators.validateField(field, filter, this.props.validation, this.props.configOptions);
    
     this.props.onFieldChange(this.props.data, state);
  }

  handleFilterRemoval = () => {
    this.props.onFilterRemoval(this.props.id);
  }

  filterTypeOptions = [
    { text: 'Checkbox List', value: 'CheckBoxList' },
    { text: 'Dropdown', value: 'DropDown' },
    { text: 'Slider', value: 'Slider' }

  ]

  extractFieldSuggestions = () => {

    var suggestions = TransformationFiltering.getSuggestions(this.props.transformations,this.props.dataSources);

    return suggestions;
  }

  render() {
    return (
      <Grid>
        <Grid.Column width="15">
          <Segment>
            <Form.Group widths='equal'>
              <Form.Field required error={this.props.validation.filterLabel.touched && !this.props.validation.filterLabel.valid}>
                <label>Label</label>
                <Input placeholder='Label' value={this.props.filter.label} onChange={(e) => this.handleFieldChange('label', e.target.value)} />
              </Form.Field>
              <Form.Field required  error={this.props.validation.filterField.touched && !this.props.validation.filterField.valid}>
                <label>Field</label>
                <Dropdown
                  placeholder='Field'
                  selection
                  options={this.extractFieldSuggestions()}
                  value={this.props.filter.field}
                  onChange={(e, { value }) => this.handleFieldChange('field', value)} />
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field required>
                <label>Type</label>
                <Dropdown
                  placeholder='Select Filter Type'
                  selection
                  options={this.filterTypeOptions}
                  value={this.props.filter.type}
                  onChange={(e, { value }) => this.handleFieldChange('type', value)} />
              </Form.Field>
              <Form.Field>
                <Checkbox label='Required' checked={this.props.filter.required} onChange={(e, { checked }) => this.handleFieldChange('required', checked)} />
              </Form.Field>
            </Form.Group>
          </Segment>
        </Grid.Column>
        <Grid.Column width="1" className="remove-filter-container">
          <Icon name='minus circle' size='big' link onClick={this.handleFilterRemoval} />
        </Grid.Column>
      </Grid>);
  }
}

export default ConfigurationFilterEditor;