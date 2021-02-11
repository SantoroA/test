import React, { useState, useContext } from 'react';
import { Context as AuthContext } from '../../../context/AuthContext';
import { formatDateDisplay, formatFormDate } from '../../../helpers/dateHelper';
import Loader from 'react-loader-spinner';
import DialogAppointmentDetail from '../../groups/DialogAppoitmentDetail';
import { useQuery, gql } from '@apollo/client';
import useStyles from './style';
import EmptyAppState from './EmptyAppState';
import ShowAppData from './ShowAppData';
import { useTranslation } from 'react-i18next';
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

const TabMyAppointments = () => {
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
	// console.log(date);
	// console.log(formatFormDate(date));
	// console.log(new Date(formatFormDate(date)));
	console.log(userId);
	console.log('data', data);
	console.log(error);
	const { t , i18n} = useTranslation();
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
				<Typography variant="subtitle1">{t('Showing_appointment_for.1')}</Typography>
				<Typography color="primary" className={classes.sub} variant="h5">
					{formatDateDisplay(date)}
				</Typography>

				{loading && (
					<Container className={classes.emptyState}>
						<Loader type="TailSpin" color="primary" height={80} width={80} />
					</Container>
				)}

				{error && (
					<Container className={classes.emptyState}>
						<Typography color="textSecondary" variant="h4">
							{t('Something_wrong.1')}
						</Typography>
					</Container>
				)}
				{data && (
					<div>
						{data.doctorsAppointments.length > 0 ? (
							<ShowAppData
								setDialogAppDetailOpen={setDialogAppDetailOpen}
								appointments={data.doctorsAppointments}
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
			{appointmentToView && (
				<DialogAppointmentDetail
					appointment={appointmentToView}
					// appointment={{
					// 	profileHCPid: 'asdasd',
					// 	_id: 'asdasd',
					// 	appointmentTimeStart: new Date(),
					// 	appointmentTimeEnd: new Date(),
					// 	profilePatientid: {
					// 		_id: 'asd',
					// 		firstName: 'Aline',
					// 		lastName: 'Santoro'
					// 	},
					// 	accountPatientid: {
					// 		profilePicture:
					// 			'https://images.pexels.com/photos/2050994/pexels-photo-2050994.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
					// 	},
					// 	amount: 45
					// }}
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
export default TabMyAppointments;
