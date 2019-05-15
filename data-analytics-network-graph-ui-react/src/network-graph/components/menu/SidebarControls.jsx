import React from "react";
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import DataImportForm from "../forms/DataImportForm";
import GraphFilter from "../controls/GraphFilter";
import GraphControls from "../controls/GraphControls";
import SelectGraphForm from "../forms/SelectGraphForm";
import Drawer from '@material-ui/core/Drawer';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import NodePropeties from "../graph/NodeProperties";
import LinkProperties from "../graph/LinkProperties";
import { callbackify } from "util";


const drawerWidth = 340;

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    top:'65px',
    height: `calc(100% - 150px)`,
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class SidebarControls extends React.Component {

  constructor(props) {
    super(props)
    this.handleDrawerClose=this.handleDrawerClose.bind(this);
  }

 

  handleDrawerClose = () => {
    this.props.setOpenSidebar(false);
  };

  render() {

    const { classes, theme } = this.props;


    return (
        <div className="sidebar-controls">
      <Drawer
        id="left-sidebar"
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={this.props.openSidebar}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Grid container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid>
            <GraphFilter
              graph={this.props.graph}
              currentDate={this.props.currentDate}
              selectedGraph={this.props.selectedGraph}
              getDateGraph={this.props.getDateGraph}
              timestamps={this.props.timestamps}
              timestampFrom={this.props.timestampFrom}
              timestampTo={this.props.timestampTo}
              showOldNodes={this.props.showOldNodes}
              setShowOldNodes={this.props.setShowOldNodes}
              getFilteredGraph={this.props.getFilteredGraph}
              setTimestampFrom={this.props.setTimestampFrom}
              setTimestampTo={this.props.setTimestampTo}
              setFilteredTimestamps={this.props.setFilteredTimestamps}
            />
          </Grid>
          <Grid item spacing={8}>
          <Divider/>
              <NodePropeties
                graph={this.props.graph}
                topNodes={this.props.topNodes}
                selectedGraph={this.props.selectedGraph}
                selectedNode={this.props.selectedNode}
                getNeighbors={this.props.getNeighbors}
                graphData={this.props.graphData}
              />
            </Grid>
            <Grid item spacing={8}>
            <Divider/>
              <LinkProperties
                selectedWeight={this.props.selectedWeight}
                selectedLink={this.props.selectedLink}
              />
            </Grid>

        </Grid>

      </Drawer>
      </div>
     
    );
  }
}
 // <div className="sidebar-controls">

      // </div>
SidebarControls.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SidebarControls);