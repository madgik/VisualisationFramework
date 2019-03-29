import React from 'react';

import { PlayerIcon, Slider, SliderBar, SliderHandle } from 'react-player-controls';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DateUtils from '../../utilities/DateUtils'


class GraphControls extends React.Component {
  constructor(props) {
    super(props);
    this.handleNextClick=this.handleNextClick.bind(this);
    this.handlePreviousClick=this.handlePreviousClick.bind(this);
    this.handlePauseClick=this.handlePauseClick.bind(this);
    this.handlePlayClick=this.handlePlayClick.bind(this);
  }
  
  handlePlayClick() {
    this.props.setPaused(false);
    this.props.playTimeGraph(this.props.currentDate, this.props.graphData, this.props.selectedGraph);
  }


  handleNextClick() {
    var nextDate=DateUtils.getNextDate(this.props.currentDate);
    console.log("next date is:"+ nextDate);
    if(nextDate !== undefined) {
      this.props.getDateGraph(nextDate, this.props.graphData, this.props.selectedGraph);
    }
  }

  handlePauseClick() {
    this.props.setPaused(true);
  }


  handlePreviousClick() {
    var previousDate=DateUtils.getPreviousDate(this.props.currentDate);
    console.log("previous date is:"+ previousDate);
    if(previousDate !== undefined) {
      this.props.getDateGraph(previousDate, this.props.graphData, this.props.selectedGraph);
    }
  }

  render() {
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
              isEnabled='true'
            >
            </Slider>
          </Grid>
        </Grid>
      );
    }
  }
}

export default GraphControls;