import React, { useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as LanguageContext } from '../context/LanguageContext';
import useToggle from '../hooks/useToggle';
import RegisterForm from './forms/RegisterForm';
import LoginForm from './forms/LoginForm';
import RecoverPassDialog from './RecoverPassDialog';
import MessageDialog from './MessageDialog';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	forms: {
		justifyContent: 'center'
	},
	container: {
		display: 'flex',
		justifyContent: 'center',
		marginBottom: '2em',
		flexDirection: 'column'
	},
	h1: {
		marginTop: '3em',
		textAlign: 'center',
		padding: '2em',
		justifyContent: 'center'
	}
});

const translationTest = {
	en_US: {
		greeting: "Hi there! Let's get started!"
	},
	bg_BG: {
		greeting: 'Здрасти! Да започваме!'
	}
};

const GetStarted = ({ loginCredentials }) => {
	const [ passwordRecoveryOpen, togglePasswordRecoveryOpen ] = useToggle(false);
	const { recoverPassword } = useContext(AuthContext);
	const { state: { language } } = useContext(LanguageContext);
	const { greeting } = translationTest[language];
	const classes = useStyles();

	return (
		<div>
			<Container className={classes.container}>
				<div className={classes.h1}>
					<h1>{greeting}</h1>
				</div>

				<Grid className={classes.forms} container spacing={4}>
					<Grid item xs={12} sm={6} md={4}>
						<RegisterForm amIHCP={false} />
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<LoginForm
							loginCredentials={loginCredentials}
							togglePasswordRecoveryOpen={togglePasswordRecoveryOpen}
						/>
					</Grid>
				</Grid>
				<RecoverPassDialog
					recoverPassword={recoverPassword}
					togglePasswordRecoveryOpen={togglePasswordRecoveryOpen}
					passwordRecoveryOpen={passwordRecoveryOpen}
				/>
				<MessageDialog />
			</Container>
		</div>
	);
};

export default GetStarted;
