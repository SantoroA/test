import React, { useState, useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	container: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column'
	},
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
	link: {
		borderWidth: 1,
		borderColor: 'black',
		textDecoration: 'none',
		padding: theme.spacing(1),
		borderRadius: 5
	},
	text: {
		marginTop: '0',
		textAlign: 'center'
	}
}));

const LoginForm = ({ togglePasswordRecoveryOpen, switchProfileText, switchProfilePath }) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const classes = useStyles();
	const { login } = useContext(AuthContext);

	return (
		<div className={classes.container}>
			<Paper elevation={3} className={classes.paper}>
				<form
					onSubmit={async (e) => {
						e.preventDefault();
						await login({ email, password });
					}}
					className={classes.form}
				>
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
					<Button variant="outlined" color="primary" onClick={togglePasswordRecoveryOpen}>
						Forgot your password?
					</Button>

					<Button type="submit" variant="contained" color="primary" className={classes.submit}>
						Log In
					</Button>
				</form>
			</Paper>
			<div className={classes.text}>
				<p> Are you a {switchProfileText}?</p>
				<div>
					<Link className={classes.link} to={switchProfilePath}>
						Go to {switchProfileText} Profile
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
