import React, { useState, useContext } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import logo from '../../assets/dianurse-logo.png';
import useToggle from '../../hooks/useToggle';
import RegisterForm from '../../components/groups/RegisterForm';
import LoginForm from '../../components/groups/LoginForm';
import RecoverPassDialog from '../../components/layout/RecoverPassDialog';
import MessageDialog from '../../components/layout/MessageDialog';
//MATERIAL UI
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: '#F4FAFF',
		background: 'cover'
	},
	bgimage: {
		height: '100vh',
		background: `url(${'https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3768131.jpg&fm=jpg'}) no-repeat center center`,
		backgroundSize: 'cover'
	},
	forms: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	logo: {
		width: '15rem',
		marginBottom: '2rem'
	}
});

const GetStartedScreen = (props) => {
	const { loginCredentials } = props.match.params;
	const classes = useStyles();

	//STATE
	const [ isLogin, toggleIsLogin ] = useToggle(true);
	const [ passwordRecoveryOpen, togglePasswordRecoveryOpen ] = useToggle(false);
	const { recoverPassword } = useContext(AuthContext);

	return (
		<div className={classes.root}>
			<Grid container>
				<Grid className={classes.bgimage} xs={0} md={6} />
				<Grid xs={12} md={6} className={classes.forms}>
					<img src={logo} alt="Logo" className={classes.logo} />
					{isLogin ? (
						<LoginForm
							loginCredentials={loginCredentials}
							togglePasswordRecoveryOpen={togglePasswordRecoveryOpen}
							toggleIsLogin={toggleIsLogin}
						/>
					) : (
						<RegisterForm amIHCP={false} toggleIsLogin={toggleIsLogin} />
					)}
				</Grid>
			</Grid>
			<RecoverPassDialog
				recoverPassword={recoverPassword}
				togglePasswordRecoveryOpen={togglePasswordRecoveryOpen}
				passwordRecoveryOpen={passwordRecoveryOpen}
			/>
			<MessageDialog />
		</div>
	);
};

export default GetStartedScreen;
