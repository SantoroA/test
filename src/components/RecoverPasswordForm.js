import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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
	}
}));

const RecoverPasswordForm = () => {
	const [ oldPassword, setOldPassword ] = useState('');
	const [ newPassword, setNewPassword ] = useState('');
	const [ repeatPassword, setRepeatPassword ] = useState('');

	const classes = useStyles();

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
		<Paper elevation={3} className={classes.paper}>
			<ValidatorForm onSubmit={() => {}} className={classes.form}>
				<Typography variant="h5">Change your password</Typography>
				<Grid className={classes.item}>
					<TextField
						fullWidth
						type="password"
						required
						value={oldPassword}
						onChange={(e) => setOldPassword(e.target.value)}
						label="Old Password"
						variant="outlined"
					/>
				</Grid>
				<Grid className={classes.item}>
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
				<Grid className={classes.item}>
					<TextValidator
						fullWidth
						type="password"
						required
						value={repeatPassword}
						onChange={(e) => setRepeatPassword(e.target.value)}
						label="Confirm Password"
						variant="outlined"
						validators={[ 'isPasswordMatch', 'required' ]}
						errorMessages={[ 'password mismatch', 'this field is required' ]}
					/>
				</Grid>

				<Button type="submit" variant="contained" color="primary" className={classes.submit}>
					Set New Password
				</Button>
			</ValidatorForm>
		</Paper>
	);
};

export default RecoverPasswordForm;
