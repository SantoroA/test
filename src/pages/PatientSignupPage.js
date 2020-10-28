import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../components/SignupForm';
import Container from '@material-ui/core/Container';

const PatientSignupPage = () => {
	return (
		<div>
			<Container>
				<h1>Are you a patient?</h1>
				<SignupForm />
				<p>Are you a doctor?</p>
				<Link to={'/doctorsignup'}>Go to Doctor Profile</Link>
			</Container>
		</div>
	);
};

export default PatientSignupPage;
