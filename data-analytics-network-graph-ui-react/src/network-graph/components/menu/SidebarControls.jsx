import React from "react";
import Grid from '@material-ui/core/Grid';
import DataImportForm from "../forms/DataImportForm";
import GraphFilter from "../controls/GraphFilter";
import GraphControls from "../controls/GraphControls";

class SidebarControls extends React.Component {



  render() {
    const styles = theme => ({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    });

    

    return (
      <div className="sidebar">
        <Grid container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <DataImportForm
            uploadFile={this.props.uploadFile}
            setFileValidation={this.props.setFileValidation}
            fileDetails={this.props.fileDetails} />
          <GraphFilter />

          <GraphControls />

        </Grid>
      </div>
    );
  }
}

export default SidebarControls;