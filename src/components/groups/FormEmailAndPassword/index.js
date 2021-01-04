import React, { useState, useEffect } from 'react';
import useStyles from './style';
// import { Context as AuthContext } from '../../context/AuthContext';
//CUSTOM UI
import ButtonFilled from '../../customUi/ButtonFilled';
import ButtonOutlined from '../../customUi/ButtonOutlined';
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const FormEmailAndPassword = () => {
	const [ email, setEmail ] = useState('');
	const [ oldPassword, setOldPassword ] = useState('');
	const [ newPassword, setNewPassword ] = useState('');
	const [ newPasswordMatch, setNewPasswordMatch ] = useState('');
	const [ isDisabled, setIsDisabled ] = useState(true);
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
					<Grid item className={classes.title}>
						<Typography variant="h6">Email and Password</Typography>
						<IconButton>
							<EditIcon onClick={() => setIsDisabled(false)} />
						</IconButton>
					</Grid>
					<ValidatorForm
						onSubmit={() => {
							setIsDisabled(true);
						}}
						className={classes.form}
					>
						<Grid className={classes.input}>
							<TextField
								fullWidth
								disabled={isDisabled}
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								label="Email"
								variant="outlined"
							/>
						</Grid>
						<Grid className={classes.input}>
							<Typography variant="h6">Change your password</Typography>
							<TextValidator
								fullWidth
								disabled={isDisabled}
								type="password"
								required
								value={oldPassword}
								onChange={(e) => setOldPassword(e.target.value)}
								label="Old Password"
								variant="outlined"
								validators={[ 'required' ]}
							/>
						</Grid>
						<Grid className={classes.input}>
							<TextValidator
								fullWidth
								type="password"
								disabled={isDisabled}
								required
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								label="New Password"
								variant="outlined"
								validators={[ 'required' ]}
							/>
						</Grid>
						<Grid className={classes.input}>
							<TextValidator
								fullWidth
								type="password"
								disabled={isDisabled}
								required
								value={newPasswordMatch}
								onChange={(e) => setNewPasswordMatch(e.target.value)}
								label="Confirm Password"
								variant="outlined"
								validators={[ 'isPasswordMatch', 'required' ]}
								errorMessages={[ 'password mismatch', 'this field is required' ]}
							/>
						</Grid>
						{isDisabled ? null : (
							<Grid container className={classes.buttons}>
								<Grid item xs={6} className={classes.button}>
									<ButtonOutlined onClick={() => setIsDisabled(true)} fullWidth variant="outlined">
										Cancel
									</ButtonOutlined>
								</Grid>
								<Grid item xs={6} className={classes.button}>
									<ButtonFilled
										fullWidth
										type="submit"
										variant="contained"
										color="primary"
										className={classes.submit}
									>
										Update
									</ButtonFilled>
								</Grid>
							</Grid>
						)}
					</ValidatorForm>
				</Grid>
			</PaperCustomShadow>
		</Container>
	);
};

export default FormEmailAndPassword;
