import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import TimerIcon from '@material-ui/icons/Timer';

const useStyles = makeStyles({
	root: {
		borderColor: '#A0A4A8',
		color: '#A0A4A8',
		paddingTop: '0.8rem',
		paddingBottom: '0.8rem',
		paddingLeft: '0.5rem',
		paddingRight: '1.2rem',
		textTransform: 'none',
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'row'
	},
	icon: {
		marginRight: '0.3rem'
	}
});

const BoxTime = ({ children }) => {
	const classes = useStyles();
	return (
		<Box border={2} borderRadius={4} className={classes.root}>
			<TimerIcon className={classes.icon} />
			{children}
		</Box>
	);
};

export default BoxTime;
