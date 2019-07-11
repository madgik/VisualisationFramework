import React from 'react'

import Dropzone from 'react-dropzone'

import { Grid, Header, Divider, List, Icon } from 'semantic-ui-react'
import { Input, Form } from 'semantic-ui-react'

import ConfigurationDataJoinEditor from './ConfigurationDataJoinEditor'
import UploadDataMessage from './UploadDataMessage';
import ConfigurationDataGeoanalyticsSelector from './ConfigurationDataGeoanalyticsSelector';


class ConfigurationDataForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleDelimiterChange = this.handleDelimiterChange.bind(this);
  }

  handleDelimiterChange(e) {
    console.log("change"+e.target.value);
    this.props.setDelimiter(e.target.value);
  }

  handleFileDropped(files) {
    var type = files[0].name.substring(files[0].name.lastIndexOf('.') + 1, files[0].name.length) || files[0].name;

    if (type === "json") {
      type = "JSON";
    }
    else {
      type = "Records";
    }
    console.log("change"+this.props.delimiter);

    this.props.onFileDropped(files, type, this.props.delimiter);
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
        {/* {(this.type != undefined && this.type == "csv") && */}
        <Grid columns={5} className="delimiter" style={{ marginTop: 10 , marginBottom: 8 , padding: 10}}>
            <h4>CSV delimiter:</h4>
          {/* </Grid.Column>
          <Grid.Column> */}
            <Input
              maxLength="1"
              className="delimeter-input"
              placeholder="ex: , . : - ;"
              onChange={this.handleDelimiterChange}
              style={{ width: 90, top: -5 }}
            
            />
        </Grid>
        {(!this.props.geoanalytics.checked) ?
          <Dropzone onDrop={this.handleFileDropped.bind(this)}>
            <p>Drop a file here or click to select one</p>
          </Dropzone>
          :
          <ConfigurationDataGeoanalyticsSelector
            layers={this.props.geoanalytics.layers} />
        }
      </div>

    </div>);
  }
}

export default ConfigurationDataForm;