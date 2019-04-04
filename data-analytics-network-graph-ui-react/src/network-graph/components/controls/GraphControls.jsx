import React from 'react';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import { PlayerIcon } from 'react-player-controls';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DateUtils from '../../utilities/DateUtils';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';

// import { Slider, Handles, Rail, Tracks, Ticks } from 'react-compound-slider'
// import { SliderRail, Handle, Track, Tick } from './SliderComponents' // example render components - source below

const style = () => ({
  root: {
    width: 300,
  },
  slider: {
    padding: '22px 0px',
  }
})


class GraphControls extends React.Component {
  constructor(props) {
    super(props);
    this.playGraph = this.playGraph.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handlePauseClick = this.handlePauseClick.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
  }
  
  boxClass =["player-controls"];

  componentWillMount(){
      this.maxValue = DateUtils.dates.length;
  }


  handlePlayClick() {
    this.props.setStopped(false);
    this.props.setPaused(false);
     this.playGraph(this.props.currentDate);
 
    // this.props.playTimeGraph(this.props.currentDate, this.props.graphData, this.props.selectedGraph);
  }


  playGraph(date) {
    console.log("next date is:" + date + "and paused is:" + this.props.paused);
    this.boxClass.push('shadow');

    if (this.props.paused != true && date != undefined) {
      setTimeout(() => {
        if (this.props.paused != true ) {
          this.props.getDateGraph(date, this.props.graph, this.props.selectedGraph).then(() => {
          var nextDate = DateUtils.getNextDate(this.props.currentDate);
          this.props.setSliderValue(DateUtils.dates.indexOf(nextDate));
          this.playGraph(nextDate);
        }) 
        }
      }, 3000);
    }
    else if(this.props.paused != true && date == undefined) {
      this.props.setStopped(true);
    }

  }


  handleNextClick() {
    var nextDate = DateUtils.getNextDate(this.props.currentDate);
    if (nextDate !== undefined) {
      this.props.getDateGraph(nextDate, this.props.graph, this.props.selectedGraph);
      this.props.setSliderValue(DateUtils.dates.indexOf(nextDate));
    }
  }

  handlePauseClick() {
    this.props.setPaused(true);
  }


  handlePreviousClick() {
    var previousDate = DateUtils.getPreviousDate(this.props.currentDate);
    console.log("previous date is:" + previousDate);
    if (previousDate !== undefined) {
      this.props.getDateGraph(previousDate, this.props.graph, this.props.selectedGraph);
      this.props.setSliderValue(DateUtils.dates.indexOf(previousDate));

    }
  }

  handleSliderChange(event, value) {
    this.props.setPaused(true);

    this.props.setSliderValue(value);
    
    this.props.getDateGraph(DateUtils.dates[value], this.props.graph, this.props.selectedGraph);
    // this.props.setPaused(false);

  }


  render() {
    const { classes } = this.props;
    var playClass = (this.props.stopped || this.props.paused)  ? 'player-controls' : 'player-controls disabled';


    if (this.props.graph.nodes.length == 0 || this.props.graph.nodes == undefined) {
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
            <TextField
              id="current-date"
              label="CurrentDate"
              className={classes.textField}
              value={this.props.currentDate}
              margin="normal"
              editable="false"
            >{this.props.currentDate}
            </TextField>
          </Grid>
          <Grid item spacing={8}>
            <IconButton className={playClass} id='play'
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
          <div className={classes.root}>

            <Slider
              classes={{ container: classes.slider }}
              value={this.props.sliderValue}
              min={0}
              max={this.maxValue}
              step={1}
              aria-labelledby="label"
              onChange={this.handleSliderChange}
            />
            </div>
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
