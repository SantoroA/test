import React, { useState } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import useToggle from '../hooks/useToggle';

const SigninForm = ({ handleSubmit }) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h2>Already have an account? Log in here</h2>
				<TextField
					fullWidth
					type="email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					label="Email"
					variant="outlined"
				/>
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

				<Button type="submit" variant="contained" color="primary">
					Register
				</Button>
			</form>
		</div>
	);
};

export default SigninForm;
