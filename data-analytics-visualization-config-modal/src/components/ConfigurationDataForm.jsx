import React from 'react'

import Dropzone from 'react-dropzone'

import { Grid, Header, Divider, List, Icon } from 'semantic-ui-react'

import ConfigurationDataJoinEditor from './ConfigurationDataJoinEditor'
import UploadDataMessage from './UploadDataMessage';
import ConfigurationDataGeoanalyticsSelector from './ConfigurationDataGeoanalyticsSelector';


class ConfigurationDataForm extends React.Component {

  handleFileDropped(files) {
    this.props.onFileDropped(files, this.props.data.type);
  }

  handleRemoveFileClick(index) {
    this.props.onRemoveFileClick(index);
  }

  render() {
    return (<div className="configuration-data-form">
      <ConfigurationDataJoinEditor
        dataSources={this.props.data.dataSources}
        joins={this.props.data.joins}
        onJoinFieldChange={this.props.onJoinFieldChange} 
        />
      <Grid>
        {(this.props.data.dataSources || []).map((item, index) => {
          return <Grid.Column key={item.source} mobile={16} tablet={8} computer={6}>
            <Header>{item.name}</Header>
            <List>
              {(item.fields || []).map((item, index) => {
                return <List.Item key={index}>
                  <List.Content>{item}</List.Content>
                </List.Item>
              })}
            </List>
            <Icon name='remove' className="remove-icon" onClick={() => this.handleRemoveFileClick(index)} />
                
          </Grid.Column>
        })}
      </Grid>
      {(this.props.data.dataSources || []).length > 0 ?
        <Divider /> : ''}
          <div>
            <UploadDataMessage 
              type={this.props.data.type} 
              checked={this.props.geoanalytics.checked}
              onCheckLayerChange={this.props.onCheckLayerChange}
              />
           
            {(!this.props.geoanalytics.checked) ? 
              <Dropzone onDrop={this.handleFileDropped.bind(this)}>
                <p>Drop a file here or click to select one</p>
              </Dropzone>
              : 
              <ConfigurationDataGeoanalyticsSelector
                layers={this.props.geoanalytics.layers}/>
            }
          </div>
    
    </div>);
  }
}

export default ConfigurationDataForm;