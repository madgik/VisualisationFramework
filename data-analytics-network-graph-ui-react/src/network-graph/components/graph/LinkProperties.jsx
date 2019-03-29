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

class LinkProperties extends React.Component {


    render() {


        const { classes } = this.props;

        return (
            <div>
                {(this.props.selectedWeight === '') ?
                    <div>
                    </div>
                    :
                    <div>
                        <h3>Link Properties</h3>
                        <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="checkbox">
                                            Weight
                                        </TableCell>
                                        <TableCell padding="checkbox">
                                            {this.props.selectedWeight}
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </Paper>
                    </div>
                }
            </div>
        );
    }
}

LinkProperties.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinkProperties);
