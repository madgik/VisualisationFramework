import React from 'react';

import update from 'immutability-helper';

import { Form, Dropdown } from 'semantic-ui-react'

import ConfigurationValidators from '../validation/ConfigurationValidators'

import TransformationFiltering from '../utilities/TransformationsFiltering';

import InputNumber from 'rc-input-number';



class ConfigurationDocumentsForm extends React.Component {

  handleFieldChange = (prop, value) => {
    const data = update(this.props.data, {
      [prop]: { $set: value }
    });

    var { state } = ConfigurationValidators.validateField(prop, data, this.props.validation, this.props.configOptions);

    this.props.onFieldChange(data, state);
  }

  extractFieldSuggestions = (addEmpty) => {

    var suggestions = TransformationFiltering.getSuggestions(this.props.data.transformations,this.props.data.dataSources);

    if (addEmpty) {
      suggestions.unshift({
        text: 'None',
        value: ''
      })
    }

    return suggestions;
  }

  onChange = (v) => {
    this.handleFieldChange('activeDocuments', v)
  }

  render() {
    return (<React.Fragment>
      <Form.Field>
        <label>Document</label>
        <Dropdown
          placeholder='Select Document Field'
          selection
          options={this.extractFieldSuggestions(true)}
          value={this.props.data.documentField}
          onChange={(e, { value }) => this.handleFieldChange('documentField', value)} />

      </Form.Field>

      <Form.Field>
        <label>Active Documents</label>
        <InputNumber
          min={1}
          max={10}
          step={1}
          value={this.props.data.activeDocuments}
          style={{ width: 100 }}
          onChange={this.onChange}
        />
      </Form.Field>


    </React.Fragment>);
  }
}

export default ConfigurationDocumentsForm;