import React from 'react'

import UploadMessage from '../ui_utils/UploadMessage';
import { findDOMNode } from 'react-dom'

import { Header, Divider, Icon } from 'semantic-ui-react';
import { Grid } from '@material-ui/core/';
import { Button, withStyles } from '@material-ui/core/';
import { Input } from 'semantic-ui-react';
import TextField from '@material-ui/core/TextField';



const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    form: {
        heigh: "500px"
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    message: {
        textAlign: "center",
        margin: "auto"

    }

});

class DataImportForm extends React.Component {
    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.onFileChange = this.onFileChange.bind(this);
        this.onFileNameChange = this.onFileNameChange.bind(this);
        this.onUrlChange = this.onUrlChange.bind(this);

        this.submit = this.submit.bind(this);
        this.file = React.createRef();
        this.myFile = null;
        this.state = {
            myFile: null,
            myURL: null
        };
        this.fileName = React.createRef();
        this.privacy = React.createRef();
        this.url = React.createRef();
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

    onUrlChange(e) {
        this.setState({myFile:null, myURL:null});
        console.log(e)
        if (e.target.value !== "") {
            this.props.setUrl(e.target.value);
            this.setState({myFile:null, myURL:e.target.value});
            this.props.setFileValidation(true);
        }
    }

    onFileChange(e) {
        this.setState({myFile:null, myURL:null});
        if (e.target.files[0] && this.validate(e.target.files[0])) {
            this.props.setFileValidation(true);
            let myFile = e.target.files[0];
            this.setState({myFile:myFile, myURL:null});
        }
        else {
            this.props.setFileValidation(false);
        }
    }

    onFileNameChange(e) {
        this.fileName = e.target.value;
    }

    // onFileNameChange(e) {
    //     this.fileName = e.target.value;
    // }

    submit(e) {
        e.preventDefault();

        if(this.state.myURL === null &&  (this.state.myFile instanceof File)) {
            this.props.uploadFile(this.state.myFile, this.fileName, this.privacy, this.props.username);
        }
        else if (this.state.myURL !== "" && !(this.state.myFile instanceof File)) {
            this.props.uploadFromRemoteURL(this.state.myURL, this.fileName, this.privacy.current.value, this.props.username);
        }
        // if (this.url === "" && (this.myFile instanceof File)) {
        //     this.props.uploadFile(this.myFile, this.fileName, this.privacy, this.props.username);
        // }
        // else if (this.url !== "" && !(this.myFile instanceof File)) {
        //     this.props.getFromUrl(this.props.url, this.fileName, this.privacy, this.props.username);
        // }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className="data-import-form">

                <Grid className="data-import-fix"
                    spacing={32}
                    className={classes.form}
                    container
                    direction='column'
                    justify="center"
                    alignItems="center"
                    alignContent="center"
                >
                    <h3>Please upload a valid json file</h3>
                    <Divider className="import-divider" />
                    <br></br>
                    <form className='add-graph-file' onSubmit={this.submit}>
                        <Grid className="data-import-fix"
                            spacing={32}
                            className={classes.root}
                            container
                            direction='column'
                            justify="center"
                            alignItems="center"
                            alignContent="center"
                        >
                            <Grid container
                                direction='row'
                            >
                                <Grid item xs={5}>
                                    <label>URL of the resource</label>
                                </Grid>
                                <Grid item xs={5}>
                                    <Input
                                        className="input-file data-import-fix"
                                        type='text'

                                        ref={this.url}
                                        onChange={this.onUrlChange}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container
                                spacing={0}
                                direction="row"
                                alignItems="center"
                                justify="center">

                                <h4>Or Select File</h4>

                            </Grid>

                            <Grid container
                                direction='row'>
                                <Grid item xs={5}>
                                    <label>File Name</label>
                                </Grid>
                                <Grid item xs={5}>
                                    <Input
                                        className="input-file data-import-fix"
                                        type='text'
                                        ref={this.fileName}
                                        onChange={this.onFileNameChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container
                                direction='row'>
                                <Grid item xs={5}>
                                    <label>Privacy</label>
                                </Grid>
                                <Grid className="data-import-fix" item xs={5}>
                                    <select ref={this.privacy}>
                                        <option value="private">private</option>
                                        <option value="public">public</option>
                                    </select>
                                </Grid>
                            </Grid>
                            <Grid container
                                direction='row'>
                                <Grid item item xs={5}>
                                    <label>Description</label>
                                </Grid>
                                <Grid item item xs={5}>
                                    <TextField
                                        className="input-file data-import-fix"
                                        type='text'
                                        placeholder="Description"
                                        multiline={true}
                                        rows={1}
                                        ref={this.description}
                                        onChange={this.onDescriptionChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="data-import-fix" item>
                                <Input
                                    className="input-file data-import-fix"
                                    type='file'
                                    accept=".json"
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
                </Grid>
                <div>

                </div>
            </div>);
    }
}

export default withStyles(styles)(DataImportForm);