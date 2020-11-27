import React, { useState, useContext, useEffect } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const useStyles = makeStyles((theme) => ({
	container: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(4)
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
	},
	socialMedia: {
		borderRadius: 15,
		height: 30,
		width: 30,
		padding: 20,
		minHeight: 0,
		minWidth: 0,
		fontSize: 20
	},
	redes: {
		marginTop: 20,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%'
	},
	gridContainer: {
		justifyContent: 'center'
	}
}));

const CompleteProfileForm = () => {
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
		<Container className={classes.container}>
			<Typography variant="h4">Email and Password</Typography>
			<Grid container className={classes.gridContainer}>
				<Grid item lg={6}>
					<Paper elevation={3} className={classes.paper}>
						<ValidatorForm onSubmit={() => {}} className={classes.form}>
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
							<Typography variant="h5">Change your password</Typography>
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

							<Button type="submit" variant="contained" color="primary" className={classes.submit}>
								Update
							</Button>
						</ValidatorForm>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
};

export default CompleteProfileForm;
