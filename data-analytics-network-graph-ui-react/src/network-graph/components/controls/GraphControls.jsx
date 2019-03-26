import React from 'react';

import { PlayerIcon, Slider, SliderBar, SliderHandle } from 'react-player-controls';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';


class GraphControls extends React.Component {

  render() {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        alignContent="center"
      >
        <Grid item spacing={8}>
          <IconButton className='player-controls' id='play' >
            <PlayerIcon.Play width={28} height={28} style={{ marginRight: 28 }} />
          </IconButton>
          <IconButton className='player-controls' id='pause'>
            <PlayerIcon.Pause width={28} height={28} style={{ marginRight: 28 }} />
          </IconButton>
          <IconButton className='player-controls' aria-label="Play" >
            <PlayerIcon.Previous width={28} height={28} style={{ marginRight: 28 }} />
          </IconButton>
          <IconButton className='player-controls' aria-label="Play" color="primary">
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

export default GraphControls;