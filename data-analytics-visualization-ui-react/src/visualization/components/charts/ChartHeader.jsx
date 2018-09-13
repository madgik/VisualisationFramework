import React from 'react';

import ChartSelector from './ChartSelector';
import ChartTypeSelector from './ChartTypeSelector';
import ChartPrinter from './ChartPrinter'

import { Popup, Icon, Grid } from 'semantic-ui-react'

class ChartHeader extends React.Component {
  render() {
    return (
      <Grid className="chart-header">
        <Grid.Row>
          <Grid.Column width={4}>
            <div className="left-controls">
              <ChartSelector
                selected={this.props.chart}
                charts={this.props.availableCharts}
                onChange={this.props.onChartSelectionChange} 
                dropDownStyle={{zIndex: '1000'}} />
              <ChartPrinter {...this.props} />
            </div>
          </Grid.Column>
          <Grid.Column width={8}>
            <h2>
              {this.props.label && this.props.label.length ? this.props.label + ' ' : 'Chart'}
              {this.props.description && this.props.description.length ?
                <Popup
                  trigger={<Icon name='info' color='blue' size='small' circular />}
                  content={this.props.description}
                  position='bottom right' /> : ''}
            </h2>
          </Grid.Column>
          <Grid.Column width={4}>
            <ChartTypeSelector
              selected={this.props.type}
              availableTypes={this.props.availableTypes}
              onChange={this.props.onChartTypeSelectionChange} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default ChartHeader;
