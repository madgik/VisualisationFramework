// in this modal i need to display a list for AllGraphsMetadata.
// copy paste the import modal

import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';


import './styles/configurationModal.css';



const DialogTitle = withStyles(theme => ({
	root: {
		width: '500px',
		borderBottom: `1px solid ${theme.palette.divider}`,
		margin: 10,
		padding: theme.spacing.unit * 2,
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing.unit,
		top: theme.spacing.unit,
		color: theme.palette.grey[500],
	},
}))(props => {
	const { children, classes, onClose } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root}>
			<Typography variant="subtitle1">{children}</Typography>
			{onClose ? (
				<IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles(theme => ({
	root: {
		margin: 20,
		padding: theme.spacing.unit * 2,
	},
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
	root: {
		borderTop: `1px solid ${theme.palette.divider}`,
		margin: 20,
		padding: theme.spacing.unit,
	},
}))(MuiDialogActions);


const styles = theme => ({
	// paper: {
	//   position: 'absolute',
	//   width: theme.spacing.unit * 180,
	//   backgroundColor: theme.palette.background.paper,
	//   boxShadow: theme.shadows[5],
	//   padding: theme.spacing.unit * 4,
	//   outline: 'none',
	// },
});




class ConfigurationModal extends React.Component {

	constructor(props) {
		super(props);
		// This binding is necessary to make `this` work in the callback
		// this.submit = this.submit.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);


		// this.openConfirmModal = false;
	}

	handleClose = () => {
		this.props.setOpenConfigGraphModal(false);
	};




	handleDeleteClick = (item) => {
		if (window.confirm("Are you sure you want to delete " + item.name + " ?")) {
			// this.props.deleteGraphMetadata(item.id);
			alert(this.props.testMessageDelete);
		}
	}


	render() {
		const { classes } = this.props;
		console.log(this.props.allGraphsMetadata);


		return (
			<Dialog
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={this.props.openConfigGraphModal}
				onClose={this.handleClose}
			>
				<DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
					Select the Graph you wish to delete
            </DialogTitle>
				<DialogContent>
					<div className='container'>
						{this.renderTableData()}
					</div>
				</DialogContent>
			</Dialog>
		);
	}

	renderTableData = () => {

		return Array.from(this.props.allGraphsMetadata).map((graphData) =>
			<div >
				<Grid container spacing={3} justify="start"
					direction="row" alignItems="stretch" className="selectedLine">
					<Grid item xs={11}>
						<Typography fontSize={16} className="selectedRow">{graphData.name}</Typography>
					</Grid>
					<Grid item xs={1}>
						<DeleteIcon className="deleteIcon" onClick={() => this.handleDeleteClick(graphData)} />
					</Grid>

				</Grid>
			</div>
		);

	};


}





ConfigurationModal.propTypes = {
	classes: PropTypes.object.isRequired,
};

// // We need an intermediary variable for handling the recursive nesting.
// const ImportModalWrapped = withStyles(styles)(ImportModal);

export default withStyles(styles)(ConfigurationModal);

