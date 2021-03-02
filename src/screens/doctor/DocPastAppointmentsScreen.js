import React, { useContext } from 'react';
import DocLayoutContainer from '../../components/layout/DocLayoutContainer';
import Typography from '@material-ui/core/Typography';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Context as AuthContext } from '../../context/AuthContext';
import { makeStyles } from '@material-ui/core/styles';

const LASTAPPOINTMENT_QUERY = gql`
	query GetAppointments($id: ID!, $cursor: String, $limit: Int) {
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
			}
			pageInfo {
				endCursor
				hasNextPage
			}
			totalCount
		}
	}
`;

const useStyles = makeStyles({
	emptyState: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '20rem',
		flexDirection: 'column',
		textAlign: 'center'
	}
});

const DocPastAppointmentsScreen = () => {
	const { state: { userId } } = useContext(AuthContext);
	const { error, loading, data, fetchMore, refetch } = useQuery(LASTAPPOINTMENT_QUERY, {
		variables: {
			id: userId,
			cursor: null,
			limit: 3
		}
	});
	const classes = useStyles();
	console.log('data', data);
	return (
		<DocLayoutContainer>
			<Typography variant="h4">Doctor Past Appointments</Typography>
			{loading && (
				<Container className={classes.emptyState}>
					<Loader type="TailSpin" color="primary" height={80} width={80} />
				</Container>
			)}
			{error && <ErrorMessage />}
			{data && (
				<div>
					{data.lastAppointmentsDoctor.edges &&
						data.lastAppointmentsDoctor.edges.map((el, i) => {
							return (
								<div key={i}>
									{el.profilePatientid.firstName} - start:{el.appointmentTimeStart} - end:{el.appointmentTimeEnd}{' '}
									<br />
								</div>
							);
						})}
					{data.lastAppointmentsDoctor.pageInfo.hasNextPage && (
						<button
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
							Load More
						</button>
					)}
				</div>
			)}
		</DocLayoutContainer>
	);
};

export default DocPastAppointmentsScreen;
