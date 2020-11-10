import React, { useState, useEffect } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import useToggle from '../hooks/useToggle';
import { Grid } from '@material-ui/core';
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

const RegisterForm = ({ handleSubmit }) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');
	const [ name, setName ] = useState('');
	const [ checked, toggleChecked ] = useToggle(false);
	const classes = useStyles();

	useEffect(
		() => {
			ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
				if (value !== password) {
					return false;
				}
				return true;
			});
		},
		[ password ]
	);

	return (
		<Paper elevation={3} className={classes.paper}>
			<ValidatorForm onSubmit={() => handleSubmit({ email })} className={classes.form}>
				<h2>Register here and create an account</h2>
				{/* <Grid className={classes.item}>
					<TextField
						fullWidth
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
						label="Name"
						variant="outlined"
					/>
				</Grid> */}
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
				{/* <Grid className={classes.item}>
					<TextValidator
						label="Password"
						required
						fullWidth
						variant="outlined"
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						validators={[ 'required' ]}
						value={password}
					/>
				</Grid>
				<Grid className={classes.item}>
					<TextValidator
						label="Repeat password"
						required
						fullWidth
						onChange={(e) => setConfirmPassword(e.target.value)}
						name="repeatPassword"
						type="password"
						validators={[ 'isPasswordMatch', 'required' ]}
						errorMessages={[ 'password mismatch', 'this field is required' ]}
						value={confirmPassword}
						variant="outlined"
					/>
				</Grid> */}
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
		</Paper>
	);
};

export default RegisterForm;
