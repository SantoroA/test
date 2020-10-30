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
		paddingBottom: '20px',
		spacing: '10px'
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(3),
		paddingBottom: '20px'
	},
	item: {
		padding: theme.spacing(1, 0)
	},
	submit: {
		width: '100%',
		margin: theme.spacing(3, 0, 2)
	}
}));

const SignupForm = ({ handleSubmit }) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ name, setName ] = useState('');
	const [ checked, toggleChecked ] = useToggle(false);
	const classes = useStyles();

	return (
		<div className={classes.paper}>
			<form onSubmit={handleSubmit} className={classes.form}>
				<h2>Register here and create an account</h2>
				<Grid className={classes.item}>
					<TextField
						fullWidth
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
						label="Name"
						variant="outlined"
					/>
				</Grid>
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
				<Grid className={classes.item}>
					<TextField
						fullWidth
						type="password"
						required
						id="confirm-password"
						label="Confirm Password"
						variant="outlined"
					/>
				</Grid>
				<div className={classes.item}>
					<FormControlLabel
						control={<Checkbox checked={checked} onChange={toggleChecked} name="checked" color="primary" />}
						label="I agree to the General Terms and Privacy Policy"
					/>
				</div>
				<Button type="submit" variant="contained" color="primary" className={classes.submit}>
					Register
				</Button>
			</form>
		</div>
	);
};

export default SignupForm;
