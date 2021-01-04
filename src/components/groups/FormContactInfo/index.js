import React, { useState } from 'react';
import MuiPhoneInput from 'material-ui-phone-number';
import useStyles from './style';
//CUSTOM UI
import ButtonFilled from '../../customUi/ButtonFilled';
import ButtonOutlined from '../../customUi/ButtonOutlined';
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';

const FormContactInfo = ({ togglePasswordRecoveryOpen }) => {
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLasttName ] = useState('');
	const [ gender, setGender ] = useState('');
	const [ phoneNumber, setPhoneNumber ] = useState('');
	const [ birthday, setBirthday ] = useState('');
	const [ birthPlace, setbirthPlace ] = useState('');
	const [ isDisabled, setIsDisabled ] = useState(true);
	const classes = useStyles();

	return (
		<Container fullWidth className={classes.container}>
			<PaperCustomShadow className={classes.paper}>
				<Grid container className={classes.gridContainer}>
					<Grid item className={classes.title}>
						<Typography variant="h6">Contact Information</Typography>
						<IconButton>
							<EditIcon onClick={() => setIsDisabled(false)} />
						</IconButton>
					</Grid>
					<form
						onSubmit={() => {
							setIsDisabled(true);
						}}
						className={classes.form}
					>
						<Grid className={classes.item}>
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
						<Grid className={classes.item}>
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
						<Grid className={classes.item}>
							<FormControl variant="outlined" fullWidth>
								<InputLabel id="gender-label">Gender</InputLabel>
								<Select
									labelId="gender-label"
									value={gender}
									disabled={isDisabled}
									onChange={(e) => setGender(e.target.value)}
									label="Gender"
								>
									<MenuItem value={0}>Male</MenuItem>
									<MenuItem value={1}>Female</MenuItem>
									<MenuItem value={2}>Other</MenuItem>
									<MenuItem value={3}>Prefer no to say</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid className={classes.item}>
							<MuiPhoneInput
								fullWidth
								required
								disabled={isDisabled}
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.value)}
								label="Phone Number"
								variant="outlined"
							/>
						</Grid>
						<Grid className={classes.item}>
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
						<Grid className={classes.item}>
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
						{isDisabled ? null : (
							<Grid container className={classes.buttons}>
								<Grid item xs={5}>
									<ButtonOutlined onClick={() => setIsDisabled(true)} fullWidth variant="outlined">
										Cancel
									</ButtonOutlined>
								</Grid>
								<Grid item xs={5}>
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
