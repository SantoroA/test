import React, { useState } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import useToggle from '../hooks/useToggle';

const SignupForm = ({ handleSubmit }) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ name, setName ] = useState('');
	const [ checked, toggleChecked ] = useToggle(false);

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h2>Register here and create an account</h2>
				<TextField
					fullWidth
					required
					value={name}
					onChange={(e) => setName(e.target.value)}
					label="Name"
					variant="outlined"
				/>
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
				<TextField
					fullWidth
					type="password"
					required
					id="confirm-password"
					label="Confirm Password"
					variant="outlined"
				/>
				<FormGroup>
					<FormControlLabel
						control={<Checkbox checked={checked} onChange={toggleChecked} name="checked" color="primary" />}
						label="I agree..."
					/>
				</FormGroup>
				<Button type="submit" variant="contained" color="primary">
					Register
				</Button>
			</form>
		</div>
	);
};

export default SignupForm;
