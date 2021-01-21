import React, { useState, useContext } from 'react';
import CurrencyInput from 'react-currency-input';
import { Context as AvailabilityContext } from '../../context/AvailabilityContext';
import { Context as AuthContext } from '../../context/AuthContext';
//CUSTOM UI
import TextInput from '../customUi/TextInput';
import ButtonFilled from '../customUi/ButtonFilled';
import ButtonError from '../customUi/ButtonError';

//CUSTOM ICONS
import SleepIcon from '../customIcons/SleepIcon';
//MATERIAL UI
import Select from '@material-ui/core/Select';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Hidden from '@material-ui/core/Hidden';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	form: {
		padding: '1rem',
		justifyContent: 'center',
		borderColor: 'rgba(160, 164, 168, 1)',
		marginTop: '1.5rem',
		marginBottom: '1.5rem'
	},

	buttons: {
		marginTop: '1.5rem',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	button: {
		padding: '0.5rem'
	},

	input: {
		padding: '0.5rem'
	},
	checkbox: {
		padding: '0.5rem'
	},
	icons: {
		fontSize: '5rem',
		marginBottom: '1rem'
	},
	iconWrapper: {
		display: 'flex',
		flexDirection: 'column',
		padding: '2rem',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

const FormTimeSlots = ({ weekDay, availableEnd, availableStart }) => {
	const [ timeStart, setTimeStart ] = useState('');
	const [ timeEnd, setTimeEnd ] = useState('');
	const [ amount, setAmount ] = useState(75);
	const [ duration, setDuration ] = useState('');

	const [ isOffDay, setIsOffDay ] = useState(false);
	const classes = useStyles();
	const { createSlot } = useContext(AvailabilityContext);
	const { state: { userId } } = useContext(AuthContext);
	// const userId = '5fe8b0c48bef090026e253b7';

	const handleSubmit = (e) => {
		e.preventDefault();

		createSlot({
			availableStart,
			availableEnd,
			timeStart,
			timeEnd,
			amount,
			duration,
			weekDay,
			id: userId
		});
	};
	const handleChangePrice = (maskedValue) => {
		setAmount(maskedValue);
	};

	return (
		<Box borderRadius="10px" border={1} className={classes.form}>
			{/* <FormControlLabel
				control={
					<Checkbox
						checked={isOffDay}
						onChange={() => setIsOffDay(!isOffDay)}
						name="isOffDay"
						color="primary"
					/>
				}
				label="Weekly off day"
				className={classes.checkbox}
			/> */}
			{/* {isOffDay ? (
				<Grid container className={classes.iconWrapper}>
					<SleepIcon className={classes.icons} />
					<Typography>No time slots for off days</Typography>
				</Grid>
			) : ( */}
			<form onSubmit={handleSubmit}>
				<Grid container>
					<Hidden xsUp>
						<Grid container>
							<Grid item xs={6} className={classes.input}>
								<TextInput
									fullWidth
									required
									type="date"
									value={availableStart}
									onChange={(e) => e.preventDefault()}
									label="Availability from"
									variant="outlined"
									InputLabelProps={{
										shrink: true
									}}
								/>
							</Grid>
							<Grid item xs={6} className={classes.input}>
								<TextInput
									fullWidth
									required
									type="date"
									value={availableEnd}
									onChange={(e) => e.preventDefault}
									label="Availability to"
									variant="outlined"
									InputLabelProps={{
										shrink: true
									}}
								/>
							</Grid>
						</Grid>
					</Hidden>

					<Grid item xs={6} className={classes.input}>
						<TextInput
							fullWidth
							required
							type="time"
							value={timeStart}
							onChange={(e) => setTimeStart(e.target.value)}
							label="Time from"
							variant="outlined"
							InputLabelProps={{
								shrink: true
							}}
						/>
					</Grid>
					<Grid item xs={6} className={classes.input}>
						<TextInput
							fullWidth
							required
							type="time"
							value={timeEnd}
							onChange={(e) => setTimeEnd(e.target.value)}
							label="Time to"
							variant="outlined"
							InputLabelProps={{
								shrink: true
							}}
						/>
					</Grid>
					<Grid item xs={6} className={classes.input}>
						<FormControl required fullWidth variant="outlined">
							<InputLabel id="slot-durantion-label">Slot Duration</InputLabel>
							<Select
								labelId="slot-durantion-label"
								value={duration}
								onChange={(e) => setDuration(e.target.value)}
								label="Slot Duration"
							>
								<MenuItem value={15}>15 min</MenuItem>
								<MenuItem value={30}>30 min</MenuItem>
								<MenuItem value={45}>45 min</MenuItem>
								<MenuItem value={60}>1 hour</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={6} className={classes.input}>
						<CurrencyTextField
							fullWidth
							label="Amount"
							variant="outlined"
							value={amount}
							currencySymbol="$"
							outputFormat="string"
							onChange={(event, amount) => setAmount(amount)}
						/>
					</Grid>
				</Grid>
				{availableStart && availableEnd ? (
					<Grid container className={classes.buttons}>
						<Grid item xs={12} className={classes.button}>
							<ButtonFilled type="submit" variant="contained" color="primary" fullWidth>
								Apply
							</ButtonFilled>
						</Grid>
					</Grid>
				) : (
					<Grid container className={classes.buttons}>
						<Grid item xs={12} className={classes.button}>
							<ButtonError
								onClick={() => console.log('please choose a date')}
								variant="contained"
								color="primary"
								fullWidth
								disabled
							>
								Apply
							</ButtonError>
						</Grid>
					</Grid>
				)}
			</form>
			{/* )} */}
		</Box>
	);
};

export default FormTimeSlots;
