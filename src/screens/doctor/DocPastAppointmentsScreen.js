import React, { useContext } from 'react';
import DocLayoutContainer from '../../components/layout/DocLayoutContainer';
import { useHistory } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Context as AuthContext } from '../../context/AuthContext';
import Loader from 'react-loader-spinner';
import ErrorMessage from '../../components/groups/ErrorMessage';
import { LASTAPPOINTMENT_DOCTOR_QUERY } from '../../context/GraphQl/graphQlQuery';
import CardAppointment from '../../components/groups/CardAppointment';
//CUSTOM UI
import ButtonNoBorder from '../../components/customUi/ButtonNoBorder';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

const DocPastAppointmentsScreen = () => {
	const { state: { userId } } = useContext(AuthContext);
	const history = useHistory();
	const { error, loading, data, fetchMore, refetch } = useQuery(LASTAPPOINTMENT_DOCTOR_QUERY, {
		variables: {
			id: userId,
			cursor: null,
			limit: 3
		}
	});

	const lastAppointmentsDoctor = {
		edges: [
			{
				profileHCPid: 'dasd',
				_id: 'ssf',
				appointmentTimeStart: new Date(),
				appointmentTimeEnd: new Date(),
				amount: 85,
				reasonForVisit: 'Headache',
				profilePatientid: {
					_id: 'asda',
					firstName: 'Taz',
					lastName: 'Mania'
				},
				accountPatientid: {
					_id: 'adefewf',
					profilePicture:
						'https://images.pexels.com/photos/5414814/pexels-photo-5414814.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
					username: 'email@test.com'
				}
			}
		]
	};

	const classes = useStyles();
	console.log('data', data);
	return (
		<DocLayoutContainer>
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

				{/* MOCK DATA */}
				{/* {lastAppointmentsDoctor.edges.map((ap) => {
					return (
						<div>
							<CardAppointment
								onSubmit={() => {}}
								key={ap._id}
								showPrice={false}
								state={{
									appointment: {
										amount: ap.amount,
										end: ap.appointmentTimeEnd,
										id: ap.profilePatientid._id,
										idap: ap._id,
										start: ap.appointmentTimeStart
									},
									name: `${ap.profilePatientid.firstName} ${ap.profilePatientid.lastName}`,
									pic: ap.accountPatientid.profilePicture,
									// ap.accountPatientid.profilePicture
									buttonText: 'View',
									title: 'Patient'
								}}
							/>
						</div>
					);
				})} */}

				{data && (
					<div>
						{data.lastAppointmentsDoctor.edges &&
							data.lastAppointmentsDoctor.edges.map((ap, i) => {
								return (
									<CardAppointment
										onSubmit={() => {}}
										key={ap._id}
										showPrice={false}
										state={{
											appointment: {
												amount: ap.amount,
												end: ap.appointmentTimeEnd,
												id: ap.profilePatientid._id,
												idap: ap._id,
												start: ap.appointmentTimeStart
											},
											name: `${ap.profilePatientid.firstName} ${ap.profilePatientid.lastName}`,
											pic: ap.accountPatientid.profilePicture,
											// ap.accountPatientid.profilePicture
											buttonText: 'View',
											title: 'Patient'
										}}
									/>
								);
							})}
						{data.lastAppointmentsDoctor.pageInfo.hasNextPage && (
							<ButtonNoBorder
								className={classes.buttonLoadMore}
								onClick={() => {
									const { endCursor } = data.lastAppointmentsDoctor.pageInfo;
									fetchMore({
										variables: {
											id: userId,
											limit: 3,
											cursor: endCursor
										},
										updateQuery: (prevResult, { fetchMoreResult }) => {
											console.log('prev', prevResult);
											console.log('fetch', fetchMoreResult);
											fetchMoreResult.lastAppointmentsDoctor.edges = [
												...prevResult.lastAppointmentsDoctor.edges,
												...fetchMoreResult.lastAppointmentsDoctor.edges
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
			</Container>
		</DocLayoutContainer>
	);
};

export default DocPastAppointmentsScreen;
