import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../components/SignupForm';
import Container from '@material-ui/core/Container';

const DoctorSignupPage = () => {
	return (
		<div>
			<Container>
				<h1>Are you a doctor? Sign up</h1>
				<SignupForm />
				<p>Are you a patient?</p>
				<Link to={'/'}>Go to Patient Profile</Link>
			</Container>
		</div>
	);
};

export default DoctorSignupPage;
