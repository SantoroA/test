import React, { useState, useContext } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import { formatDateDisplay, formatFormDate } from '../../helpers/dateHelper';
import CardAppointment from '../groups/CardAppointment';
import Loader from 'react-loader-spinner';
import DialogAppointmentDetail from '../groups/DialogAppoitmentDetail';
import { useQuery, gql } from '@apollo/client';
//CUSTOM UI
import CalendarApp from '../customUi/CalendarApp';
import PaperCustomShadow from '../customUi/PaperCustomShadow';
//CUSTOM ICONS
import EmptyCalendarIcon from '../customIcons/EmptyCalendarIcon';
//MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

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
	emptyState: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '20rem',
		flexDirection: 'column',
		textAlign: 'center'
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
	query GetAppointments($date: String!, $id: ID!) {
		doctorsAppointments(date: $date, id: $id) {
				profileHCPid
			_id
			appointmentTimeStart
			appointmentTimeEnd
			profilePatientid {
				_id
				firstName
				lastName
			}
			accountPatientid {
				profilePicture
			}
			amount
			}

	}
`;

const ShowData = (appointments) => {
	const [ dialogAppDetailOpen, setDialogAppDetailOpen ] = useState(false);
	console.log('apt',appointments.appointments)
	return appointments.appointments.map((apt) => {
		return (
			<div>
				<CardAppointment
					onSubmit={() => setDialogAppDetailOpen(true)}
					key={apt._id}
					state={{
						appointment: {
							amount: apt.amount,
							end: apt.appointmentTimeEnd,
							id: apt.profilePatientid._id,
							idApt: apt._id,
							start: apt.appointmentTimeStart
						},
						name: `${apt.profilePatientid.firstName} ${apt.profilePatientid.lastName}`,
						pic: apt.accountPatientid.profilePicture,
						// apt.accountPatientid.profilePicture
						buttonText: 'View',
						title: 'Patient'
					}}
				/>

				<DialogAppointmentDetail
					key={apt.profilePatientid._id}
					appointment={{
						profileHCPid: 'asdasd',
						_id: apt._id,
						appointmentTimeStart: apt.appointmentTimeStart,
						appointmentTimeEnd: apt.appointmentTimeEnd,
						profilePatientid: {
							_id: 'asd',
							firstName: apt.profilePatientid.firstName,
							lastName: apt.profilePatientid.lastName
						},
						accountPatientid: {
							profilePicture: apt.accountPatientid.profilePicture,
						},
						amount: apt.amount
					}}
					isOpen={dialogAppDetailOpen}
					close={() => setDialogAppDetailOpen(false)}
				/>
			</div>
		);
	});
};

const EmptyAppState = () => {
	const classes = useStyles();
	return (
		<PaperCustomShadow className={classes.emptyState}>
			<Typography color="textSecondary" variant="subtitle1">
				Start by updating your profile to be seen by patients!
			</Typography>
			<EmptyCalendarIcon className={classes.icon} />
			<Typography className={classes.detail} variant="subtitle1">
				No Appointments Scheduled
			</Typography>
		</PaperCustomShadow>
	);
};

const TabMyAppointments = () => {
	const classes = useStyles();
	const theme = useTheme();
	const [ date, setDate ] = useState(new Date());

	const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
	const { state: { userId } } = useContext(AuthContext);
	const { loading, error, data } = useQuery(MYAPPOINTMENTS_QUERY, {
		variables: { date, id: userId, limit: 2, cursor: null }
	});
	// console.log(date);
	// console.log(formatFormDate(date));
	// console.log(new Date(formatFormDate(date)));
	console.log(userId);
	console.log('data',data);
	console.log(error);
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

				{loading && (
					<Container className={classes.emptyState}>
						<Loader type="TailSpin" color="primary" height={80} width={80} />
					</Container>
				)}
				{data && (
					<div>
						{data.doctorsAppointments.length > 0 ? (
							<ShowData appointments={data.doctorsAppointments} />
						) : (
							<EmptyAppState />
						)}
					</div>
				)}

				{error && (
					<Container className={classes.emptyState}>
						<Typography color="textSecondary" variant="h4">
							Something went wrong, please try again later
						</Typography>
					</Container>
				)}
			</Grid>
			{!isMobile && (
				<Grid item sm={5} md={4} className={classes.datePicker}>
					<CalendarApp value={date} onChange={setDate} />
				</Grid>
			)}
		</Grid>
	);
};
// message de erro
export default TabMyAppointments;
