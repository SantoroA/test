import React, { useState, useContext } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
//CUSTOM ICONS
import ErrorIcon from '../customIcons/ErrorIcon';
import { DOCUMENTS_QUERY } from '../../context/GraphQl/graphQlQuery';
import { Context as AuthContext } from '../../context/AuthContext';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
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
	buttonWrapper: {
		paddingTop: '2rem',
		width: '100%',
		display: 'flex',
		justifyContent: 'flex-end'
	},
	text: {
		fontWeight: 'bold'
	},
	cancelButton: {
		marginRight: '1rem',
		textTransform: 'none'
	},
	confirmButton: {
		textTransform: 'none',
		fontWeight: 'bold'
	},
	icon: {
		fontSize: '5rem',
		marginTop: '1rem',
		marginBottom: '2rem'
	},
	closeButton: {
		alignSelf: 'flex-end'
	}
});

const DialogConfirm = ({ isOpen, close, action, actionText, confirmButton, idApt, oldFile, refetch }) => {
	const [ hasError, setHasError ] = useState(false);
	const { state: { userId } } = useContext(AuthContext);
	const classes = useStyles();
	return (
		<Dialog
			open={isOpen}
			onClose={() => {
				close();
				setHasError(false);
			}}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			{hasError ? (
				<Grid container className={classes.layout}>
					<IconButton
						className={classes.closeButton}
						onClick={() => {
							close();
							setHasError(false);
						}}
						color="secondary"
					>
						<CloseIcon />
					</IconButton>
					<ErrorIcon className={classes.icon} />
					<Typography className={classes.text} variant="body1">
						We're sorry but there was an unexpected error. Please try again later.
					</Typography>
				</Grid>
			) : (
				<Grid container className={classes.layout}>
					<Typography className={classes.text} variant="body1">
						Are you sure you want to {actionText}?
					</Typography>
					<Grid item className={classes.buttonWrapper}>
						<Button
							className={classes.cancelButton}
							onClick={() => {
								close();
								setHasError(false);
							}}
						>
							Cancel
						</Button>
						<Button
							className={classes.confirmButton}
							onClick={async (e) => {
								e.preventDefault();
								try {
									await action();
									close();
								} catch (err) {
									console.log(err);
									setHasError(true);
								}
							}}
							color="secondary"
							variant="contained"
						>
							{confirmButton}
						</Button>
					</Grid>
				</Grid>
			)}
		</Dialog>
	);
};
export default DialogConfirm;
