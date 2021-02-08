import React, { useContext } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import DialogMessage from '../../components/groups/DialogMessage';
import logo from '../../assets/dianurse-logo.png';
import useToggle from '../../hooks/useToggle';
import FormRegister from '../../components/groups/FormRegister';
import FormLogin from '../../components/groups/FormLogin';
import DialogRecoverPassword from '../../components/groups/DialogRecoverPassword';
//MATERIAL UI
import Grid from '@material-ui/core/Grid';
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
	const { state: { dialogMessage, dialogOpen }, closeDialog, recoverPassword } = useContext(AuthContext);

	return (
		<div className={classes.root}>
			<Grid container>
				<Grid item className={classes.bgimage} xs={false} md={6} />
				<Grid item xs={12} md={6} className={classes.forms}>
					<img src={logo} alt="Logo" className={classes.logo} />
					{isLogin ? (
						<FormLogin
							loginCredentials={loginCredentials}
							togglePasswordRecoveryOpen={togglePasswordRecoveryOpen}
							toggleIsLogin={toggleIsLogin}
						/>
					) : (
						<FormRegister toggleIsLogin={toggleIsLogin} amIHCP={false} />
					)}
				</Grid>
			</Grid>
			<DialogRecoverPassword
				recoverPassword={recoverPassword}
				togglePasswordRecoveryOpen={togglePasswordRecoveryOpen}
				passwordRecoveryOpen={passwordRecoveryOpen}
			/>
			<DialogMessage open={dialogOpen} message={dialogMessage} close={closeDialog} />
		</div>
	);
};

export default GetStartedScreen;
