import React from "react";
import classNames from 'classnames';

import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { Select } from "@material-ui/core";
import './forms.css'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  icon: {
    fill: 'white',
  },
  whiteColor: {
    color: "white"
  },

});

class SelectGraphForm extends React.Component {


  componentDidMount() {
    this.props.getAllGraphsMetadata();
  }

  handleChange = event => {
    console.log(event.target.value)
    this.props.setSelectedGraph(event.target.value);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      
      <form className="form-inline" autoComplete="off">
          <label for="graph-select">Select Graph</label>
          <FormControl className={classes.formControl}>

          <InputLabel className={classes.whiteColor} htmlFor="graph-select">
             Graph Name
          </InputLabel>
          <Select
            value={this.props.selectedGraph}
            onChange={this.handleChange}
            inputProps={{
              name: 'graph-selector',
              id: 'graph-select',
              classes: {
                icon: classes.icon,
                root: classes.whiteColor,
              },
            }}
          >
            { (this.props.allGraphsMetadata!= '') ? 
              this.props.allGraphsMetadata.map((graph,i) =>
              <MenuItem key={i} value={graph.id}>
                {graph.name}
            </MenuItem>)  :
            ''
            }
          </Select>
          </FormControl>
      </form>
      </div>
    );
  }
}
SelectGraphForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectGraphForm);