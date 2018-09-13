import React from 'react';

import ChartFilter from './ChartFilter'

class FiltersRenderer extends React.Component {

  render() {
    return (
      <div className="filters-renderer" >
        {(this.props.filters || []).map((item, index) => {
          return <ChartFilter
            key={index}
            filter={item}
            onFilterChange={this.props.onFilterChange} />;
        })}
      </div>
    );
  }
}

FiltersRenderer.defaultProps = {
  filters: []
}

export default FiltersRenderer;
