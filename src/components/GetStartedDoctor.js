import React, { useContext } from 'react';
import useToggle from '../hooks/useToggle';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as LanguageContext } from '../context/LanguageContext';
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

const translationTest = {
	'en-EN': {
		greeting: 'Are you a doctor?'
	},
	'bg-BG': {
		greeting: 'Доктор ли си?'
	}
};

const DoctorRegisterPage = () => {
	const [ passwordRecoveryOpen, togglePasswordRecoveryOpen ] = useToggle(false);
	const { state: { language } } = useContext(LanguageContext);
	const { greeting } = translationTest[language];
	const { recoverPassword } = useContext(AuthContext);
	const classes = useStyles();

	return (
		<div>
			<Container className={classes.container}>
				<div className={classes.h1}>
					<h1>{greeting}</h1>
				</div>

				<Grid className={classes.forms} container spacing={4}>
					<Grid item xs={6} md={4}>
						<RegisterForm amIHCP={true} />
					</Grid>
					<Grid item xs={6} md={4}>
						<LoginForm
							togglePasswordRecoveryOpen={togglePasswordRecoveryOpen}
							switchProfileText="Patient"
							switchProfilePath="/getstarted/json?patient=0"
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

export default DoctorRegisterPage;
