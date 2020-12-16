import React, { useState, useContext } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as LanguageContext } from '../../context/LanguageContext';
import useToggle from '../../hooks/useToggle';
import { ValidatorForm } from 'react-material-ui-form-validator';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import AppleLogin from 'react-apple-login';
//CUSTOM UI
import ButtonFilled from '../customUi/ButtonFilled';
import TextInput from '../customUi/TextInput';
//Material UI
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FacebookIcon from '@material-ui/icons/Facebook';
import AppleIcon from '@material-ui/icons/Apple';
import { makeStyles } from '@material-ui/core/styles';

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
		height: '48px',
		margin: '1rem'
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
	}
}));

const RegisterForm = ({ toggleIsLogin }) => {
	const { register, handleFacebookRegister, handleGoogleRegister, handleAppleRegister } = useContext(AuthContext);
	const [ email, setEmail ] = useState('');
	const { state: { language } } = useContext(LanguageContext);
	const [ checked, toggleChecked ] = useToggle(false);
	const classes = useStyles();
	const [ role, setRole ] = useState('patient');

	const handleRoleChange = (event) => {
		setRole(event.target.value);
	};

	// console.log(amIHCP);
	let subdomain;
	if (language === 'bg_BG') {
		subdomain = 'bg';
	} else {
		subdomain = 'en';
	}

	return (
		<Grid container className={classes.container}>
			<Grid className={classes.formContainer} xs={6} item>
				<Typography variant="body1">Register here and create an account</Typography>
				<form
					onSubmit={(e) => {
						register({ email, preferredLanguage: language, subdomain });
						setEmail('');
					}}
				>
					<Paper elevation={0} className={classes.paper}>
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
						<div>
							<FormControl>
								<Typography variant="subtitle1">Are you a patient or doctor?</Typography>
								<RadioGroup
									aria-label="is doctor"
									name="isDoctor"
									value={role}
									onChange={handleRoleChange}
								>
									<FormControlLabel value="patient" control={<Radio />} label="Patient" />
									<FormControlLabel value="doctor" control={<Radio />} label="Doctor" />
								</RadioGroup>
							</FormControl>
						</div>
						<div>
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
								label={
									<React.Fragment>
										<Typography variant="body2">
											I agree to the{' '}
											<Link color="inherit" href="https://en.dianurse.com/terms">
												General Terms
											</Link>{' '}
											and{' '}
											<Link color="inherit" href="https://en.dianurse.com/privacy-policy">
												Privacy Policy
											</Link>
										</Typography>
									</React.Fragment>
								}
							/>
						</div>
					</Paper>
					<Grid container>
						<Grid item xs={6}>
							<Typography>Already have an account?</Typography>
							<Button onClick={toggleIsLogin}>Log In</Button>
						</Grid>
						<Grid item xs={6}>
							<ButtonFilled type="submit" variant="contained" color="primary" className={classes.submit}>
								Register
							</ButtonFilled>
						</Grid>
					</Grid>
				</form>
				<Divider className={classes.divider} />
				<Typography variant="body1">Or register with:</Typography>
				<Grid className={classes.redes} container>
					<FacebookLogin
						appId={process.env.REACT_APP_FACEBOOK_APP_ID}
						fields="name,email,picture"
						callback={(fbResponse) => {
							handleFacebookRegister({ fbResponse, language, subdomain });
						}}
						render={(renderProps) => (
							<ButtonFilled
								variant="contained"
								onClick={renderProps.onClick}
								color="primary"
								className={classes.socialMedia}
							>
								<FacebookIcon />
							</ButtonFilled>
						)}
					/>
					<GoogleLogin
						clientId="297099850421-9034me3t8n59qcm3fhkn7ek17pnbf3fl.apps.googleusercontent.com"
						render={(renderProps) => (
							<ButtonFilled
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								variant="contained"
								color="primary"
								className={classes.socialMedia}
							>
								<i className="fab fa-google" />
							</ButtonFilled>
						)}
						onSuccess={(ggResponse) => handleGoogleRegister({ ggResponse, language, subdomain })}
						onFailure={(ggResponse) => handleGoogleRegister({ ggResponse, language, subdomain })}
						cookiePolicy={'single_host_origin'}
					/>
					<AppleLogin
						clientId="com.react.apple.login"
						redirectURI=""
						responseType={'code'}
						responseMode={'query'}
						callback={(appleResponse) => {
							handleAppleRegister({ appleResponse, language, subdomain });
						}}
						render={(renderProps) => (
							<ButtonFilled
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								variant="contained"
								color="primary"
								className={classes.socialMedia}
							>
								<AppleIcon />
							</ButtonFilled>
						)}
					/>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default RegisterForm;
