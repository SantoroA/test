import React, { useState, useContext, useEffect } from 'react';
import { Context as DocProfileContext } from '../../../context/DocProfileContext';
import { Context as PatProfileContext } from '../../../context/PatProfileContext';
import { Context as AuthContext } from '../../../context/AuthContext';
import ReactPhoneInput from 'react-phone-input-mui';
import useStyles from './style';
import { useTranslation } from 'react-i18next';
//CUSTOM UI
import ButtonFilled from '../../customUi/ButtonFilled';
import ButtonOutlined from '../../customUi/ButtonOutlined';
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';

const FormContactInfo = () => {
	const { state: { userId, userAmIHCP } } = useContext(AuthContext);
	const { updateContactInfo, state } = useContext(userAmIHCP ? DocProfileContext : PatProfileContext);
	const { getSpeciality } = useContext(DocProfileContext);
	// const userId = '5fe8b0c48bef090026e253b7';
	const [ firstName, setFirstName ] = useState(state.firstName);
	const [ lastName, setLasttName ] = useState(state.lastName);
	const [ specialty, setSpecialty ] = useState(state.specialty);
	const [ gender, setGender ] = useState(state.gender);
	const [ phoneNumber, setPhoneNumber ] = useState(state.phoneNumber);
	const [ birthday, setBirthday ] = useState(state.birthday);
	const [ birthPlace, setbirthPlace ] = useState(state.birthPlace);
	const [ isDisabled, setIsDisabled ] = useState(true);
	const classes = useStyles();

	console.log(firstName, lastName, gender, phoneNumber, birthday, birthPlace);
	// console.log(phoneNumber)

	useEffect(() => {
		userAmIHCP && getSpeciality();
		//  eslint-disable-next-line react-hooks/exhaustive-deps
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
		console.log('submit', specialty);
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
	const { t , i18n} = useTranslation();
	return (
		<Container className={classes.container}>
			<PaperCustomShadow className={classes.paper}>
				<Grid container className={classes.gridContainer}>
					<Grid item className={classes.title}>
						<Typography variant="h6">{t("Contact_information.1")}</Typography>
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
									label={t("First_Name.1")}
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
									label={t("Last_Name.1")}
									variant="outlined"
								/>
							</Grid>
							{userAmIHCP && (
								<Grid item xs={12} sm={12} className={classes.input}>
									<FormControl variant="outlined" fullWidth>
										<InputLabel id="specialty-label">{t("Specialty.1")}</InputLabel>
										<Select
											disabled={isDisabled}
											required
											labelId="specialty-label"
											value={specialty}
											onChange={(e) => setSpecialty(e.target.value)}
											label={t("Specialty.1")}
										>
											{state.allSpecialty !== 'undefined' ? (
												state.allSpecialty.map((el, i) => {
													return (
														<MenuItem key={i} value={el}>
															{el}
														</MenuItem>
													);
												})
											) : null}
										</Select>
									</FormControl>
								</Grid>
							)}
							<Grid item xs={12} sm={6} className={classes.input}>
								<FormControl variant="outlined" fullWidth>
									<InputLabel id="gender-label">{t("Gender.1")}</InputLabel>
									<Select
										disabled={isDisabled}
										value={gender}
										onChange={(e) => setGender(parseInt(e.target.value))}
										label={t("Gender.1")}
									>
										<MenuItem value={0}>{t("Male.1")}</MenuItem>
										<MenuItem value={1}>{t("Female.1")}</MenuItem>
										<MenuItem value={2}>{t("Other.1")}</MenuItem>
										<MenuItem value={3}>{t("Prefer_not_to_say.1")}</MenuItem>
									</Select>
								</FormControl>
							</Grid>

							<Grid item xs={12} sm={6} className={classes.input}>
								<ReactPhoneInput
									value={phoneNumber}
									defaultCountry="bg"
									onChange={(e) => setPhoneNumber(e)}
									dropdownClass={classes.countryList}
									component={TextField}
									variant="outlined"
									disabled={isDisabled}
									inputExtraProps={{
										autoComplete: 'phone',
										name: 'custom-username',
										variant: 'outlined'
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={6} className={classes.input}>
								<TextField
									fullWidth
									type="date"
									value={birthday}
									disabled={isDisabled}
									onChange={(e) => setBirthday(e.target.value)}
									label={t("Birthday.1")}
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
									label={t("Place_of_Birth.1")}
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
										{t("Cancel.1")}
									</ButtonOutlined>
								</Grid>
								<Grid item xs={6} className={classes.button}>
									<ButtonFilled type="submit" variant="contained" color="primary" fullWidth>
									{t("Update.1")}
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
