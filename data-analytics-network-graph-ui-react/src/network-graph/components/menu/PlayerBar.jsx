import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import GraphControls from '../controls/GraphControls'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  paper: {
    paddingBottom: 40,
  },
  list: {
    marginBottom: theme.spacing.unit * 2,
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
});


class PlayerBar extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="playerbar-controls">
      <AppBar color="default" className={classes.appBar}>
          <GraphControls
            graph={this.props.graph}
            graphData={this.props.graphData}
            currentDate={this.props.currentDate}
            getDateGraph={this.props.getDateGraph}
            selectedGraph={this.props.selectedGraph}
            playTimeGraph={this.props.playTimeGraph}
            setPaused={this.props.setPaused}
            paused={this.props.paused}
            stopped={this.props.stopped}
            setPausedPromise={this.props.setPausedPromise}
            setStopped={this.props.setStopped}
            setSliderValue={this.props.setSliderValue}
            sliderValue={this.props.sliderValue}
            timestamps={this.props.timestamps}
          />
        </AppBar>
      </div>
    );
  }
}

PlayerBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayerBar);