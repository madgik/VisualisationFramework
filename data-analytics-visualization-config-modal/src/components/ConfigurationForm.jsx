import React from 'react'

import { Grid, Segment, Form } from 'semantic-ui-react'

import ConfigurationGeneralForm from './ConfigurationGeneralForm'
import ConfigurationDataForm from './ConfigurationDataForm'
import ConfigurationFormMenu from './ConfigurationFormMenu'
import ConfigurationFiltersEditor from './ConfigurationFiltersEditor'
import ConfigurationDocumentsForm from './ConfigurationDocumentsForm';
import ConfigurationTransformationsEditor from './ConfigurationTransformationsEditor';


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

  isTransformationsMenuItemSelected() {
    return this.props.menuState.activeItem === 'transformations';
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
                isNew={this.props.isNew}
                data={this.props.data}
                validation={this.props.validation}
                configurations={this.props.configurations}
                configOptions={this.props.configOptions}
                onFieldChange={this.props.onFieldChange}
                selectedConfiguration={this.props.selectedConfiguration}
                setSelectedConfiguration={this.props.setSelectedConfiguration}
                showConfigurationData={this.props.showConfigurationData}
                setConfigurationData={this.props.setConfigurationData}
              /> : ''}
            {this.isDataMenuItemSelected() ?
              <ConfigurationDataForm
                data={this.props.data}
                geoanalytics={this.props.geoanalytics}
                onFileDropped={this.props.onFileDropped}
                onRemoveFileClick={this.props.onRemoveFileClick}
                onJoinFieldChange={this.props.onJoinFieldChange}
                setDelimiter={this.props.setDelimiter}
                delimiter={this.props.delimiter}
                loading={this.props.loading}
                setCommentCharacter={this.props.setCommentCharacter}
                commentCharacter={this.props.commentCharacter}
                onCheckLayerChange={this.props.onCheckLayerChange} /> : ''}
            {this.showChartFields() && this.isFiltersMenuItemSelected() ?
              <ConfigurationFiltersEditor
                validation={this.props.validation}
                transformations={this.props.data.transformations}
                configOptions={this.props.configOptions}
                filters={this.props.data.filters}
                dataSources={this.props.data.dataSources}
                onFilterAddition={this.props.onFilterAddition}
                onFilterFieldChange={this.props.onFilterFieldChange}
                onFilterRemoval={this.props.onFilterRemoval} /> : ''}
            {this.isTransformationsMenuItemSelected() ?
              <ConfigurationTransformationsEditor
                data={this.props.data}
                validation={this.props.validation}
                dataSources={this.props.data.dataSources}
                onTransformationAddition={this.props.onTransformationAddition}
                onFieldChange={this.props.onFieldChange}
                onJoinFieldChange={this.props.onJoinFieldChange} /> : ''}
            {this.showChartFields() && this.isDocumentsMenuItemSelected() ?
              <ConfigurationDocumentsForm
                configOptions={this.props.configOptions}
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
