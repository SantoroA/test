import React, { useContext, useEffect } from 'react';
import useToggle from '../hooks/useToggle';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import Container from '@material-ui/core/Container';
import { Context as AuthContext } from '../context/AuthContext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	h1: {
		marginTop: '3em',
		textAlign: 'center',
		padding: '2em',
		justifyContent: 'center'
	},

	container: {
		display: 'flex',
		justifyContent: 'center',
		marginBottom: '2em',
		flexDirection: 'column'
	},

	forms: {
		justifyContent: 'center'
	}
});

const DoctorRegisterPage = () => {
	const [ passwordRecoveryOpen, togglePasswordRecoveryOpen ] = useToggle(false);
	const { state, signup, signin, clearErrorMessage, recoverPassword, closeDialog } = useContext(AuthContext);
	const classes = useStyles();

	useEffect(() => {
		clearErrorMessage();
		return clearErrorMessage();
	}, []);
	return (
		<div>
			<Container>
				<h1>Are you a doctor? Sign up</h1>
				<RegisterForm handleSubmit={signup} amIHCP={true} />
				<p>Are you a patient?</p>
				<Link to={'/'}>Go to Patient Profile</Link>
			</Container>
		</div>
	);
};

export default DoctorRegisterPage;
