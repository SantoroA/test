import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Context as AuthContext } from '../context/AuthContext';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
// import DialogTitle from '@material-ui/core/DialogTitle';

export default function MessageDialog() {
	const { state: { dialogMessage, dialogOpen }, closeDialog } = useContext(AuthContext);
	return (
		<div>
			<Dialog
				open={dialogOpen}
				onClose={closeDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogContent>
					{dialogMessage ? (
						<DialogContentText id="alert-dialog-description">{dialogMessage}</DialogContentText>
					) : (
						<Loader type="TailSpin" color="black" height={50} width={50} />
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={closeDialog} color="primary">
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
