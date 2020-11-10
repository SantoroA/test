import React, { useContext, useState, useEffect } from 'react';
import useToggle from '../hooks/useToggle';
import Navbar from '../components/Navbar';
import dianurseApi from '../api/dianurseApi';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import SigninForm from '../components/SigninForm';
import { Context as AuthContext } from '../context/AuthContext';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import RecoverPassDialog from '../components/RecoverPassDialog';
import MessageDialog from '../components/MessageDialog';

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

const PatientRegisterPage = () => {
	const [ passwordRecoveryOpen, togglePasswordRecoveryOpen ] = useToggle(false);
	const { state, signup, signin, clearErrorMessage, recoverPassword, closeDialog } = useContext(AuthContext);
	const classes = useStyles();

	useEffect(() => {
		clearErrorMessage();
		return clearErrorMessage();
	}, []);

	return (
		<div>
			<Navbar />
			<Container className={classes.container}>
				{/* <div>
					<AppBar className={classes.logo}>
						<img src={logo} alt="Logo" className={classes.img} />
					</AppBar>
				</div> */}
				<div className={classes.h1}>
					<h1>Are you a patient?</h1>
				</div>

				<Grid className={classes.forms} container spacing={4}>
					<Grid item xs={6} md={4}>
						<RegisterForm handleSubmit={signup} amIHCP={false} />
					</Grid>
					<Grid item xs={6} md={4}>
						<SigninForm
							handleSubmit={signin}
							errorMessage={state.errorMessage}
							togglePasswordRecoveryOpen={togglePasswordRecoveryOpen}
							switchProfileText="Go to Doctor Pofile"
							switchProfilePath="/doctorregister"
						/>
					</Grid>
				</Grid>
				<RecoverPassDialog
					recoverPassword={recoverPassword}
					togglePasswordRecoveryOpen={togglePasswordRecoveryOpen}
					passwordRecoveryOpen={passwordRecoveryOpen}
				/>
				<MessageDialog
					dialogMessage={state.dialogMessage}
					closeDialog={closeDialog}
					dialogOpen={state.messageDialogOpen}
				/>
			</Container>
		</div>
	);
};

export default PatientRegisterPage;
