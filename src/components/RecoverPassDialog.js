import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const RecoverPassDialog = ({ toggleDialogOpen, dialogOpen, RecoverPassword }) => {
	const [ email, setEmail ] = useState('');
	return (
		<div>
			<Dialog open={dialogOpen} onClose={toggleDialogOpen} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Recover Password</DialogTitle>
				<DialogContent>
					<DialogContentText value={email} onChange={(e) => setEmail(e.target.value)}>
						Type in your email and we will send a password recovery email
					</DialogContentText>
					<TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth />
				</DialogContent>
				<DialogActions>
					<Button onClick={toggleDialogOpen} color="primary">
						Cancel
					</Button>
					<Button
						onClick={() => {
							console.log('clicked');
							toggleDialogOpen();
							RecoverPassword({ email });
						}}
						color="primary"
					>
						Send
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default RecoverPassDialog;
