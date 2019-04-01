import React from 'react';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import { PlayerIcon, Slider, SliderBar, SliderHandle } from 'react-player-controls';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DateUtils from '../../utilities/DateUtils'
// import { Slider, Handles, Rail, Tracks, Ticks } from 'react-compound-slider'
// import { SliderRail, Handle, Track, Tick } from './SliderComponents' // example render components - source below

const style = () => ({
  root: {
    height: 120,
    width: '100%',
  },
  slider: {
    position: 'relative',
    width: '100%',
  },
})


class GraphControls extends React.Component {
  constructor(props) {
    super(props);
    this.playGraph = this.playGraph.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handlePauseClick = this.handlePauseClick.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
  }

  handlePlayClick() {
    this.props.setPaused(false);
    this.playGraph(this.props.currentDate);

    // this.props.playTimeGraph(this.props.currentDate, this.props.graphData, this.props.selectedGraph);
  }

  playGraph(date) {
    console.log("next date is:" + date + "and paused is:" + this.props.paused);
    if (this.props.paused != true && date != undefined) {
      setTimeout(() => {
        this.props.getDateGraph(date, this.props.graph, this.props.selectedGraph).then(() => {
          var nextDate = DateUtils.getNextDate(this.props.currentDate);

          this.playGraph(nextDate);
        })
      }, 3000);
    }
  }


  handleNextClick() {
    var nextDate = DateUtils.getNextDate(this.props.currentDate);
    if (nextDate !== undefined) {
      this.props.getDateGraph(nextDate, this.props.graph, this.props.selectedGraph);
    }
  }

  handlePauseClick() {
    this.props.setPaused(true);
  }


  handlePreviousClick() {
    var previousDate = DateUtils.getPreviousDate(this.props.currentDate);
    console.log("previous date is:" + previousDate);
    if (previousDate !== undefined) {
      this.props.getDateGraph(previousDate, this.props.graphData, this.props.selectedGraph);
    }
  }

  render() {
    const {
      props: { classes }
    } = this

    if (this.props.graphData == null) {
      return (
        <div></div>
      )
    }
    else {
      return (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          alignContent="center"
        >
          <Grid item spacing={8}>
            <IconButton className='player-controls' id='play'
              onClick={this.handlePlayClick}
            >
              <PlayerIcon.Play width={28} height={28} style={{ marginRight: 28 }} />
            </IconButton>
            <IconButton className='player-controls' id='pause'
              onClick={this.handlePauseClick}
            >
              <PlayerIcon.Pause width={28} height={28} style={{ marginRight: 28 }} />
            </IconButton>
            <IconButton className='player-controls' aria-label="Play"
              onClick={this.handlePreviousClick}
            >
              <PlayerIcon.Previous width={28} height={28} style={{ marginRight: 28 }} />
            </IconButton>
            <IconButton className='player-controls' aria-label="Play" color="primary"
              onClick={this.handleNextClick}
            >
              <PlayerIcon.Next width={28} height={28} style={{ marginRight: 28 }} />
            </IconButton>
          </Grid>
          <Grid item>
            <Slider
               isEnabled
               onIntent={intent => console.log(`hovered at ${intent}`)}
               onIntentStart={intent => console.log(`entered with mouse at ${intent}`)}
               onIntentEnd={() => console.log('left with mouse')}
               onChange={newValue => console.log(`clicked at ${newValue}`)}
               onChangeStart={startValue => console.log(`started dragging at ${startValue}`)}
               onChangeEnd={endValue => console.log(`stopped dragging at ${endValue}`)}
            >
            </Slider>
          </Grid>
        </Grid >
      );
    }
  }
}

GraphControls.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(style)(GraphControls)
