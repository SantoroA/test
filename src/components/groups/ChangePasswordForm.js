import React, { useState, useEffect, useContext } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

//MATERIAL UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
		<Paper elevation={3} className={classes.paper}>
			<ValidatorForm
				onSubmit={() => {
					changePassword({ newPassword, newPasswordMatch, recToken });
				}}
				className={classes.form}
			>
				<Typography variant="h5">Change your password</Typography>
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
						value={newPasswordMatch}
						onChange={(e) => setNewPasswordMatch(e.target.value)}
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

export default ChangePasswordForm;
