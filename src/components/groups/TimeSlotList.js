import React, { useState, useContext } from 'react';
import CurrencyInput from 'react-currency-input';
import { Context as AvailabilityContext } from '../../context/AvailabilityContext';
//CUSTOM UI
import TextInput from '../customUi/TextInput';
import ButtonFilled from '../customUi/ButtonFilled';

//MATERIAL UI
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
	info: {
		display: 'flex',
		padding: '1rem'
	},
	box: {
		padding: '1rem',
		justifyContent: 'center',
		borderColor: 'rgba(160, 164, 168, 1)',
		marginBottom: '1rem'
	}
});

const TimeSlotList = ({ weekDay }) => {
	const classes = useStyles();
	const { state, getSlots, createSlot, deleteSlot, updateSlot } = useContext(AvailabilityContext);
	// const [weekDaySlots, setWeekDaySlots] = useState(state.slots.filter((slot) => slot.weekDay == weekDay))
	const weekDaySlots = state.slots.filter((slot) => slot.weekDay == weekDay);
	console.log(state.slots);
	console.log(weekDaySlots);
	return (
		<div>
			{weekDaySlots.length > 0 ? (
				<div>
					<Typography>Your saved slots</Typography>
					{weekDaySlots.map((slot) => {
						return (
							<Box key={slot.slotCreated} className={classes.box} borderRadius="10px" border={1}>
								<Grid container className={classes.info}>
									<Grid item xs={6}>
										<Typography variant="body1">From: {slot.startDay}</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant="body1">To: {slot.endDay}</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant="body1">From: {slot.startTime}</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant="body1">To: {slot.endTime}</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant="body1">Slot Duration: {slot.slot}</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant="body1">Price set: {slot.amount}</Typography>
									</Grid>
									<button onClick={() => deleteSlot(slot.slotCreated, slot.id)}>Delete</button>
									<button
										disabled={slot.editStatus}
										onClick={() => {
											// setEditSlot(el.slotCreated);
										}}
									>
										Edit
									</button>
								</Grid>
							</Box>
						);
					})}
				</div>
			) : null}
		</div>
	);
};

export default TimeSlotList;
