import React from 'react'

import Dropzone from 'react-dropzone'

import { Grid, Header, Divider, List, Icon } from 'semantic-ui-react'
import { Input, Form } from 'semantic-ui-react'

import ConfigurationDataJoinEditor from './ConfigurationDataJoinEditor'
import UploadDataMessage from './UploadDataMessage';
import ConfigurationDataGeoanalyticsSelector from './ConfigurationDataGeoanalyticsSelector';
import { css } from '@emotion/core';
import Center from 'react-center';


// Another way to import. This is recommended to reduce bundle size
import SyncLoader from 'react-spinners/SyncLoader';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class ConfigurationDataForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleDelimiterChange = this.handleDelimiterChange.bind(this);
    this.handleCommentCharacterChange = this.handleCommentCharacterChange.bind(this);
  }

  handleDelimiterChange(e) {
    this.props.setDelimiter(e.target.value);
  }

  handleCommentCharacterChange(e) {
    this.props.setCommentCharacter(e.target.value);
  }

  handleFileDropped(files) {
    var type = files[0].name.substring(files[0].name.lastIndexOf('.') + 1, files[0].name.length) || files[0].name;

    if (type === "json") {
      type = "JSON";
    }
    else {
      type = "Records";
    }
    console.log("change" + this.props.delimiter);

    this.props.onFileDropped(files, type, this.props.delimiter, this.props.commentCharacter);
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
        <div className="inputs">
          <Grid columns={4}>
            <Grid.Row className="delimiter" style={{ marginTop: 10, marginBottom: 8, paddingTop: 10 }}>
              <Grid.Column>
                <h4>CSV delimiter:</h4>
              </Grid.Column>
              <Grid.Column>
                <Input
                  maxLength="1"
                  className="delimeter-input"
                  placeholder="ex: , . : - ;"
                  onChange={this.handleDelimiterChange}
                  style={{ width: 90, top: -5 }}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="delimiter" style={{ marginTop: 10, marginBottom: 8, paddingTop: 10 }}>
              <Grid.Column>
                <h4>Comment character:</h4>
              </Grid.Column>
              <Grid.Column>
                <Input
                  maxLength="1"
                  className="delimeter-input"
                  placeholder="ex: # // *"
                  onChange={this.handleCommentCharacterChange}
                  style={{ width: 90, top: -5 }}

                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <div>

            {(!this.props.geoanalytics.checked) ?

              <Dropzone onDrop={this.handleFileDropped.bind(this)}>
                <p>Drop a file here or click to select one</p>
              </Dropzone>
              :
              <ConfigurationDataGeoanalyticsSelector
                layers={this.props.geoanalytics.layers} />
            }
            <div className='sweet-loading'>
              <Center>
                <br></br><br></br>

                <SyncLoader
                  css={override}
                  sizeUnit={"px"}
                  size={15}
                  color={'#31bc12'}
                  loading={this.props.loading}
                />
              </Center>
            </div>
          </div>

        </div>

      </div>

    </div>);
  }
}

export default ConfigurationDataForm;