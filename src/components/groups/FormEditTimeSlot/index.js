import React, { useState, useContext } from 'react';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import useStyles from './style';
// import CurrencyInput from 'react-currency-input';
import { Context as AvailabilityContext } from '../../../context/AvailabilityContext';
import { Context as AuthContext } from '../../../context/AuthContext';
//CUSTOM UI
import TextInput from '../../customUi/TextInput';
import ButtonFilled from '../../customUi/ButtonFilled';
//MATERIAL UI
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const FormEditTimeSlots = ({ startDay, endDay, startTime, weekDay, endTime, slot, amount, slotCreated }) => {
	const [ timeStart, setTimeStart ] = useState(startTime);
	const [ availableStart, setAvailableStart ] = useState(startDay);
	const [ availableEnd, setAvailableEnd ] = useState(endDay);
	const [ timeEnd, setTimeEnd ] = useState(endTime);
	const [ price, setPrice ] = useState(amount);
	const [ duration, setDuration ] = useState(slot);
	const classes = useStyles();
	const { updateSlot, setIsEditing } = useContext(AvailabilityContext);
	const { state: { userId } } = useContext(AuthContext);
	// const userId = '5fe8b0c48bef090026e253b7';
	// console.log(price);
	// console.log(state);
	const handleSubmit = (e) => {
		e.preventDefault();
		updateSlot({
			availableStart,
			availableEnd,
			timeStart,
			timeEnd,
			amount: price,
			duration,
			weekDay,
			id: userId,
			key: slotCreated
		});
	};

	return (
		<Box borderRadius="10px" border={1} className={classes.form}>
			<form onSubmit={handleSubmit}>
				<Grid container>
					<Grid container>
						<Grid item xs={6} className={classes.input}>
							<TextInput
								fullWidth
								required
								type="date"
								value={availableStart}
								onChange={(e) => setAvailableStart(e.target.value)}
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
								onChange={(e) => setAvailableEnd(e.target.value)}
								label="Availability to"
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						</Grid>
					</Grid>

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
							onChange={(event, amount) => setPrice(amount)}
						/>
						{/* <CurrencyInput value={price} prefix="$" onChange={handleChangePrice} /> */}
					</Grid>
				</Grid>

				<Grid container className={classes.buttons}>
					<Grid item xs={6} className={classes.button}>
						<ButtonFilled
							onClick={() => setIsEditing(slotCreated)}
							variant="contained"
							color="primary"
							fullWidth
						>
							Cancel
						</ButtonFilled>
					</Grid>
					<Grid item xs={6} className={classes.button}>
						<ButtonFilled type="submit" variant="contained" color="primary" fullWidth>
							Update
						</ButtonFilled>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
};

export default FormEditTimeSlots;
