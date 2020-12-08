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

const RegisterForm = () => {
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
		<Paper elevation={3} className={classes.paper}>
			<ValidatorForm
				onSubmit={() => {
					register({ email, preferredLanguage: language, subdomain });
					setEmail('');
				}}
				className={classes.form}
			>
				<h2>Register here and create an account</h2>

				<Grid className={classes.item}>
					<TextInput
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
					<FormControl>
						<Typography variant="subtitle1">Are you a patient or doctor?</Typography>
						<RadioGroup aria-label="is doctor" name="isDoctor" value={role} onChange={handleRoleChange}>
							<FormControlLabel value="patient" control={<Radio />} label="Patient" />
							<FormControlLabel value="doctor" control={<Radio />} label="Doctor" />
						</RadioGroup>
					</FormControl>
				</div>

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
				<ButtonFilled type="submit" variant="contained" color="primary" className={classes.submit}>
					Register
				</ButtonFilled>
			</ValidatorForm>
			<Typography variant="h6">Or register with your social media</Typography>
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
		</Paper>
	);
};

export default RegisterForm;
