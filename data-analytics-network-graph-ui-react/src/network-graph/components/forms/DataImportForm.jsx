import React from 'react'

import UploadMessage from '../ui_utils/UploadMessage';
import { findDOMNode } from 'react-dom'

import { Grid, Header, Divider, Icon } from 'semantic-ui-react';
import { Button } from '@material-ui/core/';
import { Input } from 'semantic-ui-react'



class DataImportForm extends React.Component {
    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.onFileChange = this.onFileChange.bind(this);
        // this.onNameFileChange = this.onNameFileChange.bind(this);

        this.submit = this.submit.bind(this);
        this.file = React.createRef();
        this.myFile = React.createRef();
        this.fileName = React.createRef();
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

    onFileChange(e) {
        if (e.target.files[0] && this.validate(e.target.files[0])) {
            this.props.setFileValidation(true);
            this.myFile = e.target.files[0];
        }
        else {
            this.props.setFileValidation(false);
        }
    }

    // onFileNameChange(e) {
    //     this.fileName = e.target.value;
    // }

    submit(e) {
        e.preventDefault();
        this.props.uploadFile(this.myFile);
    }

    render() {
        return (
            <div className="data-import-form">
                <Grid>

                    <Grid.Column mobile={16} tablet={8} computer={6}>
                        <Header as='h3' >Data Import</Header>
                    </Grid.Column>
                </Grid>
                <Divider />
                <div>
                    <UploadMessage
                        type='Graph'
                    />
                    <form className='add-graph-file' onSubmit={this.submit}>
                        <Grid className="data-import-fix">

                            {/* <Grid className="data-import-fix" item>
                                <Input 
                                    className="input-file data-import-fix"
                                    type='text'
                                    ref={this.fileName}
                                    onChange={this.onFileChange}
                                />
                            </Grid> */}
                            <Grid className="data-import-fix" item>
                                <Input 
                                    className="input-file data-import-fix"
                                    type='file'
                                    accept=".json"
                                    ref={this.myFile}
                                    onChange={this.onFileChange}
                                />
                            </Grid>

                            <Grid className="upload-button-fix" item>
                                <Button
                                    type='submit'
                                    variant="contained" color="primary"
                                    disabled={!this.props.fileDetails.valid}>
                                    Upload
                                </Button>
                            </Grid>
                        </Grid>

                    </form>
                </div>
                <div>

                </div>
            </div>);
    }
}

export default DataImportForm;