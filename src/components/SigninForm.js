import React, { useState } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import useToggle from '../hooks/useToggle';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	paper: {
	  marginTop: theme.spacing(4),
	  display: 'flex',
	  flexDirection: 'column',
	  alignItems: 'center',
	},
	form: {
	  width: '100%',
	  marginTop: theme.spacing(3),
	},
	item: {
		padding: theme.spacing(1, 0),
	},
	submit: {
	  width: '100%',
	  margin: theme.spacing(3, 0, 2),
	},
  }));

const SigninForm = ({ handleSubmit }) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const classes = useStyles();

	return (
		<div className={classes.paper}>
			<form onSubmit={handleSubmit} className={classes.form}>
				<h2>Already have an account? Log in here</h2>
				<Grid className={ classes.item }>
				<TextField
					fullWidth
					type="email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					label="Email"
					variant="outlined"
				/></Grid>
				<Grid className={ classes.item }>
				<TextField
					fullWidth
					required
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					label="Password"
					variant="outlined"
				/></Grid>

				<Button type="submit" variant="contained" color="primary"  className={ classes.submit }>
					Register
				</Button>
			</form>
		</div>
	);
};

export default SigninForm;
