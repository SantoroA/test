import React, { useState, useEffect, useContext } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import logo from '../../assets/dianurse-logo.png';
//CUSTOM UI
import ButtonFilled from '../customUi/ButtonFilled';
import PaperCustomShadow from '../customUi/PaperCustomShadow';
import TextInput from '../customUi/TextInput';
//MATERIAL UI
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	layout: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '2rem',
		textAlign: 'center',
		width: '100%'
	},
	paper: {
		padding: '2rem',
		display: 'flex',
		flexDirection: 'column',
		marginBottom: '2rem',
		marginTop: '2rem'
		// width: '100%'
	},
	logo: {
		width: '10rem',
		marginBottom: '2rem'
	},
	divider: {
		marginTop: '1rem',
		marginBottom: '1rem'
	},
	form: {
		width: '100%'
	},
	submit: {
		width: '100%',
		height: '48px'
	},
	passGenerate: {
		textTransform: 'none',
		fontWeight: 600,
		width: '100%',
		height: '48px',
		borderWidth: '2px',
		borderRadius: '10px'
	},
	textInput: {
		marginBottom: '1rem'
	},
	buttons: {
		justifyContent: 'space-around'
	}
}));

const ChangePasswordForm = ({ recToken }) => {
	const classes = useStyles();
	const { changePassword } = useContext(AuthContext);
	const [ newPassword, setNewPassword ] = useState('');
	const [ newPasswordMatch, setNewPasswordMatch ] = useState('');
	useEffect(
		() => {
			ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
				if (value !== newPassword) {
					return false;
				}
				return true;
			});
		},
		[ newPassword ]
	);

	return (
		<Grid container className={classes.layout}>
			<img src={logo} alt="Logo" className={classes.logo} />
			<Divider className={classes.divider} />
			<Typography variant="body1">Hi. Please choose your new password.</Typography>
			<ValidatorForm
				onSubmit={() => {
					changePassword({ newPassword, newPasswordMatch, recToken });
				}}
				className={classes.form}
			>
				<PaperCustomShadow className={classes.paper}>
					<Grid className={classes.textInput}>
						<TextValidator
							fullWidth
							type="password"
							required
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							label="New Password"
							variant="outlined"
							validators={[ 'required' ]}
						/>
					</Grid>
					<Grid>
						<TextValidator
							fullWidth
							type="password"
							required
							value={newPasswordMatch}
							onChange={(e) => setNewPasswordMatch(e.target.value)}
							label="Confirm Password"
							variant="outlined"
							validators={[ 'isPasswordMatch', 'required' ]}
							errorMessages={[ 'password mismatch', 'this field is required' ]}
						/>
					</Grid>
				</PaperCustomShadow>
				<Grid container className={classes.buttons}>
					<Grid item xs={5}>
						<ButtonFilled type="submit" variant="contained" color="primary" className={classes.submit}>
							Set New Password
						</ButtonFilled>
					</Grid>
					<Grid item xs={5}>
						<Button type="submit" variant="outlined" color="primary" className={classes.passGenerate}>
							Autogenerate Password
						</Button>
					</Grid>
				</Grid>
			</ValidatorForm>
		</Grid>
	);
};

export default ChangePasswordForm;
