import React, { useState, useContext } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as LanguageContext } from '../../context/LanguageContext';
import useToggle from '../../hooks/useToggle';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import AppleLogin from 'react-apple-login';
//CUSTOM UI
import ButtonFilled from '../customUi/ButtonFilled';
import RadioStyled from '../customUi/RadioStyled';
import TextInput from '../customUi/TextInput';
import PaperCustomShadow from '../customUi/PaperCustomShadow';
//CUSTOM ICONS
import GoogleIcon from '../customIcons/GoogleIcon';
//Material UI
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
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
		marginTop: '1.5rem'
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

	radioGroup: {
		marginTop: '1.5rem',
		backgroundColor: '#D7FEF1',
		paddingLeft: '1rem'
	},
	textButton: {
		textTransform: 'none',
		'&:hover': {
			color: '#00A99D'
		}
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
	submitWrapper: {
		paddingLeft: '1rem',
		paddingRight: '1rem'
	}
}));

const RegisterForm = ({ toggleIsLogin }) => {
	const { register, handleFacebookRegister, handleGoogleRegister, handleAppleRegister } = useContext(AuthContext);
	const [ email, setEmail ] = useState('');
	const { state: { language } } = useContext(LanguageContext);
	const [ checked, toggleChecked ] = useToggle(false);
	const classes = useStyles();
	const [ isHCP, setIsHCP ] = useState('patient');

	const handleRoleChange = (event) => {
		setIsHCP(event.target.value);
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
			<Grid className={classes.formContainer} xs={10} md={6} item>
				<Typography variant="body1">Register here and create an account</Typography>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						register({
							email,
							preferredLanguage: language,
							subdomain,
							isHCP: isHCP === 'patient' ? false : true
						});
						setEmail('');
					}}
				>
					<PaperCustomShadow elevation={1} className={classes.radioGroup}>
						<FormControl>
							<RadioGroup
								row
								aria-label="is doctor"
								name="isDoctor"
								value={isHCP}
								onChange={handleRoleChange}
							>
								<FormControlLabel value="patient" control={<RadioStyled />} label="I am a Patient" />
								<FormControlLabel value="doctor" control={<RadioStyled />} label="I am a Doctor" />
							</RadioGroup>
						</FormControl>
					</PaperCustomShadow>
					<PaperCustomShadow elevation={0} className={classes.paper}>
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
					</PaperCustomShadow>
					<Grid container>
						<Grid item xs={6}>
							<Typography>Already have an account?</Typography>
							<Button className={classes.textButton} onClick={toggleIsLogin}>
								Log In
							</Button>
						</Grid>
						<Grid item className={classes.submitWrapper} xs={6}>
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
							let role;
							if (isHCP === 'patient') {
								role = false;
							} else {
								role = true;
							}
							handleFacebookRegister({ fbResponse, language, subdomain, isHCP: role });
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
						onSuccess={(ggResponse) => {
							let role;
							if (isHCP === 'patient') {
								role = false;
							} else {
								role = true;
							}
							handleGoogleRegister({ ggResponse, language, subdomain, isHCP: role });
						}}
						onFailure={(ggResponse) => handleGoogleRegister({ ggResponse, language, subdomain })}
						render={(renderProps) => (
							<Button variant="contained" onClick={renderProps.onClick} className={classes.googleButton}>
								<GoogleIcon />
							</Button>
						)}
						cookiePolicy={'single_host_origin'}
					/>

					<AppleLogin
						clientId="com.react.apple.login"
						redirectURI=""
						responseType={'code'}
						responseMode={'query'}
						callback={(appleResponse) => {
							let role;
							if (isHCP === 'patient') {
								role = false;
							} else {
								role = true;
							}
							handleAppleRegister({ appleResponse, language, subdomain, isHCP: role });
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

export default RegisterForm;
