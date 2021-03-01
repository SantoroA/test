import React, {useContext} from 'react';
import DocLayoutContainer from '../../components/layout/DocLayoutContainer';
import Typography from '@material-ui/core/Typography';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Context as AuthContext } from '../../context/AuthContext';

const LASTAPPOINTMENT_QUERY = gql`
	query GetAppointments($id: ID!, $cursor: String, $limit: Int ) {
		lastAppointmentsDoctor(id: $id, cursor: $cursor, limit: $limit) {
			edges {
				profileHCPid
				_id
				appointmentTimeStart
				appointmentTimeEnd
				amount
				reasonForVisit
				profilePatientid {
					_id
					firstName
					lastName
				}
				accountPatientid {
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

const DocPastAppointmentsScreen = () => {
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
		<DocLayoutContainer>
			<Typography variant="h4">Doctor Past Appointments</Typography>
			{
				data && (
					data.lastAppointmentsDoctor.edges.length > 0 ? (
						data.lastAppointmentsDoctor.edges.map((el, i) => {
							return <div key={i}>
								{el.profilePatientid.firstName} - {" "}
								start:{el.appointmentTimeStart} - {" "}
								end:{el.appointmentTimeEnd} <br></br>
							</div>
						})
				) : null
			)}
			{data.lastAppointmentsDoctor.pageInfo.hasNextPage && (
			<button onClick={() => {
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

			}}>Load More</button>
			)}
		</DocLayoutContainer>
	);
};

export default DocPastAppointmentsScreen;
