import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function MessageDialog({ messageDialogOpen, toggleMessageDialogOpen, dialogSuccessMessage }) {
	return (
		<div>
			<Dialog
				open={messageDialogOpen}
				onClose={toggleMessageDialogOpen}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{dialogSuccessMessage}</DialogTitle>
				{/* <DialogContent>
					<DialogContentText id="alert-dialog-description">{dialogSuccessMessage}</DialogContentText>
				</DialogContent> */}
				<DialogActions>
					<Button
						//TODO: redirect to email.
						onClick={toggleMessageDialogOpen}
						color="primary"
					>
						Go to email
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
