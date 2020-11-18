import React, { useContext } from 'react';
import useToggle from '../hooks/useToggle';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { Context as AuthContext } from '../context/AuthContext';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import RecoverPassDialog from './RecoverPassDialog';
import MessageDialog from './MessageDialog';
import { Context as LanguageContext } from '../context/LanguageContext';

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
	en: {
		greeting: 'Are you a patient?'
	},
	bg: {
		greeting: 'Вие сте пациент?'
	}
};

const GetStartedPatient = () => {
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
					<Grid item xs={6} md={4}>
						<RegisterForm amIHCP={false} />
					</Grid>
					<Grid item xs={6} md={4}>
						<LoginForm
							togglePasswordRecoveryOpen={togglePasswordRecoveryOpen}
							switchProfileText="Doctor"
							switchProfilePath="/getstarted/json?patient=1"
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

export default GetStartedPatient;
