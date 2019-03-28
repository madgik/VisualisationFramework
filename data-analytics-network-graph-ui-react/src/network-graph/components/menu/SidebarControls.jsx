import React from "react";
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import DataImportForm from "../forms/DataImportForm";
import GraphFilter from "../controls/GraphFilter";
import GraphControls from "../controls/GraphControls";
import SelectGraphForm from "../forms/SelectGraphForm";
import GraphSelection from "./GraphSelection";
import NodePropeties from "../graph/NodeProperties";

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

class SidebarControls extends React.Component {

  render() {
    
    const { classes } = this.props;


    return (
      <div className="sidebar">
        <Grid container
          direction="row"
          justify="center"
          alignItems="center"
        >
        <Grid>
        <GraphSelection
          //API CALLS
          uploadFile={this.props.uploadFile}
          getAllGraphsMetadata={this.props.getAllGraphsMetadata}
          getTopNodes ={this.props.getTopNodes}
          //SETTERS STATE
          setFileValidation={this.props.setFileValidation}
          setGraphSource={this.props.setGraphSource}
          setSelectedGraph={this.props.setSelectedGraph}
          //STATE PROPS
          fileDetails={this.props.fileDetails}
          graphSource={this.props.graphSource}
          selectedGraph={this.props.selectedGraph}
          allGraphsMetadata={this.props.allGraphsMetadata}
        />
        </Grid>
        <Grid>
          <NodePropeties
            graph={this.props.graph}
            selectedGraph={this.props.selectedGraph}
            selectedNode={this.props.selectedNode}
            getNeighbors={this.props.getNeighbors}
            graphData={this.props.graphData}
          />
        </Grid>
        <Grid>
          <GraphFilter
            currentDate={this.props.currentDate}
          />
        </Grid>
        <Grid>
          <GraphControls />
        </Grid>
          {/* <GraphFilter /> */}


        </Grid>
      </div>
    );
  }
}

SidebarControls.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SidebarControls);