import React, { useState, useContext, useEffect } from 'react';
import { Context as DocProfileContext } from '../../../context/DocProfileContext';
// import { Context as AuthContext } from '../../../context/AuthContext';

// import MuiPhoneInput from 'material-ui-phone-number';
import PhoneInput from 'react-phone-input-2';

import 'react-phone-input-2/lib/material.css';
import useStyles from './style';
//CUSTOM UI
import ButtonFilled from '../../customUi/ButtonFilled';
import ButtonOutlined from '../../customUi/ButtonOutlined';
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI

import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import { Context as AuthContext } from '../../../context/AuthContext';

const FormContactInfo = () => {
	const { updateContactInfo, getSpeciality, state } = useContext(DocProfileContext);
	const userId = '5fe8b0c48bef090026e253b7';
	// const { state: {userId} } = useContext(AuthContext);
	const [ firstName, setFirstName ] = useState(state.firstName);
	const [ lastName, setLasttName ] = useState(state.lastName);
	const [ specialty, setSpecialty ] = useState(state.specialty);
	const [ gender, setGender ] = useState(state.gender);
	const [ phoneNumber, setPhoneNumber ] = useState(state.phoneNumber);
	const [ birthday, setBirthday ] = useState(state.birthday);
	const [ birthPlace, setbirthPlace ] = useState(state.birthPlace);
	const [ isDisabled, setIsDisabled ] = useState(true);
	const classes = useStyles();

	// console.log(state);

	useEffect(() => {
		getSpeciality();
	}, []);

	const resetState = () => {
		setFirstName(state.firstName);
		setLasttName(state.lastName);
		setSpecialty(state.specialty);
		setGender(state.gender);
		setPhoneNumber(state.phoneNumber);
		setBirthday(state.birthday);
		setbirthPlace(state.birthPlace);
	};

	const handleSubmit = () => {
		updateContactInfo({
			id: userId,
			firstName,
			lastName,
			specialty,
			gender,
			phoneNumber,
			birthday,
			birthPlace
		});
	};

	return (
		<Container className={classes.container}>
			<PaperCustomShadow className={classes.paper}>
				<Grid container className={classes.gridContainer}>
					<Grid item className={classes.title}>
						<Typography variant="h6">Contact Information</Typography>
						<IconButton onClick={() => setIsDisabled(false)}>
							<EditIcon />
						</IconButton>
					</Grid>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit();
							setIsDisabled(true);
						}}
						className={classes.form}
					>
						<Grid container>
							<Grid item xs={12} sm={6} className={classes.input}>
								<TextField
									fullWidth
									disabled={isDisabled}
									type="text"
									required
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									label="First name"
									variant="outlined"
								/>
							</Grid>
							<Grid item xs={12} sm={6} className={classes.input}>
								<TextField
									fullWidth
									required
									disabled={isDisabled}
									type="text"
									value={lastName}
									onChange={(e) => setLasttName(e.target.value)}
									label="Last name"
									variant="outlined"
								/>
							</Grid>
							<Grid item xs={12} sm={12} className={classes.input}>
								<FormControl variant="outlined" fullWidth>
									<InputLabel id="specialty-label">Specialty</InputLabel>
									<Select
										required
										labelId="specialty-label"
										value={specialty}
										
										onChange={(e) => setSpecialty(e.target.value)}
										label="Specialty"
									>
										{state.allSpecialty !== 'undefined' ? (
											state.allSpecialty.map((el) => {
												return <MenuItem value={el}>{el}</MenuItem>;
											})
										) : null}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={6} className={classes.input}>
								<FormControl variant="outlined" fullWidth>
									<InputLabel id="gender-label">Gender</InputLabel>
									<Select
										labelId="gender-label"
										value={gender}
										onChange={(e) => setGender(e.target.value)}
										label="Gender"
									>
										<MenuItem value={0}>Male</MenuItem>
										<MenuItem value={1}>Female</MenuItem>
										<MenuItem value={2}>Other</MenuItem>
										<MenuItem value={3}>Prefer not to say</MenuItem>
									</Select>
								</FormControl>
							</Grid>

							<Grid item xs={12} sm={6} className={classes.input}>
								<PhoneInput
									fullWidth
									inputStyle={{width: '100%'}}
									className={classes.phoneInputStyle}
									disabled={isDisabled}
									value={phoneNumber}
									onChange={(e) => setPhoneNumber(e)}
									inputProps={{
										name: 'phone',
										required: true,
										autoFocus: true
									}}
									// variant="outlined"
								/>
							</Grid>
							<Grid item xs={12} sm={6} className={classes.input}>
								<TextField
									fullWidth
									type="date"
									value={birthday}
									disabled={isDisabled}
									onChange={(e) => setBirthday(e.target.value)}
									label="Birthday"
									variant="outlined"
									InputLabelProps={{
										shrink: true
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={6} className={classes.input}>
								<TextField
									fullWidth
									type="text"
									disabled={isDisabled}
									value={birthPlace}
									onChange={(e) => setbirthPlace(e.target.value)}
									label="Place of Birth"
									variant="outlined"
								/>
							</Grid>
						</Grid>
						{isDisabled ? null : (
							<Grid container className={classes.buttons}>
								<Grid item xs={6} className={classes.button}>
									<ButtonOutlined
										onClick={() => {
											setIsDisabled(true);
											resetState();
										}}
										fullWidth
										variant="outlined"
									>
										Cancel
									</ButtonOutlined>
								</Grid>
								<Grid item xs={6} className={classes.button}>
									<ButtonFilled type="submit" variant="contained" color="primary" fullWidth>
										Update
									</ButtonFilled>
								</Grid>
							</Grid>
						)}
					</form>
				</Grid>
			</PaperCustomShadow>
		</Container>
	);
};

export default FormContactInfo;
