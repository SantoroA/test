import React, { useState, useContext } from 'react';
import { Context as AuthContext } from '../../../context/AuthContext';
import { formatDateDisplay, formatFormDate } from '../../../helpers/dateHelper';
import Loader from 'react-loader-spinner';
import DialogAppointmentDetail from '../../groups/DialogAppoitmentDetail';
import { useQuery, gql } from '@apollo/client';
import useStyles from './style';
import EmptyAppState from './emptyState';
import ShowAppData from './showData';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../../groups/ErrorMessage';
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
		variables: { date: formatFormDate(date), id: userId, limit: 2, cursor: null }
	});

	const { t } = useTranslation();
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
							onChange={(e) => setDate(new Date(`${e.target.value}T00:00:00`))}
							InputProps={{
								disableUnderline: true
							}}
						/>
					</Grid>
				)}
				<Typography variant="subtitle1">{t('Showing_appointment_for.1')}</Typography>
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

				{error && <ErrorMessage />}
				{data && (
					<div>
						{data.patientAppointments.length > 0 ? (
							data.patientAppointments.map((apt) => {
								return <ShowAppData
								setDialogAppDetailOpen={setDialogAppDetailOpen}
								appointments={[
									{
										profilePatientid: apt.profilePatientid,
										_id: apt._id,
										appointmentTimeStart: apt.appointmentTimeStart,
										appointmentTimeEnd: apt.appointmentTimeEnd,
										accountHCPid: {
											profilePicture: apt.accountHCPid.profilePicture
										},
										profileHCPid: {
											_id: apt.profileHCPid._id,
											firstName: apt.profileHCPid.firstName,
											lastName: apt.profileHCPid.lastName
										},
										amount: apt.amount
									}
								]}
								setAppointmentToView={setAppointmentToView}
							/>
							})
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
						aptId: appointmentToView._id,
						cardPic: appointmentToView.accountHCPid.profilePicture,
						cardName: appointmentToView.profileHCPid.lastName,
						docId: appointmentToView.profileHCPid._id,
						patientId: appointmentToView.profilePatientid,
						timeStart: appointmentToView.appointmentTimeStart,
						timeEnd: appointmentToView.appointmentTimeEnd,
						amount: appointmentToView.amount,
						cardTitle: 'Doctor',
						showPrice: true
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
