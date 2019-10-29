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
import ImportModal from '../forms/ImportModal';
import ModalContainer from '../ui_utils/ModalComponent';
import ConfigurarionModal from '../forms/ConfigurarionModal';

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

  modalType = null;

  constructor(props) {
    super(props);
    this.handleAddNewClick = this.handleAddNewClick.bind(this);
    this.handleSidebarClick = this.handleSidebarClick.bind(this);
    //add this line due to not property find as handleAddNewClick.
    this.handleConfigGraphClick = this.handleConfigGraphClick.bind(this);
  }

  componentDidMount() {
    this.props.getAllGraphsMetadata();
  }

  handleSidebarClick() {
    this.props.setOpenSidebar(true);
  }

  handleAddNewClick() {
    this.props.setOpenImportModal(!this.props.openImportModal);
  }

  handleConfigGraphClick() {
    console.log('something..');
    // this.props.setOpenImportModal(!this.props.openImportModal);
    this.props.setOpenConfigGraphModal(!this.props.openConfigGraphModal);
    // this.deleteGraphMetadata('something');
  }


  render() {

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar openosition="static" >
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
                setFilename={this.props.setFilename}
                selectedGraph={this.props.selectedGraph}
                allGraphsMetadata={this.props.allGraphsMetadata}
              />

            </Typography>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <ShowTopNodes
                nodesNumber={this.props.nodesNumber}
                setNodesNumber={this.props.setNodesNumber}
                getTopNodes={this.props.getTopNodes}
                selectedGraph={this.props.selectedGraph}
                getAllTimestamps={this.props.getAllTimestamps}
              />
            </Typography>
            <ImportModal
              openImportModal={this.props.openImportModal}
              // modalType={this.modalType}
              setOpenImportModal={this.props.setOpenImportModal}
              uploadFile={this.props.uploadFile}
              getFromUrl={this.props.getFromUrl}
              setFileValidation={this.props.setFileValidation}
              fileDetails={this.props.fileDetails}
              username={this.props.username}
            />
            <ConfigurarionModal
              openConfigGraphModal={this.props.openConfigGraphModal}
              setOpenConfigGraphModal={this.props.setOpenConfigGraphModal}
              openConfirmModal={this.props.openConfirmModal}
              setOpenConfirmModal={this.props.setOpenConfirmModal}
              allGraphsMetadata={this.props.allGraphsMetadata}
              deleteGraphMetadata={this.props.deleteGraphMetadata}
            />

            <Button
              color="inherit"
              onClick={this.handleAddNewClick}
            >Add New Graph</Button>
            |
            <Button
              color="inherit"
              onClick={this.handleConfigGraphClick}
            >Config Graph</Button>
          </Toolbar>

        </AppBar>
        <ModalContainer
          modalType={this.sample}
          modalIsOpen={this.props.modalIsOpen}
          modalMessage={this.props.modalMessage}
          setModalIsOpen={this.props.setModalIsOpen}
        />
      </div>
    );
  }
}

TopMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopMenu);