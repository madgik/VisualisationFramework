import React from "react";
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import DataImportForm from "../forms/DataImportForm";
import GraphFilter from "../controls/GraphFilter";
import GraphControls from "../controls/GraphControls";
import SelectGraphForm from "../forms/SelectGraphForm";
import GraphSelection from "./GraphSelection";


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
      <div className="sidebar-controls">
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
              getAllTimestamps={this.props.getAllTimestamps}
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
            <GraphFilter
              graph={this.props.graph}
              currentDate={this.props.currentDate}
              getDateGraph={this.props.getDateGraph}
              timestamps={this.props.timestamps}
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
              stopped={this.props.stopped}
              setPaused={this.props.setPaused}
              setPausedPromise={this.props.setPausedPromise}
              setStopped={this.props.setStopped}
              setSliderValue={this.props.setSliderValue}
              sliderValue={this.props.sliderValue}
              timestamps={this.props.timestamps}
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