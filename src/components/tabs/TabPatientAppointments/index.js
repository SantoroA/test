import React, { useState, useContext } from 'react';
import { Context as AuthContext } from '../../../context/AuthContext';
import { formatDateDisplay, formatFormDate } from '../../../helpers/dateHelper';
import Loader from 'react-loader-spinner';
import DialogAppointmentDetail from '../../groups/DialogAppoitmentDetail';
import { useQuery, gql } from '@apollo/client';
import useStyles from './style';
import EmptyAppState from './EmptyAppState';
import ShowAppData from './ShowAppData';
//CUSTOM UI
import CalendarApp from '../../customUi/CalendarApp';
//MATERIAL UI
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

 const MYAPPOINTMENTS_QUERY = gql`
 	query GetAppointments($date: String!, $id: ID!) {
 		patientAppointments(date: $date, id: $id) {
 			profilePatientid
 			_id
 			appointmentTimeStart
 			appointmentTimeEnd
 			profileHCPid {
 				_id
 				firstName
 				lastName
 			}
 			accountHCPid {
 				profilePicture
 			}
 			amount
 		}
 	}
 `;

const TabPatientAppointments = () => {
	const classes = useStyles();
	const theme = useTheme();
	const [ appointmentToView, setAppointmentToView ] = useState('');
	const [ date, setDate ] = useState(new Date());
	const [ dialogAppDetailOpen, setDialogAppDetailOpen ] = useState(false);
	const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
	const { state: { userId } } = useContext(AuthContext);
	const { loading, error, data } = useQuery(MYAPPOINTMENTS_QUERY, {
		variables: { date, id: userId, limit: 2, cursor: null }
	});
	console.log(date);
	console.log(formatFormDate(date));
	console.log(new Date(formatFormDate(date)));
	console.log(userId);
	console.log('data', data);
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
				{/* <ShowAppData
					setDialogAppDetailOpen={setDialogAppDetailOpen}
					appointments={[
						{
							 profilePatientid: appointments.profilePatientid,
							 _id: appointments._id,
							 appointmentTimeStart: new Date(),
							 appointmentTimeEnd: new Date(),
							 pic: appointments.profilePicture,
							 profileAccountid: {
							 	_id: appointments.profileAccountid._id,
							 	firstName: appointments.profileAccountid.firstName,
							 	lastName: appointments.profileAccountid.lastName,
							 },
							 amount: appointments.amount
						}
					]}
					setAppointmentToView={setAppointmentToView}
				/> */}
				 {loading && (
					<Container className={classes.emptyState}>
						<Loader type="TailSpin" color="primary" height={80} width={80} />
					</Container>
				)}

				{error && (
					<Container className={classes.emptyState}>
						<Typography color="textSecondary" variant="h4">
							Something went wrong, please try again later
						</Typography>
					</Container>
				)}
				{data && (
					<div>
						{console.log(data.patientAppointments[0])}
						{data.patientAppointments.length > 0 ? (
							<ShowAppData
								setDialogAppDetailOpen={setDialogAppDetailOpen}
								appointments={[
									{
										profilePatientid: data.patientAppointments[0].profilePatientid,
										_id: data.patientAppointments[0]._id,
										appointmentTimeStart: data.patientAppointments[0].appointmentTimeStart,
										appointmentTimeEnd: data.patientAppointments[0].appointmentTimeEnd,
										accountHCPid: {
											profilePicture: data.patientAppointments[0].accountHCPid.profilePicture
										},
										profileHCPid: {
											_id: data.patientAppointments[0].profileHCPid._id,
											firstName: data.patientAppointments[0].profileHCPid.firstName,
											lastName: data.patientAppointments[0].profileHCPid.lastName,
										},
										amount: data.patientAppointments[0].amount
									}
								]}
								setAppointmentToView={setAppointmentToView}
							/>
						) : (
							<EmptyAppState />
						)}
					</div>
				)}
			</Grid>
			{!isMobile && (
				<Grid item sm={5} md={4} className={classes.datePicker}>
					<CalendarApp value={date} onChange={setDate} />
				</Grid>
			)}
			{console.log(appointmentToView)}
			{appointmentToView && (
				<DialogAppointmentDetail
					//  appointment={appointmentToView}
					  appointment={{
					  	profilePatientid: appointmentToView.profilePatientid,
					  	_id: appointmentToView._id,
					  	appointmentTimeStart: appointmentToView.appointmentTimeStart,
					  	appointmentTimeEnd: appointmentToView.appointmentTimeEnd,
					  	profileHCPid: {
					  		_id: appointmentToView.profileHCPid._id,
					  		firstName: appointmentToView.profileHCPid.firstName,
					  		lastName: appointmentToView.profileHCPid.lastName
					  	},
					  	accountHCPid: {
					  		profilePicture: appointmentToView.accountHCPid.profilePicture		  			
					  	},
					  	amount: appointmentToView.amount
					  }}
					isOpen={dialogAppDetailOpen}
					close={() => {
						setDialogAppDetailOpen(false);
						setAppointmentToView('');
					}}
				/>
			)}
		</Grid>
	);
};
// message de erro
export default TabPatientAppointments;
