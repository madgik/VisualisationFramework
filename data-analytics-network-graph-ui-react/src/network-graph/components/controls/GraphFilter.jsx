import React from 'react';


import { Dropdown } from 'semantic-ui-react'

class GraphFilter extends React.Component {

  handleCheckboxListChange = (selected) => {
    var filterString = this.stringifyFilter(selected);
    this.props.onFilterChange(this.props.filter.field, filterString);
  }

  handleDropDownChange = (e, { value }) => {
    this.props.onFilterChange(this.props.filter.field, value);
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
      <label>Filters</label>
      
        <Dropdown
          placeholder='Select Graph'
          selection
          
          onChange={this.handleDropDownChange} />
    </div>);
  }
}

export default GraphFilter;
