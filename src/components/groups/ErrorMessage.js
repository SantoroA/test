import React from 'react';
//CUSTOM ICONS
import ErrorIcon from '../customIcons/ErrorIcon';
//CUSTOM UI
import PaperCustomShadow from '../customUi/PaperCustomShadow';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	errorContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '20rem',
		flexDirection: 'column',
		textAlign: 'center',
		margin: '1rem'
	},
	icon: {
		fontSize: '5rem',
		marginTop: '1rem',
		marginBottom: '1rem'
	},
	text: {
		fontWeight: 'bold'
	}
});

const ErrorMessage = () => {
	const classes = useStyles();
	return (
		<PaperCustomShadow className={classes.errorContainer}>
			<ErrorIcon className={classes.icon} />
			<Typography className={classes.text} variant="body1">
				We're sorry but there was an unexpected error. Please try again later.
			</Typography>
		</PaperCustomShadow>
	);
};

export default ErrorMessage;
