import React from 'react';

import { Dropdown } from 'semantic-ui-react'

class ChartSelector extends React.Component {

  extractOptions(charts) {
    return charts.map((chart) => {
      return {
        text: chart.label,
        value: chart.id
      }
    });
  }

  render() {
    var charts = this.props.charts || [];
    if (charts.length === 0) {
      return '';
    }
    return (
      <div className="chart-selector">
        <Dropdown
          placeholder='Select Chart'
          selection
          options={this.extractOptions(charts)}
          value={this.props.selected}
          onChange={this.props.onChange} 
          style={this.props.dropDownStyle} />
      </div>
    );
  }
}

ChartSelector.defaultProps = {
  type: '',
  availableTypes: []
};

export default ChartSelector;
