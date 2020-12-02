import React, { useState, useContext } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';

const useStyles = makeStyles((theme) => ({
	container: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column'
	},
	paper: {
		padding: theme.spacing(4),
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		alignItems: 'center'
	},
	form: {
		width: '100%',
		justifyContent: 'center'
	},
	item: {
		padding: theme.spacing(1, 0)
	},
	submit: {
		width: '100%',
		margin: theme.spacing(3, 0, 2)
	},
	link: {
		borderWidth: 1,
		borderColor: 'black',
		textDecoration: 'none',
		padding: theme.spacing(1),
		borderRadius: 5
	},
	text: {
		marginTop: '0',
		textAlign: 'center'
	},
	socialMedia: {
		borderRadius: 15,
		height: 30,
		width: 30,
		padding: 20,
		minHeight: 0,
		minWidth: 0,
		fontSize: 20
	},
	redes: {
		marginTop: 20,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%'
	}
}));

const LoginForm = ({ togglePasswordRecoveryOpen, loginCredentials }) => {
	const decodeToken = () => {
		let decodedToken = atob(loginCredentials);
		let decoded = decodedToken.split('=');
		let decodedEmail = decoded[2];
		let decodedPass = decoded[1].split('&')[0];
		console.log(decodedEmail, decodedPass);
	};
	if (loginCredentials) {
		decodeToken();
	}
	// console.log(loginCredentials);
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const classes = useStyles();
	const { login, handleFacebookLogin, handleGoogleLogin } = useContext(AuthContext);
	const handleSubmit = () => {
		login({ email, password });
		setEmail('');
		setPassword('');
	};

	return (
		<div className={classes.container}>
			<Paper elevation={3} className={classes.paper}>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit();
					}}
					className={classes.form}
				>
					<h2>Already have an account? Log in here</h2>
					<Grid className={classes.item}>
						<TextField
							fullWidth
							type="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							label="Email"
							variant="outlined"
						/>
					</Grid>
					<Grid className={classes.item}>
						<TextField
							fullWidth
							required
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							label="Password"
							variant="outlined"
						/>
					</Grid>
					<Button variant="outlined" color="primary" onClick={togglePasswordRecoveryOpen}>
						Forgot your password?
					</Button>

					<Button type="submit" variant="contained" color="primary" className={classes.submit}>
						Log In
					</Button>
				</form>
				<Typography variant="h6">Or login with your social media</Typography>
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
								className={classes.socialMedia}
							>
								<FacebookIcon />
							</Button>
						)}
					/>
					<GoogleLogin
						clientId="297099850421-9034me3t8n59qcm3fhkn7ek17pnbf3fl.apps.googleusercontent.com"
						render={(renderProps) => (
							<Button
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								variant="contained"
								color="primary"
								className={classes.socialMedia}
							>
								<i className="fab fa-google" />
							</Button>
						)}
						onSuccess={(ggResponse) => handleGoogleLogin(ggResponse)}
						onFailure={(ggResponse) => handleGoogleLogin(ggResponse)}
						cookiePolicy={'single_host_origin'}
					/>
				</Grid>
			</Paper>
		</div>
	);
};

export default LoginForm;
