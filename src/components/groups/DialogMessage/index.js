import React from 'react';
import logo from '../../../assets/dianurse-logo.png';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import useStyles from './style';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CloseIcon from '@material-ui/icons/Close';

export default function DialogMessage({ open, close, message }) {
	const classes = useStyles();
	return (
		<Dialog
			open={open}
			onClose={close}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<Grid className={classes.layout}>
				<IconButton className={classes.closeButton} onClick={close} color="primary">
					<CloseIcon />
				</IconButton>
				<img src={logo} alt="Logo" className={classes.logo} />
				<Divider className={classes.divider} />
				<DialogContent>
					{message ? (
						<DialogContentText id="alert-dialog-description">{message}</DialogContentText>
					) : (
						<Loader type="TailSpin" color="black" height={50} width={50} />
					)}
				</DialogContent>
				<DialogActions />
			</Grid>
		</Dialog>
	);
}
