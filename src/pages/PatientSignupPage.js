import React, { useContext, useState } from 'react';
import useToggle from '../hooks/useToggle';
import dianurseApi from '../api/dianurseApi';
import { Link } from 'react-router-dom';
import SignupForm from '../components/SignupForm';
import SigninForm from '../components/SigninForm';
import { Context as AuthContext } from '../context/AuthContext';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../assets/dianurse-logo.png';
import AppBar from '@material-ui/core/AppBar';
import RecoverPassDialog from '../components/RecoverPassDialog';

const useStyles = makeStyles({
	logo: {
		maxWidth: '100%',
		height: '5%',
		display: 'flex',
		alignSelf: 'left',
		backgroundColor: '#fff'
	},
	h1: {
		paddingTop: '3em',
		textAlign: 'center'
	},
	img: {
		width: '8.5em',
		height: '1.5em',
		margin: '1em'
	}
});

const PatientSignupPage = () => {
	const [ dialogOpen, toggleDialogOpen ] = useToggle(false);
	const { state, signup, signin, clearErrorMessage } = useContext(AuthContext);
	const classes = useStyles();

	const recoverPassword = async ({ email }) => {
		try {
			await dianurseApi.post('/account/passwordrecovery');
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<div>
			<Container style={{ alignItems: 'center' }}>
				<AppBar className={classes.logo}>
					<img src={logo} alt="Logo" className={classes.img} />
				</AppBar>
				<h1 className={classes.h1}>Are you a patient?</h1>
				<div>
					<Grid container spacing={4}>
						<Grid item xs={6} sm={4}>
							<SignupForm handleSubmit={signup} />
						</Grid>
						<Grid item xs={6} sm={4}>
							<SigninForm handleSubmit={signin} toggleDialogOpen={toggleDialogOpen} />
						</Grid>
					</Grid>
					<div style={{ textAlign: 'center' }}>
						<p>Are you a doctor?</p>
						<Link to={'/doctorsignup'}>Go to Doctor Profile</Link>
					</div>
				</div>
				<RecoverPassDialog
					recoverPassword={recoverPassword}
					toggleDialogOpen={toggleDialogOpen}
					dialogOpen={dialogOpen}
				/>
			</Container>
		</div>
	);
};

export default PatientSignupPage;
