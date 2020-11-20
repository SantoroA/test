import React, { useState, useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as LanguageContext } from '../context/LanguageContext';

import useToggle from '../hooks/useToggle';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FacebookIcon from '@material-ui/icons/Facebook';
import { makeStyles } from '@material-ui/core/styles';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import { ValidatorForm } from 'react-material-ui-form-validator';

const useStyles = makeStyles((theme) => ({
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

const RegisterForm = ({ amIHCP }) => {
	const { register, handleFacebookLogin, handleGoogleLogin } = useContext(AuthContext);
	const [ email, setEmail ] = useState('');
	const { state: { language } } = useContext(LanguageContext);
	const [ checked, toggleChecked ] = useToggle(false);
	const classes = useStyles();

	let subdomain;
	if (language === 'bg_BG') {
		subdomain = 'bg';
	} else {
		subdomain = 'en';
	}

	return (
		<Paper elevation={3} className={classes.paper}>
			<ValidatorForm
				onSubmit={() => {
					register({ email, amIHCP, preferredLanguage: language, subdomain });
					setEmail('');
				}}
				className={classes.form}
			>
				<h2>Register here and create an account</h2>

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

				<div className={classes.item}>
					<FormControlLabel
						control={
							<Checkbox
								checked={checked}
								required
								onChange={toggleChecked}
								name="checked"
								color="primary"
							/>
						}
						label="I agree to the General Terms and Privacy Policy"
					/>
				</div>
				<Button type="submit" variant="contained" color="primary" className={classes.submit}>
					Register
				</Button>
			</ValidatorForm>
			<Typography variant="h6">Or login with your social media</Typography>
			<Grid className={classes.redes} container>
				<FacebookLogin
					appId={process.env.REACT_APP_FACEBOOK_APP_ID}
					fields="name,email,picture"
					callback={(response) => {
						handleFacebookLogin(response);
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
					onSuccess={(response) => handleGoogleLogin(response)}
					onFailure={(response) => handleGoogleLogin(response)}
					cookiePolicy={'single_host_origin'}
				/>
			</Grid>
		</Paper>
	);
};

export default RegisterForm;
