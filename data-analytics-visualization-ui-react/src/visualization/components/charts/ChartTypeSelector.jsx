import React from 'react';

import { Dropdown } from 'semantic-ui-react'

class ChartTypeSelector extends React.Component {

  extractOptions(types) {
    return types.map((type) => {
      return {
        text: type,
        value: type
      }
    });
  }

  render() {
    var types = this.props.availableTypes || [];
    if (types.length === 0) {
      return '';
    }
    return (
      <div>
        <label>Chart Type: </label>
        <Dropdown
          placeholder='Select Chart Type'
          selection
          options={this.extractOptions(types)}
          value={this.props.selected}
          onChange={this.props.onChange} />
      </div>
    );
  }
}

ChartTypeSelector.defaultProps = {
  type: '',
  availableTypes: []
};

export default ChartTypeSelector;
