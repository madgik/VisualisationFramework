import React from 'react'

import Dropzone from 'react-dropzone'
import UploadMessage from '../ui_utils/UploadMessage';

import { Grid, Header, Divider, List, Icon } from 'semantic-ui-react'

class DataImportForm extends React.Component {

    handleFileDropped(files) {
        this.props.onFileDropped(files, this.props.data.type);
    }

    render() {
        return (
        <div className="data-import-form">
            <Grid>
                <Grid.Column mobile={16} tablet={8} computer={6}>
                    <Header>Graph Data Import</Header>
                    <List>
                        <List.Item key="smthng">
                            <List.Content>Add</List.Content>
                        </List.Item>
                    </List>
                    <Icon name='remove' className="remove-icon" onClick={() => this.handleRemoveFileClick()} /> 
                </Grid.Column>   
            </Grid>
            <Divider />
                <div>
                <UploadMessage 
                    type='Graph'
                    />
                <Dropzone onDrop={this.handleFileDropped.bind(this)}>
                    <p>Drop a file here or click to select one</p>
                </Dropzone>
            </div>
        </div>);
    }
}
    
export default DataImportForm;