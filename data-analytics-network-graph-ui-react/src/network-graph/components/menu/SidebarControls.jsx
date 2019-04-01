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
import LinkProperties from "../graph/LinkProperties";

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
              getTopNodes={this.props.getTopNodes}
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
            <LinkProperties
              selectedWeight={this.props.selectedWeight}
              />
          </Grid>
          <Grid>
            <GraphFilter
              graphData={this.props.graphData}
              currentDate={this.props.currentDate}
              getDateGraph={this.props.getDateGraph}
            />
          </Grid>
          <Grid>
            <GraphControls
              graph={this.props.graph}
              graphData={this.props.graphData}
              currentDate={this.props.currentDate}
              getDateGraph={this.props.getDateGraph}
              selectedGraph={this.props.selectedGraph}
              playTimeGraph={this.props.playTimeGraph}
              paused={this.props.paused}
              setPaused={this.props.setPaused}
            />
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