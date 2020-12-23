import React, { useState, useEffect } from 'react';
import useStyles from './style';
// import { Context as AuthContext } from '../../context/AuthContext';
//CUSTOM UI
import ButtonFilled from '../../customUi/ButtonFilled';
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const FormCompleteProfile = () => {
	const [ email, setEmail ] = useState('');
	const [ oldPassword, setOldPassword ] = useState('');
	const [ newPassword, setNewPassword ] = useState('');
	const [ newPasswordMatch, setNewPasswordMatch ] = useState('');
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
		<Container fullWidth className={classes.container}>
			<PaperCustomShadow className={classes.paper}>
				<Grid container className={classes.gridContainer}>
					<ValidatorForm onSubmit={() => {}} className={classes.form}>
						<Typography variant="h6">Email and Password</Typography>
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
						<Typography variant="h6">Change your password</Typography>
						<Grid className={classes.item}>
							<TextValidator
								fullWidth
								type="password"
								required
								value={oldPassword}
								onChange={(e) => setOldPassword(e.target.value)}
								label="Old Password"
								variant="outlined"
								validators={[ 'required' ]}
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
								value={newPasswordMatch}
								onChange={(e) => setNewPasswordMatch(e.target.value)}
								label="Confirm Password"
								variant="outlined"
								validators={[ 'isPasswordMatch', 'required' ]}
								errorMessages={[ 'password mismatch', 'this field is required' ]}
							/>
						</Grid>

						<ButtonFilled type="submit" variant="contained" color="primary" className={classes.submit}>
							Update
						</ButtonFilled>
					</ValidatorForm>
				</Grid>
			</PaperCustomShadow>
		</Container>
	);
};

export default FormCompleteProfile;
