import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Button, Input } from '@material-ui/core/';


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
     verticalAlign: 'middle',
  },
});


class ShowTopNodes extends React.Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    // this.submit = this.submit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  numInput;

  handleInputChange(e) {
    this.numInput = e.target.value;
    console.log("my Input"+this.numInput);
  }

  handleClick() {
    console.log(" Input"+this.numInput);
    if(this.numInput === undefined) {
      this.numInput=5;
    }
    this.props.getTopNodes(this.props.selectedGraph, this.numInput);
  }

  render() {
    const { classes } = this.props;
    return (
      <form autoComplete="off">
        <label>Select Top N nodes for initialize</label>
        <div style={{ display: 'inline-flex' }}>
          <div>
            <TextField
              id="standard-bare"
              className={classes.textField}
              label=" Top N nodes for initialize"
              placeholder="Number of Nodes"
              defaultValue="5"
              margin="normal"
              type="number"
              value={this.numInput}
              onChange={this.handleInputChange}
            />
          </div>
          <div style={{ alignSelf: 'center' }}>
            <Button
              className={classes.button}
              onClick={this.handleClick}
              variant="contained" color="primary"
              disabled= {(this.props.selectedGraph === '-') ? true : false}
            >
              Show Graph
          </Button>
          </div>
        </div>
      </form>
    );
  }
}

ShowTopNodes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowTopNodes);