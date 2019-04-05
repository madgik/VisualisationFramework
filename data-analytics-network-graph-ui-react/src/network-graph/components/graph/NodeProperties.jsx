import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    // max: 700,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class NodeProperties extends React.Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.handleNeighborsClick = this.handleNeighborsClick.bind(this);
  }
  
  handleNeighborsClick(){
    this.props.getNeighbors(this.props.selectedGraph, this.props.selectedNode, this.props.graph);
  }


  render() {
    const { classes } = this.props;

    return (
      <div>
        {(this.props.selectedNode === '') ?
          <div>
          </div>
          :
          <div>
            <h3>Node Properties</h3>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  {this.props.graph.nodes.map((node, index) => {
                    if (node.id == this.props.selectedNode) {
                      return (
                        Object.keys(node).map(element => {
                          return (
                            <TableRow  key={element + "-" + node[element]}>
                              <TableCell padding="checkbox" >
                                {element}
                              </TableCell>
                              <TableCell padding="checkbox">
                                {node[element]}
                              </TableCell>
                            </TableRow>
                          )
                        })
                      )
                    }
                  })
                  }
                </TableHead>
              </Table>
            </Paper>
            <Button
               variant="contained" className={classes.button}
              onClick={this.handleNeighborsClick}
            >
              Find Neighbors
            </Button>
          </div>
        }
      </div>
    );
  }
}
NodeProperties.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NodeProperties);
