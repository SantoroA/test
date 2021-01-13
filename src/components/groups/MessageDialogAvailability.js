import React, { useContext } from 'react';
import logo from '../../assets/dianurse-logo.png';
import { Context as AvailabilityContext } from '../../context/AvailabilityContext';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
	layout: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '2rem',
		textAlign: 'center'
	},
	logo: {
		width: '8rem',
		marginBottom: '2rem'
	},
	divider: {
		marginTop: '1rem',
		marginBottom: '1rem'
	},
	closeButton: {
		alignSelf: 'flex-end'
	}
});

export default function MessageDialogAvailability() {
	const { state: { dialogMessage, dialogOpen }, closeDialog } = useContext(AvailabilityContext);
	const classes = useStyles();
	return (
		<Dialog
			open={dialogOpen}
			onClose={closeDialog}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<Grid className={classes.layout}>
				<IconButton className={classes.closeButton} onClick={closeDialog} color="primary">
					<CloseIcon />
				</IconButton>
				<img src={logo} alt="Logo" className={classes.logo} />
				<Divider className={classes.divider} />
				<DialogContent>
					{dialogMessage ? (
						<DialogContentText id="alert-dialog-description">{dialogMessage}</DialogContentText>
					) : (
						<Loader type="TailSpin" color="black" height={50} width={50} />
					)}
				</DialogContent>
				<DialogActions />
			</Grid>
		</Dialog>
	);
}
