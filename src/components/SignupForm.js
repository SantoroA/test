import React, { useState } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import useToggle from '../hooks/useToggle';

const SignupForm = () => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ name, setName ] = useState('');
	const [ checked, toggleChecked ] = useToggle(false);
	return (
		<div>
			<FormGroup style={{ width: '30%' }}>
				<h2>Register here and create an account</h2>
				<TextField required id="name" value={name} onChange={setName} label="Name" variant="outlined" />
				<TextField required id="email" value={email} onChange={setEmail} label="Email" variant="outlined" />
				<TextField
					required
					id="password"
					value={password}
					onChange={setPassword}
					label="Password"
					variant="outlined"
				/>
				<TextField required id="confirm-password" label="Confirm Password" variant="outlined" />
				<FormControlLabel
					control={<Checkbox checked={checked} onChange={toggleChecked} name="checked" color="primary" />}
					label="I agree..."
				/>
				<Button variant="contained" color="primary">
					Register
				</Button>
			</FormGroup>
		</div>
	);
};

export default SignupForm;
