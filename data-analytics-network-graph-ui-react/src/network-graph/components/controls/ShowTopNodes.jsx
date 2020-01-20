import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import "../forms/forms.css"
// import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core/';
import { Input } from 'semantic-ui-react'


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
    console.log("target:"+e.target.value);
    this.numInput = e.target.value;
    this.props.setNodesNumber(e.target.value);
    console.log("after:"+ this.props.nodesNumber)
  }

  handleClick() {
    console.log(" Input"+this.numInput);
    if(this.numInput === undefined) {
      this.numInput=5;
    }
    this.props.getTopNodes(this.props.selectedGraph, this.numInput);
    this.props.getAllTimestamps(this.props.selectedGraph);
  }

  render() {
    // <div className="top-n">
    //       <div className="top-n-column"></div>
    const { classes } = this.props;
    return (
      <form className="form-inline">
            <label htmlFor="standard-bare">Select Top Nodes</label>
            <Input
              id="standard-bare"
              className="top-n-column top-n-button"
              placeholder="Number of Nodes"
              margin="normal"
              type="number"
              value={this.props.nodesNumber}
              onChange={this.handleInputChange}
            />
       
            <Button
              className="top-n-button"
              onClick={this.handleClick}
              variant="contained" color="primary"
              disabled= {(this.props.selectedGraph === '-') ? true : false}
            >
              Show Graph
          </Button>
      
      </form>
    );
  }
}

ShowTopNodes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowTopNodes);