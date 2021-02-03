import React, { useState, useContext, useEffect } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import AppleLogin from 'react-apple-login';
//CUSTOM UI
import ButtonFilled from '../customUi/ButtonFilled';
import PaperCustomShadow from '../customUi/PaperCustomShadow';
import TextInput from '../customUi/TextInput';
//CUSTOM ICONS
import GoogleIcon from '../customIcons/GoogleIcon';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import AppleIcon from '@material-ui/icons/Apple';

const useStyles = makeStyles((theme) => ({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex',
		flexDirection: 'column'
	},
	paper: {
		padding: '2rem',
		display: 'flex',
		flexDirection: 'column',
		marginBottom: '2rem',
		marginTop: '2rem'
	},
	formContainer: {
		width: '100%',
		justifyContent: 'center',
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center'
	},
	inputs: {
		marginBottom: '1rem'
	},
	submit: {
		width: '100%',
		height: '3rem'
	},
	redes: {
		marginTop: 20,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%'
	},
	divider: {
		marginTop: '1rem',
		marginBottom: '1rem'
	},
	facebookButton: {
		borderRadius: '3px',
		backgroundColor: '#1877f2',
		color: 'white',
		width: '40px',
		height: '40px',
		textTransform: 'none',
		'&:hover': {
			backgroundColor: '#3B5998'
		}
	},
	googleButton: {
		borderRadius: '3px',
		backgroundColor: 'white',
		width: '40px',
		height: '40px'
	},
	appleButton: {
		borderRadius: '3px',
		backgroundColor: 'black',
		color: '#fff',
		width: '40px',
		height: '40px',
		'&:hover': {
			backgroundColor: '#fff',
			color: '#000'
		}
	},
	textButton: {
		textTransform: 'none',
		'&:hover': {
			color: '#00A99D'
		}
	},
	submitWrapper: {
		paddingLeft: '1rem',
		paddingRight: '1rem'
	}
}));

const LoginForm = ({ togglePasswordRecoveryOpen, toggleIsLogin, loginCredentials }) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const classes = useStyles();
	const { login, handleFacebookLogin, handleGoogleLogin, handleAppleLogin } = useContext(AuthContext);
	useEffect(() => {
		if (loginCredentials) {
			let decodedToken = atob(loginCredentials);
			let decoded = decodedToken.split('=');
			setEmail(decoded[2]);
			setPassword(decoded[1].split('&')[0]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = async () => {
		await login({ email, password });
		setEmail('');
		setPassword('');
	};

	return (
		<Grid container className={classes.container}>
			<Grid className={classes.formContainer} xs={10} md={6} item>
				<Typography variant="body1">Already have an account? Log in here</Typography>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit();
					}}
				>
					<PaperCustomShadow className={classes.paper}>
						<div className={classes.inputs}>
							<TextInput
								fullWidth
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								label="Email"
								variant="outlined"
							/>
						</div>

						<TextInput
							fullWidth
							required
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							label="Password"
							variant="outlined"
						/>
					</PaperCustomShadow>
					<Grid container>
						<Grid item xs={6}>
							<Button className={classes.textButton} onClick={togglePasswordRecoveryOpen}>
								Forgot your password?
							</Button>
							<Button className={classes.textButton} onClick={toggleIsLogin}>
								Sign up now
							</Button>
						</Grid>
						<Grid className={classes.submitWrapper} item xs={6}>
							<ButtonFilled type="submit" variant="contained" color="primary" className={classes.submit}>
								Log In
							</ButtonFilled>
						</Grid>
					</Grid>
				</form>
				<Divider className={classes.divider} />
				<Typography variant="body1">Or login with:</Typography>
				<Grid className={classes.redes} container>
					<FacebookLogin
						appId={process.env.REACT_APP_FACEBOOK_APP_ID}
						fields="name,email,picture"
						callback={(fbResponse) => {
							handleFacebookLogin(fbResponse);
						}}
						render={(renderProps) => (
							<Button
								variant="contained"
								onClick={renderProps.onClick}
								color="primary"
								className={classes.facebookButton}
							>
								<FacebookIcon />
							</Button>
						)}
					/>
					<GoogleLogin
						clientId="297099850421-9034me3t8n59qcm3fhkn7ek17pnbf3fl.apps.googleusercontent.com"
						onSuccess={(ggResponse) => handleGoogleLogin(ggResponse)}
						onFailure={(ggResponse) => handleGoogleLogin(ggResponse)}
						cookiePolicy={'single_host_origin'}
						render={(renderProps) => (
							<Button variant="contained" onClick={renderProps.onClick} className={classes.googleButton}>
								<GoogleIcon />
							</Button>
						)}
					/>

					<AppleLogin
						clientId="com.react.apple.login"
						redirectURI=""
						responseType={'code'}
						responseMode={'query'}
						callback={(appleResponse) => {
							handleAppleLogin({ appleResponse });
						}}
						render={(renderProps) => (
							<Button variant="contained" onClick={renderProps.onClick} className={classes.appleButton}>
								<AppleIcon />
							</Button>
						)}
					/>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default LoginForm;
