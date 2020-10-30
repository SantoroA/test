import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	form: {
<<<<<<< HEAD
		width: '100%',
		marginTop: theme.spacing(3)
=======
	  width: '100%',
	  marginTop: theme.spacing(4),
	  justifyContent: 'center',
>>>>>>> b889cfc561619043d39328b3a28e09694a12c445
	},
	item: {
		padding: theme.spacing(1, 0)
	},
	submit: {
		width: '100%',
		margin: theme.spacing(3, 0, 2)
	}
}));

const SigninForm = ({ handleSubmit, toggleDialogOpen }) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const classes = useStyles();

	return (
		<div className={classes.paper}>
			<form onSubmit={handleSubmit} className={classes.form}>
				<h2>Already have an account? Log in here</h2>
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
				<Grid className={classes.item}>
					<TextField
						fullWidth
						required
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						label="Password"
						variant="outlined"
					/>
				</Grid>
				<Button variant="outlined" color="primary" onClick={toggleDialogOpen}>
					Forgot your password?
				</Button>
				<Button type="submit" variant="contained" color="primary" className={classes.submit}>
					Log In
				</Button>
			</form>
		</div>
	);
};

export default SigninForm;
