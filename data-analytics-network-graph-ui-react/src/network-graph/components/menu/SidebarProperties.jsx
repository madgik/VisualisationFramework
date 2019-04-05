import React from "react";
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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

class SidebarProperties extends React.Component {

  render() {

    const { classes } = this.props;

    if (this.props.graph.nodes.length == 0 || this.props.graph.nodes == undefined) {
      return (
        <div className="sidebar-properties"></div>
      )
    }
    else {
      return (
        <div className="sidebar-properties">
          <Grid container
            direction="row"
            justify="center"
            alignItems="center">
            <Grid item spacing={8}>
              <NodePropeties
                graph={this.props.graph}
                selectedGraph={this.props.selectedGraph}
                selectedNode={this.props.selectedNode}
                getNeighbors={this.props.getNeighbors}
                graphData={this.props.graphData}
              />
            </Grid>
            <Grid item spacing={8}>
              <LinkProperties
                selectedWeight={this.props.selectedWeight}
                selectedLink={this.props.selectedLink}
              />
            </Grid>

          </Grid>
        </div>
      );
    }
  }
}

SidebarProperties.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SidebarProperties);