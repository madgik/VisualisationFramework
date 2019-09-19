import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import './month-picker.css'
import Button from '@material-ui/core/Button';
import { get } from 'https';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Select as SelectMaterial } from "@material-ui/core";


import SelectSearch from 'react-select-search'
import './SearchBar.css';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
  },
  textFieldRange: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 100,
  }
});

class GraphFilter extends React.Component {

  constructor(props) {
    super(props);
    this.handlePropertyChange = this.handlePropertyChange.bind(this);
    this.handleNodePropertyChange = this.handleNodePropertyChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleChangeDatepicker = this.handleChangeDatepicker.bind(this);
    this.handleGetCurrent = this.handleGetCurrent.bind(this);
    this.handleChangeShowOldNodes = this.handleChangeShowOldNodes.bind(this);
    this.handleApplyFilters = this.handleApplyFilters.bind(this);
    this.handleTimestampFromChange = this.handleTimestampFromChange.bind(this);
    this.handleTimestampToChange = this.handleTimestampToChange.bind(this);
  }

  filtersBtn = true;
  query = {}
  dateFrom = null;
  componentWillMount

  handlePropertyChange(name) {

  }

  handleWeightChange(weight) {

  }

  handleChangeDatepicker() {

  }
  handleTimestampFromChange = event => {
    console.log(event.target.value)
    this.props.setTimestampFrom(event.target.value);
  };

  handleTimestampToChange = event => {
    console.log(event.target.value)
    this.props.setTimestampFrom(event.target.value);
  };

  handleGetCurrent() {
    this.props.getDateGraph(this.props.currentDate, this.props.graphData, this.props.selectedGraph)
  }

  handleChangeShowOldNodes(value) {
    this.props.setShowOldNodes(!this.props.showOldNodes);
    console.log("check:" + this.props.showOldNodes);
  }

  handleNodePropertyChange(e) {

    if (e.target.value != "") {
      this.filtersBtn = false;
      this.query[e.target.id] = e.target.value
    }
    else {
      delete this.query[e.target.id];
    }
  }

  handleSelectPropertyChange(e, id) {
    console.log("id" + JSON.stringify(id) + "-"+JSON.stringify(e))
    if (e.value != "") {
      this.filtersBtn = false;
      this.query[id] = e.value
    }
    else {
      delete this.query[id];
    }
  }

  handleApplyFilters() {
    if (Object.keys(this.query).length !== 0) {
      this.props.getFilteredGraph(this.query, this.props.selectedGraph);
    }
    this.props.setFilteredTimestamps(this.props.timestamps, this.props.timestampFrom, this.props.timestampTo);
    toast.success("Filters Applied", {
      position: toast.POSITION.TOP_CENTER,
      className: 'toast',
      hideProgressBar: true
    });
  }

