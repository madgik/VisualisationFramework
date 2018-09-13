import React from 'react'

import { Grid, Segment, Form } from 'semantic-ui-react'

import ConfigurationGeneralForm from './ConfigurationGeneralForm'
import ConfigurationDataForm from './ConfigurationDataForm'
import ConfigurationFormMenu from './ConfigurationFormMenu'
import ConfigurationFiltersEditor from './ConfigurationFiltersEditor'
import ConfigurationDocumentsForm from './ConfigurationDocumentsForm';

class ConfigurationForm extends React.Component {

  showChartFields = () => {
    return !(this.props.data.type === 'Graph' || this.props.data.type === 'MindMap');
  }

  isGeneralMenuItemSelected() {
    return this.props.menuState.activeItem === 'general';
  }

  isDataMenuItemSelected() {
    return this.props.menuState.activeItem === 'data';
  }

  isFiltersMenuItemSelected() {
    return this.props.menuState.activeItem === 'filters';
  }

  isDocumentsMenuItemSelected() {
    return this.props.menuState.activeItem === 'documents';
  }

  render() {
    return (<Grid>
      <Grid.Column width={3}>
        <ConfigurationFormMenu activeItem={this.props.menuState.activeItem} onMenuItemClick={this.props.onMenuItemClick} />
      </Grid.Column>
      <Grid.Column stretched width={13}>
        <Segment basic>
          <Form>
            {this.isGeneralMenuItemSelected() ?
              <ConfigurationGeneralForm
                data={this.props.data}
                validation={this.props.validation}
                onFieldChange={this.props.onFieldChange} /> : ''}
            {this.isDataMenuItemSelected() ?
              <ConfigurationDataForm
                data={this.props.data}
                onFileDropped={this.props.onFileDropped}
                onRemoveFileClick={this.props.onRemoveFileClick}
                onJoinFieldChange={this.props.onJoinFieldChange} /> : ''}
            {this.showChartFields() && this.isFiltersMenuItemSelected() ?
              <ConfigurationFiltersEditor
                filters={this.props.data.filters}
                dataSources={this.props.data.dataSources}
                onFilterAddition={this.props.onFilterAddition}
                onFilterFieldChange={this.props.onFilterFieldChange}
                onFilterRemoval={this.props.onFilterRemoval} /> : ''}
            {this.showChartFields() && this.isDocumentsMenuItemSelected() ?
              <ConfigurationDocumentsForm
                data={this.props.data}
                validation={this.props.validation}
                onFieldChange={this.props.onFieldChange} /> : ''}
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>);
  }
}

export default ConfigurationForm;
