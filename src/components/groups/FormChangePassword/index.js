import React, { useState, useEffect, useContext } from 'react';
import { Context as AuthContext } from '../../../context/AuthContext';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import logo from '../../../assets/dianurse-logo.png';
import useStyles from './style';
//CUSTOM UI
import ButtonFilled from '../../customUi/ButtonFilled';
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const FormChangePassword = ({ recToken }) => {
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

export default FormChangePassword;
