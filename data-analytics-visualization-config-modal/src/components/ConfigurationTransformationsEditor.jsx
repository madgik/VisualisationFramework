import React from 'react';

import update from 'immutability-helper';

import { Grid, Segment, Form, Input, Checkbox, Dropdown, Icon } from 'semantic-ui-react'

class ConfigurationTransformationsEditor extends React.Component {

  constructor(props) {
    super(props);
    this.onTransformationAddition();
   }
  onTransformationAddition() {
    if(!this.props.data.transformations){
      this.props.onTransformationAddition({
        transformationLabel: '',
        transformationLabelValue: '',
        transformationColumns: []
      });
    }
  }

  extractFieldSuggestions = () => {
    
    var showFileName = (this.props.dataSources || []).length > 1;

    var suggestions = [];
    (this.props.dataSources || []).forEach(dataSource => {
      suggestions.push.apply(suggestions, (dataSource.fields || []).map(x => {
        return {
          text: showFileName ? dataSource.name + ' - ' + x : x,
          value: dataSource.source + '-' + x
        }
      }));
    });

    return suggestions;
  }

  handleFieldChange = (prop, value) => {
    const transformations = update(this.props.data.transformations, {
      [prop]: { $set: value }
    });
   // var { state } = ConfigurationValidators.validateField(prop, transformations, this.props.validation);

    this.props.onTransformationAddition(transformations);  }

  handleFilterRemoval = () => {
    this.props.onFilterRemoval(this.props.id);
  }

  filterTypeOptions = [
    { text: 'Checkbox List', value: 'CheckBoxList' },
    { text: 'Dropdown', value: 'DropDown' }
  ]

  extractFieldSuggestions = () => {
    
    var showFileName = (this.props.dataSources || []).length > 1;

    var suggestions = [];
    (this.props.dataSources || []).forEach(dataSource => {
      suggestions.push.apply(suggestions, (dataSource.fields || []).map(x => {
        return {
          text: showFileName ? dataSource.name + ' - ' + x : x,
          value: dataSource.source + '-' + x
        }
      }));
    });

    return suggestions;
  }

  render() {
    return (
      <Grid>
        <Grid.Column width="15">
          <Segment>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Label</label>
                <Input placeholder='Label' value={this.props.data.transformations.transformationLabel || ''} 
                    onChange={(e) => this.handleFieldChange('transformationLabel', e.target.value)} />
              </Form.Field>
              <Form.Field>
                <label>Field</label>
                <Input placeholder='Label Value' value={this.props.data.transformations.transformationLabelValue || ''} onChange={(e) => this.handleFieldChange('transformationLabelValue', e.target.value)} />

              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Columns</label>
                <Dropdown
                  placeholder='Select Columns'
                  multiple selection
                  options={this.extractFieldSuggestions()}
                  value={this.props.data.transformations.transformationColumns}
                  onChange={(e, { value }) => this.handleFieldChange('transformationColumns', value)}
                  
                 />
              </Form.Field>
              <Form.Field>
              </Form.Field>
            </Form.Group>
          </Segment>
        </Grid.Column>
       
      </Grid>);
  }
}

export default ConfigurationTransformationsEditor;