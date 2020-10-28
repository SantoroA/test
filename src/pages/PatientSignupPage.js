import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../components/SignupForm';
import SigninForm from '../components/SigninForm';
import { Context as AuthContext } from '../context/AuthContext';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const PatientSignupPage = () => {
	const { state, signup, signin, clearErrorMessage } = useContext(AuthContext);
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('submitting');
	};
	return (
		<div>
			<Container style={{ alignItems: 'center' }}>
				<h1>Are you a patient?</h1>
				<Grid container spacing={4}>
					<Grid xs={4}>
						<SignupForm handleSubmit={signup} />
					</Grid>
					<Grid xs={4}>
						<SigninForm handleSubmit={signin} />
					</Grid>
				</Grid>
				<p>Are you a doctor?</p>
				<Link to={'/doctorsignup'}>Go to Doctor Profile</Link>
			</Container>
		</div>
	);
};

export default PatientSignupPage;
