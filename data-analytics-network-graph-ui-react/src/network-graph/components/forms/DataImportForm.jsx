import React from 'react'

import UploadMessage from '../ui_utils/UploadMessage';
import { findDOMNode } from 'react-dom'

import { Grid, Header, Divider, List, Icon } from 'semantic-ui-react';
import { Button, Input } from '@material-ui/core/';



class DataImportForm extends React.Component {
    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.onFileChange = this.onFileChange.bind(this);
        this.submit = this.submit.bind(this);
        this.file = React.createRef();
    }


    validExtensions = [".json"];

    validate(file) {
        var sFileName = file.name;
        if (sFileName.length > 0) {
            var blnValid = false;
            for (var j = 0; j < this.validExtensions.length; j++) {
                var sCurExtension = this.validExtensions[j];
                if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                    blnValid = true;
                    break;
                }
            }
            if (!blnValid) {
                alert("Sorry, " + sFileName + " is invalid, allowed extensions are: " + this.validExtensions.join(", "));
                return false;
            }
        }

        return true;
    }
    myFile;
    onFileChange(e) {
        if (e.target.files[0] && this.validate(e.target.files[0])) {
            this.props.setFileValidation(true);
            this.myFile = e.target.files[0];
        }
        else{
            this.props.setFileValidation(false);
        }
    }
    submit(e) {
        e.preventDefault();
        this.props.uploadFile(this.myFile);
    }

    render() {
        return (
            <div className="data-import-form">
                <Grid>
                    
                    <Grid.Column mobile={16} tablet={8} computer={6}>
                        <Header as='h3' >Graph Data Import</Header>
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
                                accept=".json"
                                ref='myFile'
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
                <div>
                  
                </div>
            </div>);
    }
}

export default DataImportForm;