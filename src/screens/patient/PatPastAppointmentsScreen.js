import React, {useContext} from 'react';
import PatLayoutContainer from '../../components/layout/PatLayoutContainer';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Context as AuthContext } from '../../context/AuthContext';
import Loader from 'react-loader-spinner';
import ErrorMessage from '../../components/groups/ErrorMessage';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const LASTAPPOINTMENT_QUERY = gql`
	query GetAppointments($id: ID!, $cursor: String, $limit: Int ) {
		lastAppointmentsPatient(id: $id, cursor: $cursor, limit: $limit) {
			edges {
				profilePatientid
				_id
				appointmentTimeStart
				appointmentTimeEnd
				amount
				reasonForVisit
				profileHCPid {
					_id
					firstName
					lastName
					rating {
						averageRating
  						receivedRating
					}
				}
				accountHCPid {
					_id
					profilePicture
					username
				}
			},
			pageInfo {
				endCursor
  				hasNextPage
			},
			totalCount,
		}
	}
`;

const PatPastAppointmentScreen = () => {
	const { state: { userId } } = useContext(AuthContext);
	const { error, loading, data, fetchMore, refetch } = useQuery(LASTAPPOINTMENT_QUERY, {
		variables: {
			id: userId,
			cursor: null,
			limit: 3
		}
	});
	console.log('data', data)
	return (
		<PatLayoutContainer>
			<Typography variant="h4">Past Appointments</Typography>
			{loading && (
				<Container>
					<Loader type="TailSpin" color="primary" height={80} width={80} />
				</Container>
			)}
			{error && <ErrorMessage />}
			{ data && (
					<div>
					{data.lastAppointmentsPatient.edges.length > 0 ? (
						data.lastAppointmentsPatient.edges.map((el, i) => {
							return <div key={i}>
								{el.profilePatientid.firstName} - {" "}
								start:{el.appointmentTimeStart} - {" "}
								end:{el.appointmentTimeEnd} <br></br>
							</div>
						})
				) : null }
				{data.lastAppointmentsPatient.pageInfo.hasNextPage && (
			<button onClick={() => {
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

			}}>Load More</button>
			)}
				</div>
			)}
			
		</PatLayoutContainer>
	);
};

export default PatPastAppointmentScreen;
