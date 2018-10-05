import React from 'react';

import update from 'immutability-helper';

import { Grid, Segment, Form, Input, Dropdown, Icon } from 'semantic-ui-react'

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

  handleTransformationRemoval = () => {
    this.props.onTransformationAddition({
      transformationLabel: '',
      transformationLabelValue: '',
      transformationColumns: []
    });
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
        <label style={{fontWeight: 'bold'}}>Unpivot</label>

          <Segment>

            <Form.Group widths='equal'>
              <Form.Field error={this.props.validation.transformationLabel.touched && !this.props.validation.transformationLabel.valid}>
                <label>Attribute Column</label>
                <Input placeholder='Attribute Column Label' value={this.props.data.transformations.transformationLabel || ''} 
                    onChange={(e) => this.handleFieldChange('transformationLabel', e.target.value) } />
              </Form.Field>
              <Form.Field error={this.props.validation.transformationLabelValue.touched && !this.props.validation.transformationLabelValue.valid}>
                <label>Value Column</label>
                <Input placeholder='Value Column Label' value={this.props.data.transformations.transformationLabelValue || ''} onChange={(e) => this.handleFieldChange('transformationLabelValue', e.target.value)} />

              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field error={this.props.validation.transformationColumns.touched && !this.props.validation.transformationColumns.valid}>
                <label>Columns</label>
                <Dropdown
                  placeholder='Select the columns to unpivot'
                  multiple selection
                  options={this.extractFieldSuggestions()}
                  value={this.props.data.transformations.transformationColumns}
                  onChange={(e, { value }) => this.handleFieldChange('transformationColumns', value)}
                  
                 />
              </Form.Field>
            
            </Form.Group>
            
          </Segment>
         
        </Grid.Column>
        <Grid.Column width="1" className="remove-filter-container">
          <Icon name='minus circle' size='big' link onClick={this.handleTransformationRemoval} />
        </Grid.Column>
       
      </Grid>);
  }
}

export default ConfigurationTransformationsEditor;