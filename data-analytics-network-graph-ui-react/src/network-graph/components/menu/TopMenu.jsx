import React from 'react';


import GraphSelection from "./GraphSelection";

import DataImportForm from "../forms/DataImportForm";
import SelectGraphForm from "../forms/SelectGraphForm";
import ShowTopNodes from '../controls/ShowTopNodes';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ImportModal from '../forms/ImportModal'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class TopMenu extends React.Component {

  constructor(props) {
    super(props);
    this.handleAddNewClick = this.handleAddNewClick.bind(this);
    this.handleSidebarClick = this.handleSidebarClick.bind(this);
  }

  handleSidebarClick() {
    this.props.setOpenSidebar(true);
  }

  handleAddNewClick() {
    this.props.setOpenImportModal(!this.props.openImportModal);
  }
  render() {

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" >
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"
              onClick={this.handleSidebarClick}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" color="inherit" >
              <SelectGraphForm
                color="inherit"
                getAllGraphsMetadata={this.props.getAllGraphsMetadata}
                setSelectedGraph={this.props.setSelectedGraph}
                selectedGraph={this.props.selectedGraph}
                allGraphsMetadata={this.props.allGraphsMetadata}
              />

            </Typography>
            <Typography variant="h6" color="inherit" className={classes.grow}>

              <ShowTopNodes
                getTopNodes={this.props.getTopNodes}
                selectedGraph={this.props.selectedGraph}
                getAllTimestamps={this.props.getAllTimestamps}

              />
            </Typography>
            <ImportModal
              openImportModal={this.props.openImportModal}
              setOpenImportModal={this.props.setOpenImportModal}
              uploadFile={this.props.uploadFile}
              setFileValidation={this.props.setFileValidation}
              fileDetails={this.props.fileDetails}
            />
            <Button
              color="inherit"
              onClick={this.handleAddNewClick}
            >Add New Graph</Button>
          </Toolbar>

        </AppBar>
      </div>
    );
  }
}

TopMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopMenu);