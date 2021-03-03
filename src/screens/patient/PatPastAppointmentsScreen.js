import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PatLayoutContainer from '../../components/layout/PatLayoutContainer';
import DialogAppointmentDetail from '../../components/groups/DialogAppoitmentDetail';
import { useQuery } from '@apollo/client';
import { Context as AuthContext } from '../../context/AuthContext';
import Loader from 'react-loader-spinner';
import ErrorMessage from '../../components/groups/ErrorMessage';
import { LASTAPPOINTMENT_PATIENT_QUERY } from '../../context/GraphQl/graphQlQuery';
import CardAppointment from '../../components/groups/CardAppointment';
//CUSTOM UI
import ButtonNoBorder from '../../components/customUi/ButtonNoBorder';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	emptyState: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '20rem',
		flexDirection: 'column',
		textAlign: 'center'
	},

	backButton: {
		textTransform: 'none',
		display: 'flex',
		flexDirection: 'row',
		color: '#07B597',
		marginTop: '2rem',
		marginBottom: '1rem',
		alignSelf: 'flex-start'
	},
	buttonLoadMore: {
		alignSelf: 'center'
	}
});

const PatPastAppointmentScreen = () => {
	const [ appointmentToView, setAppointmentToView ] = useState('');
	const [ dialogAppDetailOpen, setDialogAppDetailOpen ] = useState(false);
	const { state: { userId } } = useContext(AuthContext);
	const history = useHistory();
	const { error, loading, data, fetchMore, refetch } = useQuery(LASTAPPOINTMENT_PATIENT_QUERY, {
		variables: {
			id: userId,
			cursor: null,
			limit: 3
		}
	});
	const classes = useStyles();
	console.log('data', data);

	// const lastAppointmentsPatient = {
	// 	edges: [
	// 		{
	// 			profilePatientid: 'sdf',

	// 			_id: 'ssf',
	// 			appointmentTimeStart: new Date(),
	// 			appointmentTimeEnd: new Date(),
	// 			amount: 85,
	// 			reasonForVisit: 'Headache',
	// 			profileHCPid: {
	// 				_id: 'asda',
	// 				firstName: 'Bugs',
	// 				lastName: 'Bunny',
	// 				rating: {
	// 					averageRating: 4.5,
	// 					receivedRating: '45'
	// 				}
	// 			},
	// 			accountHCPid: {
	// 				_id: 'adefewf',
	// 				profilePicture:
	// 					'https://images.pexels.com/photos/5414814/pexels-photo-5414814.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
	// 				username: 'docemail@test.com'
	// 			}
	// 		}
	// 	]
	// };

	return (
		<PatLayoutContainer>
			<Container maxWidth="md">
				<Button onClick={() => history.goBack()} className={classes.backButton}>
					<ArrowBackIcon />
					<Typography>Back to my profile</Typography>
				</Button>
				<Divider />

				{loading && (
					<Container className={classes.emptyState}>
						<Loader type="TailSpin" color="primary" height={80} width={80} />
					</Container>
				)}
				{error && <ErrorMessage />}

				{data && (
					<div>
						{data.lastAppointmentsPatient.edges &&
							data.lastAppointmentsPatient.edges.map((ap, i) => {
								return (
									<CardAppointment
										onSubmit={() => {
											setDialogAppDetailOpen(true);
											setAppointmentToView(ap);
										}}
										key={ap._id}
										showPrice={false}
										state={{
											appointment: {
												amount: ap.amount,
												end: ap.appointmentTimeEnd,
												id: ap.profilePatientid,
												idap: ap._id,
												start: ap.appointmentTimeStart
											},
											name: `${ap.profileHCPid.firstName} ${ap.profileHCPid.lastName}`,
											pic: ap.accountHCPid.profilePicture,
											// ap.accountHCPid.profilePicture
											buttonText: 'View',
											title: 'Doctor'
										}}
									/>
								);
							})}
						{data.lastAppointmentsPatient.pageInfo.hasNextPage && (
							<ButtonNoBorder
								className={classes.buttonLoadMore}
								onClick={() => {
									const { endCursor } = data.lastAppointmentsPatient.pageInfo;
									fetchMore({
										variables: {
											id: userId,
											limit: 3,
											cursor: endCursor
										},
										updateQuery: (prevResult, { fetchMoreResult }) => {
											console.log('prev', prevResult);
											console.log('fetch', fetchMoreResult);
											fetchMoreResult.lastAppointmentsPatient.edges = [
												...prevResult.lastAppointmentsPatient.edges,
												...fetchMoreResult.lastAppointmentsPatient.edges
											];
											return fetchMoreResult;
										}
									});
								}}
							>
								Load More <ExpandMoreIcon />
							</ButtonNoBorder>
						)}
					</div>
				)}
				{appointmentToView && (
					<DialogAppointmentDetail
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
			</Container>
		</PatLayoutContainer>
	);
};

export default PatPastAppointmentScreen;
