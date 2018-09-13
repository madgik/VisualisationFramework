import React from 'react'

import { Checkbox } from 'semantic-ui-react'

class ChartRenderer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: this.props.defaultData
    };
  }

  handleItemChange(e, data) {
    var selectedValues = [],
      newData = [];

    this.state.data.forEach(function (item) {
      if (item.value === data.value) {
        item.checked = data.checked;
      }
      if (item.checked) {
        selectedValues.push(item.value);
      }
      newData.push(item);
    });

    this.setState({
      data: newData
    });

    if (this.props.onChange) {
      this.props.onChange(selectedValues);
    }
  }

  // uncheck all items in the list
  reset() {
    var newData = [];
    this.state.data.forEach(function (item) {
      item.checked = false;
      newData.push(item);
    });

    this.setState({ data: newData });
  }

  render() {
    return (
      <div className="checkbox-list">
        {this.state.data.map((item, index) => {
          return (<div key={'chk-' + index}>
            <Checkbox value={item.value} onChange={this.handleItemChange.bind(this)} checked={item.checked} label={item.label} />
          </div>);
        })}
      </div>
    );
  }
}

ChartRenderer.defaultProps = {
  defaultData: []
};

export default ChartRenderer;