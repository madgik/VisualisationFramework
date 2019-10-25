// in this modal i need to display a list for AllGraphsMetadata.
// copy paste the import modal

import React from "react";
import PropTypes from 'prop-types';
import DataImportForm from "./DataImportForm";
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';




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
			<Typography variant="h6">{children}</Typography>
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
class ImportModal extends React.Component {

	constructor(props) {
		super(props);
		// This binding is necessary to make `this` work in the callback
		// this.submit = this.submit.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleClose = () => {
		this.props.setOpenConfigGraphModal(false);
	};

	deleteItem = (item) => {
		console.log(item.id);
		this.props.deleteGraphMetadata(item.id);
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
					Delete Data
          </DialogTitle>
				<DialogContent>
					{/* <Typography variant="subtitle1" id="simple-modal-description"> */}
					{/* <DataImportForm
						username={this.props.username}
						uploadFile={this.props.uploadFile}
						setFileValidation={this.props.setFileValidation}
						fileDetails={this.props.fileDetails} /> */}
					{/* </Typography> */}
					<h1 id='title'>React Dynamic Table</h1>
					<div className='container'>
						{this.renderTableData()}
					</div>

				</DialogContent>

			</Dialog>
		);
	}

	renderTableData = () => {

		return Array.from(this.props.allGraphsMetadata).map((graphData) =>
			// <div className="row">
			// 	<Col xs={9}>{graphData.name}</Col><Col><Button>Delete</Button></Col>
			// </div>
			<div className="row">
				{/* <div>{graphData.name}</div> */}
				{/* <div><Button onClick={() => this.deleteItem(graphData)}>Delete</Button></div> */}
				<Grid item xs={6}>
					<Typography>{graphData.name}</Typography>
				</Grid>
				<Grid item xs={4}>
					<DeleteIcon onClick={() => this.deleteItem(graphData)} />
					{/* <DeleteForeverIcon /> */}
				</Grid>
			</div>
		);

	};


}





ImportModal.propTypes = {
	classes: PropTypes.object.isRequired,
};

// // We need an intermediary variable for handling the recursive nesting.
// const ImportModalWrapped = withStyles(styles)(ImportModal);

export default withStyles(styles)(ImportModal);

