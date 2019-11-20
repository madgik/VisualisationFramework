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
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Select as SelectMaterial } from "@material-ui/core";


import SelectSearch from 'react-select-search'
import './SearchBar.css';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isArray } from 'util';


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
    this.state = {
      resetCondition: true,
      showOldNodes: props.showOldNodes
    };
    this.fromCondition = true;
    this.toCondition = true;
    this.oldNodesCondition = true;
    this.selectElements=[];
    this.handleNodePropertyChange = this.handleNodePropertyChange.bind(this);
    this.handleGetCurrent = this.handleGetCurrent.bind(this);
    this.handleChangeShowOldNodes = this.handleChangeShowOldNodes.bind(this);
    this.handleApplyFilters = this.handleApplyFilters.bind(this);
    this.handleTimestampFromChange = this.handleTimestampFromChange.bind(this);
    this.handleTimestampToChange = this.handleTimestampToChange.bind(this);
    this.handleResetFilters = this.handleResetFilters.bind(this);
    this.handleSelectPropertyChange = this.handleSelectPropertyChange.bind(this);
  }

  query = {};
  dateFrom = null;

  componentDidMount() {

  }

  handleResetCondition(){    
    const condition = Object.keys(this.props.query).length == 0 && this.fromCondition && this.toCondition && this.oldNodesCondition;

    this.state.resetCondition = condition;
    this.setState({resetCondition: this.state.resetCondition, showOldNodes: this.state.showOldNodes});

    return condition;
  }

  handleTimestampFromChange = event => {
    const condition = event.target.value == this.props.timestamps[0];
    this.fromCondition = condition;
    this.state.resetCondition = !condition ? condition : this.handleResetCondition();
    this.setState({resetCondition: this.state.resetCondition, showOldNodes: this.state.showOldNodes});
    this.props.setTimestampFrom(event.target.value);
  };

  handleTimestampToChange = event => {
    const condition = event.target.value == this.props.timestamps[this.props.timestamps.length - 1];
    this.toCondition = condition;
    this.state.resetCondition = !condition ? condition : this.handleResetCondition();
    this.setState({resetCondition: this.state.resetCondition, showOldNodes: this.state.showOldNodes});
    this.props.setTimestampTo(event.target.value);
  };

  handleGetCurrent() {
    this.props.getDateGraph(this.props.currentDate, this.props.graphData, this.props.selectedGraph)
  }

  handleChangeShowOldNodes() {
    // const condition = !this.props.showOldNodes;
    const condition = !this.state.showOldNodes;
    this.oldNodesCondition = condition;
    this.state.showOldNodes = condition;
    this.state.resetCondition = !condition ? condition : this.handleResetCondition();
    this.setState({resetCondition: this.state.resetCondition, showOldNodes: this.state.showOldNodes});
    // this.props.setShowOldNodes(!this.props.showOldNodes);
    this.props.setShowOldNodes(!this.state.showOldNodes);
  }

  handleNodePropertyChange(e) {
    if (e.target.value != "") {

      this.props.query[e.target.id] = e.target.value
    }
    else {
      delete this.props.query[e.target.id];
    }
    this.props.setQuery(this.props.query);
    this.handleResetCondition();
  }

  handleSelectPropertyChange(e, id) {
    if (e.value != "") {
      this.props.query[id] = e.value;
    }
    else {
      delete this.props.query[id];
    }
    this.props.setQuery(this.props.query)
    this.handleResetCondition();
  }

  handleApplyFilters() {
    if (Object.keys(this.props.query).length !== 0) {
      this.props.getFilteredGraph(this.props.query, this.props.selectedGraph, this.props.nodesNumber);
    }
    this.props.setFilteredTimestamps(this.props.timestamps, this.props.timestampFrom, this.props.timestampTo);
    this.handleResetCondition();
    console.log("this.props.query");
    console.log(this.props.query);
    toast.success("Filters Applied", {
      position: toast.POSITION.TOP_CENTER,
      className: 'toast',
      hideProgressBar: true
    });
  }

  handleResetFilters() {
    document.getElementById("filter-form").reset();
    this.props.getTopNodes(this.props.selectedGraph, this.props.nodesNumber);
    this.props.getAllTimestamps(this.props.selectedGraph);
    for(let q in this.props.query){
      delete this.props.query[q];
    }
    this.fromCondition = true;
    this.toCondition = true;
    this.oldNodesCondition = true;
    this.state.resetCondition = true;
    this.setState({resetCondition: this.state.resetCondition, showOldNodes: this.props.showOldNodes});
    toast.success("Filters Cleard", {
      position: toast.POSITION.TOP_CENTER,
      className: 'toast',
      hideProgressBar: true
    });
  }

  render() {
    const { classes } = this.props;
    // var showOldNodes = this.props.showOldNodes;
    var showOldNodes = this.state.showOldNodes;

    if (this.props.topNodes.nodes != null && this.props.topNodes.nodes != undefined) {
      return (
        <form
          id="filter-form"
          className="filter-forms"
        >
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
                    id="show-old-nodes-check"
                    checked={this.state.showOldNodes}
                    onChange={this.handleChangeShowOldNodes}
                    value={`${this.state.showOldNodes}`}
                    color="primary"
                  />
                }
                label="Show Previous Unlinked Nodes"
              />
            </Grid>
            {/* <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  id="is-static-check"
                  checked={this.props.isStatic}
                  onChange={this.handleChangeIsStatic}
                  value={`${this.props.isStatic}`}
                  color="primary"
                />
              }
              label="Static nodes in graph"
            />
          </Grid> */}
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
                    ref={this.mainPropertyRef}
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
                      ref={this.mainWeightRef}
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
                    if (typeof this.props.topNodes.nodes[0][element] != 'number' && element != 'Latitude'
                      && element != 'Longitude' && element != 'size' && element != 'color') {
                        
                      return <Grid key={"properties" + element} item>
                      
                        {
                          (this.props.propertyValues[element]) != undefined ?
                          <Grid
                            direction='column'
                            container>
                            <Grid item>
                              <label>{element}</label>
                            </Grid>
                            <Grid className="select-search-extra" item>
                              
                              <SelectSearch                                
                                id={element}
                                key={element}
                                search={true}
                                mode="input"
                                options={this.props.propertyValues[element]}
                                onChange={(e) => this.handleSelectPropertyChange(e, element)}
                                placeholder={element}
                                value={this.props.query[element]}
                              />
                            </Grid>
                          </Grid>
                          :
                          <TextField
                            id={element}
                            key={element}
                            label={element}
                            className={[classes.textField, 'filters'].join(" ")}
                            onChange={this.handleNodePropertyChange}
                            margin="normal"
                          />}
                      </Grid>
                    }
                    else if (element != 'latitude' && element != 'longitude' && element != 'size' && element != 'color' && element != 'x' && element != 'y') {
                      return <Grid
                        key={"properties" + element}
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
                              key={element + "1"}
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
                              key={element + "2"}
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
                    placeholder="Select a date"
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
                    onChange={this.handleTimestampToChange}
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
                disabled={this.state.resetCondition}
              >
                Apply Filters
            </Button>

            </Grid>
            <Grid item>
              <Button
                variant="contained" className={classes.button}
                onClick={this.handleResetFilters}                
                disabled={this.state.resetCondition}
              >
                Reset Filters
            </Button>

            </Grid>
          </Grid >
        </form >
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