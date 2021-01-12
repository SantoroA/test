import React, { useState, useContext, useEffect } from 'react';
// import { Context as AuthContext } from '../../../context/AuthContext';
import useStyles from './style';
//CUSTOM UI
import ButtonFilled from '../../customUi/ButtonFilled';
import ButtonOutlined from '../../customUi/ButtonOutlined';
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const FormEmailAndPassword = () => {
	const [ email, setEmail ] = useState('');
	const [ oldPassword, setOldPassword ] = useState('');
	const [ newPassword, setNewPassword ] = useState('');
	const [ newPasswordMatch, setNewPasswordMatch ] = useState('');
	const [ showChangePass, setShowChangePass ] = useState(true);
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
			<PaperCustomShadow className={classes.paper}>
				<Grid container className={classes.gridContainer}>
					{/* {media ?  <CardMedia/> : ( */}
					<Box
						display="flex"
						justifyContent="center"
						flexDirection="column"
						alignItems="center"
						className={classes.media}
						title="Doctor"
					>
						<Typography variant="body1">Upload your photo</Typography>
						<Box className={classes.addButton}>
							<IconButton>
								<AddCircleOutlineIcon color="primary" />
							</IconButton>
						</Box>
					</Box>
					{/* )} */}

					<Grid item className={classes.title}>
						<Typography variant="h5">Email and Password</Typography>
					</Grid>
					<Grid item className={classes.emailField}>
						<TextField
							fullWidth
							disabled
							type="email"
							required
							value={email}
							placeholder="Your Email"
							variant="outlined"
						/>
					</Grid>

					{showChangePass ? (
						<Grid container className={classes.buttons}>
							<Grid item xs={12} className={classes.button}>
								<ButtonFilled
									fullWidth
									onClick={() => setShowChangePass(false)}
									variant="contained"
									color="primary"
									className={classes.submit}
								>
									Change my password
								</ButtonFilled>
							</Grid>
						</Grid>
					) : (
						<ValidatorForm
							onSubmit={(e) => {
								e.preventDefault();
								setShowChangePass(true);
							}}
							className={classes.form}
						>
							<Grid className={classes.input}>
								<Typography variant="h6">Change your password</Typography>
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
							<Grid className={classes.input}>
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
							<Grid className={classes.input}>
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
							<Grid container className={classes.buttons}>
								<Grid item xs={6} className={classes.button}>
									<ButtonOutlined
										onClick={() => setShowChangePass(true)}
										fullWidth
										variant="outlined"
									>
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
						</ValidatorForm>
					)}
				</Grid>
			</PaperCustomShadow>
		</Container>
	);
};

export default FormEmailAndPassword;
