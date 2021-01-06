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
	}
});

const TimeSlotList = () => {
	const classes = useStyles();
	const { state, getSlots, createSlot, deleteSlot, updateSlot } = useContext(AvailabilityContext);
	console.log(state);
	return (
		<div>
			{state.length > 0 ? (
				<div>
					<Typography>Your saved slots</Typography>
					{state.map((slot) => {
						return (
							<Box key={slot.slotCreated} borderRadius="10px" border={1}>
								<Grid container className={classes.info}>
									<Grid item xs={6}>
										<Typography variant="body1">From: {slot.startDay}</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography>To: {slot.endDay}</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography>From: {slot.startTime}</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography>To: {slot.endTime}</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography>Slot Duration: {slot.slot}</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography>Price set: {slot.amount}</Typography>
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
