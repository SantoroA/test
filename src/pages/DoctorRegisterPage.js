import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import Container from '@material-ui/core/Container';

const DoctorRegisterPage = () => {
	return (
		<div>
			<Container>
				<h1>Are you a doctor? Sign up</h1>
				<RegisterForm />
				<p>Are you a patient?</p>
				<Link to={'/'}>Go to Patient Profile</Link>
			</Container>
		</div>
	);
};

export default DoctorRegisterPage;
