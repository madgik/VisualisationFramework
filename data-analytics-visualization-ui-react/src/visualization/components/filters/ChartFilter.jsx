import React from 'react';

import CheckBoxList from '../generic/CheckBoxList'

import { Dropdown } from 'semantic-ui-react'
import Slider from '@material-ui/lab/Slider';

class ChartFilter extends React.Component {

  handleCheckboxListChange = (selected) => {
    var filterString = this.stringifyFilter(selected);
    this.props.onFilterChange(this.props.filter.field, filterString);
  }

  handleDropDownChange = (e, { value }) => {
    this.props.onFilterChange(this.props.filter.field, value);
  }

  handleSliderChange = (event, value) => {
    this.props.onSliderValueChange(value);
    console.log("on slider:: " + value);
    this.props.onFilterChange(this.props.filter.field, this.props.filter.options[value]);
  }

  extractCheckBoxOptions(options) {
    var cOptions = [];
    for (var i = 0; i < options.length; i++) {
      var option = options[i];
      cOptions.push({
        value: option,
        label: option,
        checked: false
      });
    }
    return cOptions;
  }

  extractDropDownOptions(options) {
    return options.map((option) => {
      return {
        text: option,
        value: option
      }
    });
  }

  stringifyFilter(selected) {
    var stringified = '';
    for (var j = 0; j < selected.length; j++) {
      if (j > 0) stringified += ';';
      stringified += selected[j];
    }
    return stringified;
  }

  render() {
    return (<div>
      <label>{this.props.filter.label}</label>
      {this.props.filter.type === 'CheckBoxList' &&
        <CheckBoxList
          defaultData={this.extractCheckBoxOptions(this.props.filter.options)}
          onChange={this.handleCheckboxListChange} /> 
      }
      {this.props.filter.type === 'DropDown' &&
        <Dropdown
          placeholder='Select Chart'
          selection
          options={this.extractDropDownOptions(this.props.filter.options)}
          value={this.props.filter.value}
          onChange={this.handleDropDownChange} />
      }
      {this.props.filter.type === 'Slider' &&

        <Slider 
          value={this.props.sliderValue}
          min={0}
          max={this.props.filter.options.length}
          step={1}
          aria-labelledby="label"
          onChange={this.handleSliderChange}
        ></Slider>
      } 

    </div>);
  }
}

export default ChartFilter;
