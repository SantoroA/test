import React, { useContext } from 'react';
import DocLayoutContainer from '../../components/layout/DocLayoutContainer';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Context as AuthContext } from '../../context/AuthContext';
import Loader from 'react-loader-spinner';
import ErrorMessage from '../../components/groups/ErrorMessage';
import { LASTAPPOINTMENT_DOCTOR_QUERY } from '../../context/GraphQl/graphQlQuery';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

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
	const { error, loading, data, fetchMore, refetch } = useQuery(LASTAPPOINTMENT_DOCTOR_QUERY, {
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
