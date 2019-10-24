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
class ConfgurationModal extends React.Component {

	constructor(props) {
		super(props);
		// This binding is necessary to make `this` work in the callback
		// this.submit = this.submit.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleClose = () => {
		this.props.setOpenCongfigGraphModal(false);
	};


	render() {
		const { classes } = this.props;

		return (
			<Dialog
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={this.props.setOpenCongfigGraphModal}
				onClose={this.handleClose}
			>
				<DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
					Test the modal first...
          </DialogTitle>
				<DialogContent>
					{/* <Typography variant="subtitle1" id="simple-modal-description"> */}
					<DataImportForm
						username={this.props.username}
						uploadFile={this.props.uploadFile}
						setFileValidation={this.props.setFileValidation}
						fileDetails={this.props.fileDetails} />
					{/* </Typography> */}

				</DialogContent>

			</Dialog>
		);
	}
}

ConfgurationModal.propTypes = {
	classes: PropTypes.object.isRequired,
};

// // We need an intermediary variable for handling the recursive nesting.
// const ImportModalWrapped = withStyles(styles)(ImportModal);

export default withStyles(styles)(ConfgurationModal);

