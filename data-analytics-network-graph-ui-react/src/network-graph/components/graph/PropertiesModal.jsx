import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NodePropeties from "../graph/NodeProperties";
import LinkProperties from "../graph/LinkProperties";

const customStyles = {
  
  top: '66%',
  left: 'auto',
  right: '5px',
  bottom: 'auto',
  marginRight: '-5%',
  transform: 'translate(-50%, -50%)',
  opacity: '1',
  border: '1px solid gray',
  overflow: 'scroll',
  maxHeight: '43vh'
};

const styles = {
  root: {
    backgroundColor: "transparent"
  },

  paper: {
    backgroundColor: "transparent",
    boxShadow: "none",
    overflow: "hidden"
  },
};

class PropertiesModal extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <Dialog
        open={this.props.propModalIsOpen}
        // onAfterOpen={this.afterOpenModal}
        onClose={this.closeModal}
        style={customStyles}
        className="node_props"
        contentLabel="Example Modal"
        overlayClassName="overlay"
        BackdropProps={{
          classes: {
            root: classes.root
          }
        }
        }
        PaperProps={{
          classes: {
            root: classes.paper
          }
        }}

      >
        <NodePropeties
          graph={this.props.graph}
          topNodes={this.props.topNodes}
          selectedGraph={this.props.selectedGraph}
          selectedNode={this.props.selectedNode}
          getNeighbors={this.props.getNeighbors}
          graphData={this.props.graphData}
        />

        <LinkProperties
          selectedWeight={this.props.selectedWeight}
          selectedLink={this.props.selectedLink}
        />
      </Dialog>
    );
  }
}

PropertiesModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PropertiesModal)
