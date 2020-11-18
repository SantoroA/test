import React, { useContext, useState, useEffect } from 'react';
import useToggle from '../hooks/useToggle';
import RegisterForm from './RegisterForm';
import SigninForm from './SigninForm';
import { Context as AuthContext } from '../context/AuthContext';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import RecoverPassDialog from './RecoverPassDialog';
import MessageDialog from './MessageDialog';

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
			<Container className={classes.container}>
				<div className={classes.h1}>
					<h1>Are you a doctor?</h1>
				</div>

				<Grid className={classes.forms} container spacing={4}>
					<Grid item xs={6} md={4}>
						<RegisterForm handleSubmit={signup} amIHCP={true} />
					</Grid>
					<Grid item xs={6} md={4}>
						<SigninForm
							handleSubmit={signin}
							errorMessage={state.errorMessage}
							togglePasswordRecoveryOpen={togglePasswordRecoveryOpen}
							switchProfileText="Patient"
							switchProfilePath="/"
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

export default DoctorRegisterPage;
