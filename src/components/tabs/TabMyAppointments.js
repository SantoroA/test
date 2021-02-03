import React, { useState, useContext } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import { formatDateDisplay, formatFormDate } from '../../helpers/dateHelper';
import CardAppointment from '../groups/CardAppointment';
//CUSTOM UI
import CalendarApp from '../customUi/CalendarApp';
import PaperCustomShadow from '../customUi/PaperCustomShadow';
//CUSTOM ICONS
import EmptyCalendarIcon from '../customIcons/EmptyCalendarIcon';
//MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import { useQuery, gql } from '@apollo/client';

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
	datePickerMobile: {
		'& .MuiFilledInput-root': {
			backgroundColor: 'rgba(255, 255, 255, 0)'
		},
		'& .MuiInputBase-input': {
			textAlign: 'center',
			fontSize: '1.2rem'
		},
		marginBottom: '1rem'
	},
	sub: {
		fontWeight: 700,
		marginBottom: '1rem'
	},
	emptyCalendar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '20rem',
		flexDirection: 'column'
	},
	icon: {
		fontSize: '5rem',
		marginTop: '1rem'
	},
	detail: {
		fontWeight: 'bold',
		marginTop: '1rem'
	}
});

const MYAPPOINTMENTS_QUERY = gql`
	query GetAppointments(
		$date: String!
		$id: ID!
		$offset: Int
		$limit: Int

	) {
		doctorsAppointments(
			date: $date
			id: $id
			offset: $offset
			limit: $limit
		) {
			profileHCPid
			_id
			appointmentTimeStart
			appointmentTimeEnd
			profilePatientid {
				_id
				firstName
				lastName
			  },
			accountPatientid {
				  profilePicture
			  }
			amount
			}
	}
`;

const TabMyAppointments = () => {
	const classes = useStyles();
	const theme = useTheme();
	const [ date, setDate ] = useState(new Date());
	const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
	const { state: { userId } } = useContext(AuthContext);
	const { loading, error, data, fetchMore } = useQuery(MYAPPOINTMENTS_QUERY, {
		variables: { date, id: userId, offset: 0, limit: 1}
	});
	// console.log(date);
	// console.log(formatFormDate(date));
	// console.log(new Date(formatFormDate(date)));
	console.log(userId)
	console.log(data)
	return (
		<Grid className={classes.root} container>
			<Grid item sm={7} md={8}>
				{isMobile && (
					<Grid item xs={12}>
						<TextField
							fullWidth
							id="date"
							type="date"
							variant="filled"
							className={classes.datePickerMobile}
							value={formatFormDate(date)}
							onChange={(e) => setDate(new Date(e.target.value))}
							InputProps={{
								disableUnderline: true
							}}
						/>
					</Grid>
				)}
				<Typography variant="subtitle1">SHOWING APPOINTMENT FOR</Typography>
				<Typography color="primary" className={classes.sub} variant="h5">
					{formatDateDisplay(date)}
				</Typography>
				{/* <PaperCustomShadow className={classes.emptyCalendar}>
					<Typography color="textSecondary" variant="subtitle1">
						Start by updating your profile to be seen by patients!
					</Typography>
					<EmptyCalendarIcon className={classes.icon} />
					<Typography className={classes.detail} variant="subtitle1">
						No Appointments Scheduled
					</Typography>
				</PaperCustomShadow> 
				<CardAppointment */}
				{data !== undefined ? (
				data.doctorsAppointments.map((apt) => {
					return (
						<CardAppointment
					// onSubmit={() => {}}
					key={apt._id}
					state={{
						appointment: {
							amount: apt.amount,
							end: apt.appointmentTimeEnd,
							id: apt.profilePatientid._id,
							idApt: apt._id,
							start: apt.appointmentTimeStart,
						},
						name: `${apt.profilePatientid.firstName} ${apt.profilePatientid.lastName}`,
						pic:
							'https://images.pexels.com/photos/2050994/pexels-photo-2050994.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
							// apt.accountPatientid.profilePicture
						buttonText: 'View',
						title: 'Patient'
					}}
				/>
					)
				})
				): null}
				
			</Grid>
			{!isMobile && (
				<Grid item sm={5} md={4} className={classes.datePicker}>
					<CalendarApp value={date} onChange={setDate} />
				</Grid>
			)}
		</Grid>
	);
};

export default TabMyAppointments;
