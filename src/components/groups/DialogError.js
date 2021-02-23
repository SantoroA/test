import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
//CUSTOM ICONS
import ErrorIcon from '../customIcons/ErrorIcon';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
	layout: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '3rem',
		textAlign: 'center'
	},

	closeButton: {
		alignSelf: 'flex-end'
	},
	icon: {
		fontSize: '5rem',
		marginTop: '1rem',
		marginBottom: '2rem'
	},
	text: {
		fontWeight: 'bold'
	}
});

export default function DialogError({ isOpen, close }) {
	const classes = useStyles();
	return (
		<Dialog
			open={isOpen}
			onClose={close}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<Grid className={classes.layout}>
				<IconButton className={classes.closeButton} onClick={close} color="secondary">
					<CloseIcon />
				</IconButton>
				<ErrorIcon className={classes.icon} />
				<Typography className={classes.text} variant="body1">
					We're sorry but there was an unexpected error. Please try again later.
				</Typography>
			</Grid>
		</Dialog>
	);
}