  render() {
    const { classes } = this.props;
    var showOldNodes = this.props.showOldNodes;

    if (this.props.topNodes.nodes != null && this.props.topNodes.nodes != undefined) {
      return (
        <Grid
          className="filters"
          container
          direction="column"
          justify="center"
          alignItems="center"
          alignContent="center"
          spacing={8}
        >
          <Grid item><h3>Filters</h3></Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.props.showOldNodes}
                  onChange={(e)=>this.handleChangeShowOldNodes}
                  value={this.showOldNodes}
                  color="primary"
                />
              }
              label="Show Previous Unlinked Nodes"
            />
          </Grid>
          <Grid item >
            <Grid
              direction='column'
              container>
              <Grid item>
                <h4>Main Property</h4>
              </Grid>
              <Grid item>
                <TextField
                  id="main-property-1"
                  label="Property"
                  className={classes.textFieldRange}
                  onChange={this.handleNodePropertyChange}
                  margin="normal"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item >

            <Grid
              direction='column'
              container>
              <Grid item>
                <h4>Weight Range</h4>
              </Grid>
              <Grid
                direction='row'
                container>
                <Grid item xs={6}>
                  <TextField
                    id="main-weight-1"
                    label="from"
                    className={classes.textFieldRange}
                    onChange={this.handleNodePropertyChange}
                    margin="normal"
                    type="number"
                  />
                </Grid>
                <Grid item xs={6}>
                  {/* <label>to</label> */}
                  <TextField
                    id="main-weight-2"
                    label="to"
                    className={classes.textFieldRange}
                    onChange={this.handleNodePropertyChange}
                    margin="normal"
                    type="number"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <h4>Node Property filters</h4>
          </Grid>

          {
            this.props.topNodes.nodes != undefined ?
              <Grid item>
                {Object.keys(this.props.topNodes.nodes[0]).map(element => {
                  if (typeof this.props.topNodes.nodes[0][element] != 'number' && (element != 'Latitude' && element != 'Longitude')) {
                    return <Grid item>
                      {(this.props.propertyValues[element]) != undefined ?
                        <SelectSearch
                          id={element}
                          search={true}
                          mode="input"
                          options={this.props.propertyValues[element]}
                          onChange={(e) => this.handleSelectPropertyChange(e,element)}
                          placeholder={element}
                        />
                        :
                        <TextField
                          id={element}
                          label={element}
                          className={[classes.textField, 'filters'].join(" ")}
                          onChange={this.handleNodePropertyChange}
                          margin="normal"
                        />}
                    </Grid>
                  }
                  else if (element != 'latitude' && element != 'longitude') {
                    return <Grid
                      direction='column'
                      container>
                      <Grid item>
                        <label>{element}</label>
                      </Grid>
                      <Grid
                        direction='row'
                        container>
                        <Grid item xs={6}>
                          <TextField
                            id={element + "-1"}
                            label="from"
                            className={classes.textFieldRange}
                            onChange={this.handleNodePropertyChange}
                            margin="normal"
                            type="number"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            id={element + "-2"}
                            label="to"
                            className={classes.textFieldRange}
                            onChange={this.handleNodePropertyChange}
                            margin="normal"
                            type="number"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  }
                })
                }
              </Grid>
              :
              ''
          }
          <Grid item>
            <h4>Date Range</h4>
          </Grid>
          <Grid
            direction='row'
            container>
            <Grid item xs={6}>

              <FormControl className={classes.formControl}>

                <SelectMaterial
                  value={this.props.timestampFrom}
                  onChange={this.handleTimestampFromChange}
                  inputProps={{
                    name: 'timestamp-from-selector',
                    id: 'timestamp-from-selector',
                    classes: {
                      icon: classes.icon,
                      root: classes.whiteColor,
                    },
                  }}
                >
                  {(this.props.timestamps != null && this.props.timestamps != '') ?
                    this.props.timestamps.map((timestamp, i) =>
                      <MenuItem key={i} value={timestamp}>
                        {timestamp}
                      </MenuItem>) :
                    ''
                  }
                </SelectMaterial>
              </FormControl>

            </Grid>
            <Grid item xs={6}>
              <FormControl className={classes.formControl}>

                <SelectMaterial
                  value={this.props.timestampTo}
                  onChange={this.handleTimestampFromTo}
                  inputProps={{
                    name: 'timestamp-to-selector',
                    id: 'timestamp-to-selector',
                    classes: {
                      icon: classes.icon,
                      root: classes.whiteColor,
                    },
                  }}
                >
                  {(this.props.timestamps != null && this.props.timestamps != '') ?
                    this.props.timestamps.map((timestamp, i) =>
                      <MenuItem key={i} value={timestamp}>
                        {timestamp}
                      </MenuItem>) :
                    ''
                  }
                </SelectMaterial>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              variant="contained" className={classes.button}
              onClick={this.handleApplyFilters}
            // disabled={this.filtersBtn}
            >
              Apply Filters
            </Button>

          </Grid>
        </Grid >
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