import React from 'react';
import Navbar from '../../components/groups/Navbar';

import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import ButtonNoBorder from '../../components/customUi/ButtonNoBorder';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles({
	root: {
		background: 'linear-gradient(180deg, #F0F9FF 0%, #FFFFFF 50%)',
		backgroundPosition: 'cover',
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column'
	},
	container: {
		textAlign: 'center',
		justifyContent: 'center',
		marginTop: '3rem'
	},
	backButton: {
		textDecoration: 'none',
		display: 'flex',
		flexDirection: 'row',
		color: '#07B597',
		marginTop: '2rem',
		marginBottom: '2rem'
	},
	title: {
		marginBottom: '2rem',
		fontWeight: 700
	},
	sub: {
		fontWeight: 700,
		marginBottom: '1rem'
	},
	startButton: {
		marginTop: '2rem',
		paddingTop: '0.7rem',
		paddingBottom: '0.7rem',
		paddingRight: '1.5rem',
		paddingLeft: '1.5rem'
	},
	progress: {
		marginBottom: '2rem',
		marginRight: '2rem',
		marginLeft: '2rem',
		height: 10,
		borderRadius: 5,
		'& .MuiLinearProgress-bar': {
			borderRadius: 5
		}
	}
});
const StepWizardContainer = ({ children, title, progress }) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Navbar />
			<Container className={classes.container} maxWidth="md">
				<NavLink to="/in/patient/doctorsearch" className={classes.backButton}>
					<ButtonNoBorder onClick={() => {}}>
						<ArrowBackIcon />
						<Typography>Back</Typography>
					</ButtonNoBorder>
				</NavLink>
				<Typography className={classes.title} color="primary" variant="h3">
					{title}
				</Typography>
				<LinearProgress className={classes.progress} variant="determinate" value={progress} />
				{children}
			</Container>
		</div>
	);
};

export default StepWizardContainer;
