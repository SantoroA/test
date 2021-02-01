import React, { useState } from 'react';
import { formatDateDisplay } from '../../helpers/dateHelper';
import CardAppointment from '../groups/CardAppointment';
//CUSTOM UI
import CalendarApp from '../customUi/CalendarApp';
//MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'row'
	},
	section: {
		marginTop: '2em'
	},
	datePicker: {
		padding: '1rem'
	},
	sub: {
		fontWeight: 700,
		marginBottom: '1rem'
	}
});

const TabMyAppointments = () => {
	const classes = useStyles();
	const [ date, setDate ] = useState(new Date());
	console.log(date);
	return (
		<Grid className={classes.root} container>
			<Grid item sm={8} md={8}>
				<Typography variant="subtitle1">SHOWING APPOINTMENT FOR</Typography>
				<Typography color="primary" className={classes.sub} variant="h5">
					{formatDateDisplay(date)}
				</Typography>
				<CardAppointment
					onSubmit={() => {}}
					state={{
						appointment: {
							amount: 85,
							end: '2021-01-29T07:15:00.000Z',
							id: '601175526913da0029424025',
							idApt: '601186c472a95e0028bcb6f5',
							start: '2021-01-29T06:50:00.000Z'
						},
						name: 'Aline',
						pic:
							'https://images.pexels.com/photos/2050994/pexels-photo-2050994.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
						buttonText: 'View',
						title: 'Doctor'
					}}
				/>
			</Grid>
			<Grid item xs={false} md={4} className={classes.datePicker}>
				<CalendarApp value={date} onChange={setDate} />
			</Grid>
		</Grid>
	);
};

export default TabMyAppointments;
