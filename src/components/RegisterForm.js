import React, { useState, useContext } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TwitterIcon from '@material-ui/icons/Twitter';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import AppleIcon from '@material-ui/icons/Apple';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import { makeStyles } from '@material-ui/core/styles';
import useToggle from '../hooks/useToggle';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Context as LanguageContext } from '../context/LanguageContext';

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
		color: 'primary',
		borderRadius: 15,
		height: 30,
		width: 30,
		padding: 20,
		minHeight: 0,
		minWidth: 0
	},
	redes: {
		marginTop: 20,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%'
	}
}));

const RegisterForm = ({ handleSubmit, amIHCP, facebookSignin }) => {
	const [ email, setEmail ] = useState('');
	const { state: { language } } = useContext(LanguageContext);
	const [ checked, toggleChecked ] = useToggle(false);
	const classes = useStyles();

	return (
		<Paper elevation={3} className={classes.paper}>
			<ValidatorForm
				onSubmit={() => handleSubmit({ email, amIHCP, preferredLang: language })}
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
				<Button
					variant="contained"
					color="primary"
					className={classes.socialMedia}
					onClick={() => facebookSignin()}
				>
					<FacebookIcon />
				</Button>

				<Button variant="contained" color="primary" className={classes.socialMedia}>
					<AppleIcon />
				</Button>

				<Button variant="contained" color="primary" className={classes.socialMedia}>
					<MailOutlineIcon />
				</Button>
			</Grid>
		</Paper>
	);
};

export default RegisterForm;
