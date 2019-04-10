import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import './month-picker.css'
import Button from '@material-ui/core/Button';
import { get } from 'https';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  }
});

class GraphFilter extends React.Component {

  constructor(props) {
    super(props);
    this.handlePropertyChange = this.handlePropertyChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleChangeDatepicker = this.handleChangeDatepicker.bind(this);
    this.handleGetCurrent = this.handleGetCurrent.bind(this);
  }

 
  handlePropertyChange(name) {

  }

  handleWeightChange(weight) {

  }

  handleChangeDatepicker() {

  }

  handleGetCurrent() {
    this.props.getDateGraph(this.props.currentDate, this.props.graphData, this.props.selectedGraph)
  }

  render() {

    const { classes } = this.props;

    if (this.props.graph.nodes.length != 0 && this.props.graph.nodes != undefined) {
      return (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          alignContent="center"
          spacing={8}
        >
          <Grid item>
            <h3>Filters</h3>

          </Grid>
          <Grid item >
            <TextField
              id="property-filter"
              label="Property"
              className={classes.textField}
              onChange={this.handlePropertyChange('name')}
              margin="normal"
              disabled="true"
            >{this.props.currentDate}
            </TextField>
          </Grid>
          <Grid item >
            <TextField
              id="weight-filter"
              label="Weight"
              className={classes.textField}
              onChange={this.handleWeightChange('weight')}
              margin="normal"
              disabled="true"
            >{this.props.currentDate}
            </TextField>
          </Grid>
          <Grid item>

          </Grid>
          <Grid item>
            <Button
              variant="contained" className={classes.button}
              onClick={this.handleGetCurrent}
              disabled="true"
            >
              Apply Filters
            </Button>
          </Grid>
        </Grid>
      );
    }
    else {
      return <div></div>
    }
  }
}
GraphFilter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GraphFilter);