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
const StepWizardContainer = ({ children, title, progress, previousStep, step }) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Navbar />
			<Container className={classes.container} maxWidth="md">
				{step === 1 ? (
					<NavLink className={classes.backButton} to="/in/patient/doctorsearch">
						<ButtonNoBorder onClick={previousStep}>
							<ArrowBackIcon />
							<Typography>Back</Typography>
						</ButtonNoBorder>
					</NavLink>
				) : (
					<ButtonNoBorder className={classes.backButton} onClick={previousStep}>
						<ArrowBackIcon />
						<Typography>Back</Typography>
					</ButtonNoBorder>
				)}
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
