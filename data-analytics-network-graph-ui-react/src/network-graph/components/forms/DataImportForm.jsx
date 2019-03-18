import React from 'react'

import UploadMessage from '../ui_utils/UploadMessage';
import { findDOMNode } from 'react-dom'

import { Grid, Header, Divider, List, Icon } from 'semantic-ui-react';
import { Button, Input} from '@material-ui/core/';


class DataImportForm extends React.Component {



    onFileChange(e) {
        if (e.target.files[0]) {
            this.props.onFileChange(true);
        }
    }
    submit(e) {
        e.preventDefault();
        const myFile = findDOMNode(this.refs.myFile).files[0];
        this.props.uploadFile(myFile);
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
                    <form className='add-graph-file' onSubmit={this.submit}>
                        <div className='form-group'>
                            <Input
                                type='file'
                                ref='graphFile'
                                onChange={this.onFileChange}
                               />
                        </div>
                        <Button
                            type='submit'
                            variant="contained" color="primary"
                            disabled={!this.props.fileDetails.valid}>
                            Upload
                    </Button>
                    </form>
                </div>
            </div>);
    }
}

export default DataImportForm;