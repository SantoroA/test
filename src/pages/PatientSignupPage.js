import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../components/SignupForm';
import SigninForm from '../components/SigninForm';
import { Context as AuthContext } from '../context/AuthContext';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../assets/dianurse-logo.png';
import AppBar from '@material-ui/core/AppBar';

const useStyles = makeStyles({
	logo: {
	  maxWidth: '100%',
	  height: '5%',
	  display: 'flex',
	  alignSelf: 'left',
	  backgroundColor: '#fff',
	  justifyContent: 'center',
	},
	h1: {
	  marginTop: '3em',
	  textAlign: 'center',
	  padding: '2em',
	  justifyContent: 'center',
	},
	img: {
		width: '8.5em',
		height: '1.5em',
		paddingInlineStart: '1em',
	},
	container: {
		display: 'flex',
		justifyContent: 'center',
		marginBottom: '2em',
		flexDirection: 'column',
	},
	text: {
		marginTop: '0',
		textAlign: 'center',
	}
  });

const PatientSignupPage = () => {
	const { state, signup, signin, clearErrorMessage } = useContext(AuthContext);
	const classes = useStyles();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('submitting');
	};
	return (
		<div>
			<Container className={ classes.container }>
				<div>
				<AppBar className={ classes.logo }><img src={logo} alt='Logo' className={ classes.img }></img>
				</AppBar>
				</div>
				<div className={ classes.h1 }>
				<h1>Are you a patient?</h1>
				</div>
				<form>
				<Grid container spacing={4}>
					<Grid item xs={6} sm={4}>
						<SignupForm handleSubmit={signup} />
					</Grid>
					<Grid item xs={6} sm={4}>
						<SigninForm handleSubmit={signin} />
					</Grid>
					</Grid>
					<div className={ classes.text }>
				<p>Are you a doctor?</p>
				<Link to={'/doctorsignup'}>Go to Doctor Profile</Link>
				</div>
				</form>
			</Container>
		</div>
	);
};

export default PatientSignupPage;
