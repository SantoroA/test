import React, { useState, useContext } from 'react';
import { Context as AvailabilityContext } from '../../context/AvailabilityContext';
import FormEditTimeSlots from './FormEditTimeSlot';
//CUSTOM UI
import PaperCustomShadow from '../customUi/PaperCustomShadow';
//MATERIAL UI
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles({
	info: {
		display: 'flex',
		padding: '1rem'
	},
	box: {
		padding: '1rem',
		justifyContent: 'center',
		marginBottom: '1rem',
		background: 'linear-gradient(180deg, #F0F9FF 0%, #FFFFFF 100%)',
		borderRadius: '10px'
	}
});

const TimeSlotList = ({ weekDay, weekDayName }) => {
	const classes = useStyles();
	const { state, deleteSlot, setIsEditing } = useContext(AvailabilityContext);
	const weekDaySlots = state.slots.filter((slot) => slot.weekDay == weekDay);
	// console.log(state.slots);
	console.log(weekDaySlots);
	return (
		<div>
			{weekDaySlots.length > 0 ? (
				<div>
					<Typography variant="h6">Your saved slots for {weekDayName}</Typography>
					{weekDaySlots.map((slot) => {
						return (
							<div key={slot.slotCreated}>
								{slot.isEditing === false ? (
									<PaperCustomShadow className={classes.box} border={1}>
										<Grid container className={classes.info}>
											<Grid item md={9} sm={8} xs={12}>
												<Grid container>
													<Grid item md={6} xs={12}>
														<Typography variant="body1">
															Availability from: {slot.startDay}
														</Typography>
													</Grid>
													<Grid item md={6} xs={12}>
														<Typography variant="body1">
															Availability to: {slot.endDay}
														</Typography>
													</Grid>
													<Grid item md={6} xs={12}>
														<Typography variant="body1">
															Time from: {slot.startTime}
														</Typography>
													</Grid>
													<Grid item md={6} xs={12}>
														<Typography variant="body1">Time to: {slot.endTime}</Typography>
													</Grid>
													<Grid item md={6} xs={12}>
														<Typography variant="body1">
															Slot Duration: {slot.slot}
														</Typography>
													</Grid>
													<Grid item md={6} xs={12}>
														<Typography variant="body1">
															Slot Price: {slot.amount}
														</Typography>
													</Grid>
												</Grid>
											</Grid>
											<Grid item md={3} sm={4} xs={12}>
												<IconButton
													disabled={slot.editStatus}
													onClick={() => {
														setIsEditing(slot.slotCreated);
													}}
													aria-label="edit"
												>
													<EditIcon />
												</IconButton>
												<IconButton
													onClick={(e) => {
														e.preventDefault();
														deleteSlot(slot.slotCreated, slot.id);
													}}
													aria-label="delete"
													color="secondary"
												>
													<DeleteOutlineIcon />
												</IconButton>
											</Grid>
										</Grid>
									</PaperCustomShadow>
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
