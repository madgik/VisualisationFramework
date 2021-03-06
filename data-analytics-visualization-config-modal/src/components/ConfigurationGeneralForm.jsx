import React from 'react';

import update from 'immutability-helper';

import { Form, Input, Dropdown } from 'semantic-ui-react'

import ConfigurationValidators from '../validation/ConfigurationValidators'

import TransformationFiltering from '../utilities/TransformationsFiltering';

import SelectSearch from 'react-select-search';

import './SearchBar.css';


class ConfigurationGeneralForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleConfigurationChange = this.handleConfigurationChange.bind(this);

  }

  handleConfigurationChange = (e) => {

    var data = this.props.configurations.find(function (element) {
      return element.id == e.value;
    });
    if (data.id != undefined)
      delete data.id;
    if (data.dataSources != undefined && data.xAxis != undefined && data.yAxis != undefined) {
      delete data.dataSources;
      delete data.xAxis;
      delete data.yAxis;
    }
    data.label = data.label + "-copy";

    this.props.setSelectedConfiguration(data);
    this.props.setConfigurationData(data);

    this.handleFieldChange("label", data.label)
    var { state } = ConfigurationValidators.validateField('xAxis', data, this.props.validation, this.props.configOptions);
    var { state } = ConfigurationValidators.validateField('yAxis', data, this.props.validation, this.props.configOptions);

  }



  handleFieldChange = (prop, value) => {

    const data = update(this.props.data, {
      [prop]: { $set: value }
    });

    var { state } = ConfigurationValidators.validateField(prop, data, this.props.validation, this.props.configOptions);

    this.props.onFieldChange(data, state);
  }

  chartTypeOptions = [
    { text: 'Spline', value: 'Spline' },
    { text: 'Scatter', value: 'Scatter' },
    { text: 'Bar', value: 'Bar' },
    { text: 'Line', value: 'Line' },
    { text: 'Step', value: 'Step' },
    { text: 'Pie', value: 'Pie' },
    { text: 'Doughnut', value: 'Doughnut' },
    { text: 'Polar', value: 'Polar' },
    { text: '3D Scatter', value: 'ThreeD' },
    { text: 'Graph', value: 'Graph' },
    { text: 'MindMap', value: 'MindMap' },
    { text: 'Tree', value: 'Tree' },
    { text: 'Map', value: 'Map' },
    { text: 'World Wind Map', value: 'WorldWindMap' },
    { text: 'Table', value: 'Table' },
    { text: 'HeatMap', value: 'HeatMap' }

  ]

  showAvailableTypes() {
    var type = this.props.data.type;
    return type === 'Spline' || type === 'Scatter' || type === 'Line' || type === 'Step';
  }

  availableChartTypeOptions = [
    { text: 'Spline', value: 'Spline' },
    { text: 'Scatter', value: 'Scatter' },
    { text: 'Line', value: 'Line' },
    { text: 'Step', value: 'Step' }
  ]

  extractFieldSuggestions = (addEmpty) => {

    var suggestions = TransformationFiltering.getSuggestions(this.props.data.transformations, this.props.data.dataSources);

    if (addEmpty) {
      suggestions.unshift({
        text: 'None',
        value: ''
      })
    }

    return suggestions;
  }

  showLineChartFields = () => {
    return (this.props.data.type === 'Spline' ||
      this.props.data.type === 'Scatter' ||
      this.props.data.type === 'Line' ||
      this.props.data.type === 'Step' ||
      this.props.data.type === 'ThreeD' ||
      this.props.data.type === 'HeatMap' ||
      this.props.data.type === 'Bar');
  }

  showPieChartFields = () => {
    return (this.props.data.type === 'Pie' ||
      this.props.data.type === 'Doughnut' ||
      this.props.data.type === 'Polar');
  }

  showGroupByField = () => {
    return (this.props.data.type !== 'ThreeD'
      && this.props.data.type !== 'HeatMap');
  }

  showZAxisField = () => {
    return (this.props.data.type === 'ThreeD' ||
      this.props.data.type === 'HeatMap');
  }

  showColorChartFields = () => {
    return (this.props.data.type === 'Spline' ||
      this.props.data.type === 'Scatter' ||
      this.props.data.type === 'Line' ||
      this.props.data.type === 'Step' ||
      this.props.data.type === 'Bar' ||
      this.props.data.type === 'Pie' ||
      this.props.data.type === 'Doughnut' ||
      this.props.data.type === 'Polar');
  }


  render() {
    return (<React.Fragment>
      {(this.props.isNew == true) &&
        

          <Form.Field error={this.props.validation.label.touched && !this.props.validation.label.valid}>
            <label>Create New or Select From History</label>

            <SelectSearch
              search={true}
              mode="input"
              options={this.props.configOptions}
              value={this.props.data.label || ""}
              name="configuration"
              placeholder="Select a saved configuration"
              onChange={(e) => this.handleConfigurationChange(e)}
            />

          </Form.Field>
      }
      {(this.props.selectedConfiguration != [] && (this.props.isNew == true)) ?
        <Form.Field>
          <label>Please upload new data file before save</label>
        </Form.Field> : ''
      }
      <Form.Field required error={this.props.validation.label.touched && !this.props.validation.label.valid}>
        <label>Label</label>
        <Input
          placeholder='Label'
          value={this.props.data.label || ''}
          onChange={(e) => this.handleFieldChange('label', e.target.value)} />
      </Form.Field>
      <Form.Field>
        <label>Description</label>
        <Input
          placeholder='Description'
          value={this.props.data.description || ''}
          onChange={(e) => this.handleFieldChange('description', e.target.value)} />
      </Form.Field>
      <Form.Field error={this.props.validation.type.touched && !this.props.validation.type.valid}>
        <label>Type</label>
        <Dropdown
          placeholder='Select Chart Type'
          selection
          options={this.chartTypeOptions}
          value={this.props.data.type}
          onChange={(e, { value }) => this.handleFieldChange('type', value)} />
      </Form.Field>
      {this.showLineChartFields() ?
        <React.Fragment>
          {(this.showAvailableTypes()) ?
            <Form.Field>
              <label>Available Types</label>
              <Dropdown
                placeholder='Select other chart types that will be available as options'
                multiple selection
                options={this.availableChartTypeOptions}
                value={this.props.data.availableTypes || []}
                onChange={(e, { value }) => this.handleFieldChange('availableTypes', value)} />
            </Form.Field> : ''}
          {(this.showGroupByField()) ?
            <Form.Field>
              <label>Group By</label>
              <Dropdown
                placeholder='Select Group By Field'
                selection
                options={this.extractFieldSuggestions(true)}
                value={this.props.data.groupBy}
                onChange={(e, { value }) => this.handleFieldChange('groupBy', value)} />
            </Form.Field> : ''}
          <Form.Field required error={this.props.validation.xAxis.touched && !this.props.validation.xAxis.valid}>
            <label>X Axis</label>
            <Dropdown
              placeholder='Select X Axis Field'
              selection
              options={this.extractFieldSuggestions(false)}
              value={this.props.data.xAxis}
              onChange={(e, { value }) => this.handleFieldChange('xAxis', value)} />
          </Form.Field>
          <Form.Field required error={this.props.validation.xAxisLabel.touched && !this.props.validation.xAxisLabel.valid}>
            <label>X Axis Label</label>
            <Input placeholder='X Axis Label' value={this.props.data.xAxisLabel || ''} onChange={(e) => this.handleFieldChange('xAxisLabel', e.target.value)} />
          </Form.Field>
          <Form.Field required error={this.props.validation.yAxis.touched && !this.props.validation.yAxis.valid}>
            <label>Y Axis</label>
            <Dropdown
              placeholder='Select Y Axis Field'
              selection
              options={this.extractFieldSuggestions(false)}
              value={this.props.data.yAxis}
              onChange={(e, { value }) => this.handleFieldChange('yAxis', value)} />
          </Form.Field>
          <Form.Field required error={this.props.validation.yAxisLabel.touched && !this.props.validation.yAxisLabel.valid}>
            <label>Y Axis Label</label>
            <Input placeholder='Y Axis Label' value={this.props.data.yAxisLabel || ''} onChange={(e) => this.handleFieldChange('yAxisLabel', e.target.value)} />
          </Form.Field>
          {(this.showZAxisField()) ?
            <React.Fragment>
              <Form.Field required error={this.props.validation.zAxis.touched && !this.props.validation.zAxis.valid}>
                <label>Z Axis</label>
                <Dropdown
                  placeholder='Select Z Axis Field'
                  selection
                  options={this.extractFieldSuggestions(false)}
                  value={this.props.data.zAxis}
                  onChange={(e, { value }) => this.handleFieldChange('zAxis', value)} />
              </Form.Field>
              <Form.Field required error={this.props.validation.zAxisLabel.touched && !this.props.validation.zAxisLabel.valid}>
                <label>Z Axis Label</label>
                <Input placeholder='Z Axis Label' value={this.props.data.zAxisLabel || ''} onChange={(e) => this.handleFieldChange('zAxisLabel', e.target.value)} />
              </Form.Field>
            </React.Fragment> : ''}
        </React.Fragment> : ''}
      {this.showPieChartFields() ?
        <React.Fragment>
          <Form.Field required error={this.props.validation.labelField.touched && !this.props.validation.labelField.valid}>
            <label>Label Field</label>
            <Dropdown
              placeholder='Select Label Field'
              selection
              options={this.extractFieldSuggestions(false)}
              value={this.props.data.labelField}
              onChange={(e, { value }) => this.handleFieldChange('labelField', value)} />
          </Form.Field>
          <Form.Field required error={this.props.validation.valueField.touched && !this.props.validation.valueField.valid}>
            <label>Value Field</label>
            <Dropdown
              placeholder='Select Value Field'
              selection
              options={this.extractFieldSuggestions(false)}
              value={this.props.data.valueField}
              onChange={(e, { value }) => this.handleFieldChange('valueField', value)} />
          </Form.Field>
        </React.Fragment> : ''}
      {this.showColorChartFields() ?
        <Form.Field>
          <label>Color</label>
          <Dropdown
            placeholder='Select Color Field'
            selection
            options={this.extractFieldSuggestions(true)}
            value={this.props.data.colorField}
            onChange={(e, { value }) => this.handleFieldChange('colorField', value)} />
        </Form.Field> : ''}
    </React.Fragment>);
  }
}

export default ConfigurationGeneralForm;