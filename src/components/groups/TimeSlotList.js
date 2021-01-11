import React, { useState, useContext } from 'react';
import { Context as AvailabilityContext } from '../../context/AvailabilityContext';
import FormEditTimeSlots from './FormEditTimeSlot';
//MATERIAL UI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
	const { state, deleteSlot, updateSlot, setIsEditing } = useContext(AvailabilityContext);
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
							<div key={slot.slotCreated}>
								{slot.isEditing === false ? (
									<Box className={classes.box} borderRadius="10px" border={1}>
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
<<<<<<< HEAD
											<button onClick={(e) => {
												e.preventDefault();
												deleteSlot(slot.slotCreated, slot.id)}}>
=======
											<button
												onClick={(e) => {
													e.preventDefault();
													deleteSlot(slot.slotCreated, slot.id);
												}}
											>
>>>>>>> fb2916d9a31230952626cc95489392cefb67aaaa
												Delete
											</button>
											<button
												disabled={slot.editStatus}
												onClick={() => {
													setIsEditing(slot.slotCreated);
												}}
											>
												Edit
											</button>
										</Grid>
									</Box>
								) : (
									<Grid container>
										<FormEditTimeSlots
											setIsEditing={setIsEditing}
											startDay={slot.startDay}
											endDay={slot.endDay}
											startTime={slot.startTime}
											endTime={slot.endTime}
											slot={slot.slot}
											amount={slot.amount}
											slotCreated={slot.slotCreated}
											id={slot.id}
											weekDay={weekDay}
										/>
									</Grid>
								)}
							</div>
						);
					})}
				</div>
			) : null}
		</div>
	);
};

export default TimeSlotList;
