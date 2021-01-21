import React, { useState, useContext, useEffect, createRef } from 'react';
import { Context as DocProfileContext } from '../../../context/DocProfileContext';
import { Context as AuthContext } from '../../../context/AuthContext';
import useStyles from './style';
import DialogPicture from '../DialogPicture';
//CUSTOM UI
import ButtonFilled from '../../customUi/ButtonFilled';
import ButtonOutlined from '../../customUi/ButtonOutlined';
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
// import {TextField, Button, Fab} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const FormEmailAndPassword = () => {
	const { updatePassword, state: { userId, isSocialMedia } } = useContext(AuthContext);
	const { state: { email, image } } = useContext(DocProfileContext);
	const [ oldPassword, setOldPassword ] = useState('');
	const [ newPassword, setNewPassword ] = useState('');
	const [ newPasswordMatch, setNewPasswordMatch ] = useState('');
	const [ showChangePass, setShowChangePass ] = useState(true);

	const [ isDialogOpen, setIsDialogOpen ] = useState(false);
	const inputFileRef = createRef(null);
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

	const handleSubmit = (e) => {
		updatePassword({
			id: userId,
			oldPassword,
			newPassword
			// image
		});
	};

	return (
		<Container className={classes.container}>
			<PaperCustomShadow className={classes.paper}>
				<Grid container className={classes.gridContainer}>
					<Box className={classes.picUpload}>
						{image !== null ? (
							<Paper
								style={{
									backgroundImage: `url(${image})`,
									backgroundSize: 'contain',
									backgroundRepeat: 'no-repeat',
									backgroundPosition: 'center'
								}}
								className={classes.media}
							/>
						) : (
							<Paper className={classes.media} />
						)}

						<IconButton onClick={() => setIsDialogOpen(true)} className={classes.addButton}>
							<AddCircleOutlineIcon color="primary" className={classes.addIcon} />
						</IconButton>
					</Box>

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
									disabled={isSocialMedia}
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
								handleSubmit();
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
			<DialogPicture isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
		</Container>
	);
};

export default FormEmailAndPassword;
