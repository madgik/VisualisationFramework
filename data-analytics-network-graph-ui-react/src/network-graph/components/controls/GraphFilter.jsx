import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Picker from 'react-month-picker'
import './month-picker.css'
import Button from '@material-ui/core/Button';
import { get } from 'https';

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
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChangeDatepicker = this.handleChangeDatepicker.bind(this);
    this.handleGetCurrent = this.handleGetCurrent.bind(this);
  }

  handleDateChange(name) {

  }

  handleChangeDatepicker() {

  }

  handleGetCurrent() {
    this.props.getDateGraph(this.props.currentDate, this.props.graphData, this.props.selectedGraph)
  }

  render() {

    const { classes } = this.props;

    if (this.props.graphData != null) {
      return (

        <div>
          <h3>Filters</h3>
          <TextField
            id="current-date"
            label="CurrentDate"
            className={classes.textField}
            value={this.props.currentDate}
            onChange={this.handleDateChange('name')}
            margin="normal"
            editable="false"
          >{this.props.currentDate}
          </TextField>
          <Button
            variant="contained" className={classes.button}

            onClick={this.handleGetCurrent}
          >
            Get Current's Date Graph
        </Button>
        </div>);
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