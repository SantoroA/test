import React from 'react';
//CUSTOM ICONS
import SuccessIcon from '../customIcons/SuccessIcon';
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

const SuccessMessage = () => {
	const classes = useStyles();
	return (
		<PaperCustomShadow className={classes.errorContainer}>
			<SuccessIcon className={classes.icon} />
			<Typography className={classes.text} variant="body1">
				Great! Your document has been sent successfully.
			</Typography>
		</PaperCustomShadow>
	);
};

export default SuccessMessage;
