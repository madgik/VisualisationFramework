import React from 'react';

import update from 'immutability-helper';

import { Form, Dropdown } from 'semantic-ui-react'

import ConfigurationValidators from '../validation/ConfigurationValidators'

class ConfigurationDocumentsForm extends React.Component {

  handleFieldChange = (prop, value) => {
    const data = update(this.props.data, {
      [prop]: { $set: value }
    });

    var { state } = ConfigurationValidators.validateField(prop, data, this.props.validation);

    this.props.onFieldChange(data, state);
  }

  extractFieldSuggestions = (addEmpty) => {

    var showFileName = (this.props.data.dataSources || []).length > 1;

    var suggestions = [];
    (this.props.data.dataSources || []).forEach(dataSource => {
      suggestions.push.apply(suggestions, (dataSource.fields || []).map(x => {
        return {
          text: showFileName ? dataSource.name + ' - ' + x : x,
          value: dataSource.source + '-' + x
        }
      }));
    });

    if (addEmpty) {
      suggestions.unshift({
        text: 'None',
        value: ''
      })
    }

    return suggestions;
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
    </React.Fragment>);
  }
}

export default ConfigurationDocumentsForm;