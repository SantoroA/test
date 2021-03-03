import React, { useState } from 'react';
import DialogReserve from '../DialogReserve';
import Loader from 'react-loader-spinner';
import { useQuery } from '@apollo/client';
import useStyles from './style';
import { APPOINTMENTS_QUERY_DOCLIST } from '../../../context/GraphQl/graphQlQuery';
import EmptyDocState from './emptyState';
import ShowDocData from './showData';
import ErrorMessage from '../ErrorMessage';
//CUSTOM UI
import ButtonNoBorder from '../../customUi/ButtonNoBorder';
//MATERIAL UI
import Container from '@material-ui/core/Container';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const DoctorList = ({ filterState, dateFormatted }) => {
	const { gender, time, minPrice, maxPrice, rating, date, typeOfHCP } = filterState;

	const [ dialogReserveOpen, setDialogReserveOpen ] = useState(false);
	const [ apDoc, setApDoc ] = useState('');
	const [ appointments, setAppointments ] = useState([]);

	const { loading, error, data, fetchMore } = useQuery(APPOINTMENTS_QUERY_DOCLIST, {
		variables: {
			date,
			typeOfHCP,
			time,
			minPrice,
			maxPrice,
			rating,
			gender,
			limit: 2,
			cursor: null
		}
	});
	const classes = useStyles();

	console.log('data', data);

	return (
		<div className={classes.mainContent}>
			{loading && (
				<Container className={classes.emptyState}>
					<Loader type="TailSpin" color="primary" height={80} width={80} />
				</Container>
			)}
			{/* DUMMY CONTENT  */}
			{/* <ShowDocData
				docs={[
					{
						id: 'ad',
						image:
							'https://images.pexels.com/photos/4590047/pexels-photo-4590047.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
						firstname: 'Bianca',
						lastname: 'Green',
						rating: {
							averageRating: 4,
							receivedRating: '50'
						},

						profileInfo: 'sdfsf',
						appointments: [
							{
								start: new Date(),
								end: new Date(),
								idApt: 'asd',
								amount: 85
							}
						],
						minPrice: 75
					}
				]}
				setDialogReserveOpen={setDialogReserveOpen}
				setAppointments={setAppointments}
				setApDoc={setApDoc}
			/> */}
			{data && (
				<div>
					{data.searchAppointments.edges.length > 0 ? (
						<div className={classes.infoContainer}>
							<ShowDocData
								docs={data.searchAppointments.edges}
								setDialogReserveOpen={setDialogReserveOpen}
								setAppointments={setAppointments}
								setApDoc={setApDoc}
							/>
							{data.searchAppointments.pageInfo.hasNextPage && (
								<ButtonNoBorder
									className={classes.buttonLoadMore}
									onClick={() => {
										const { endCursor } = data.searchAppointments.pageInfo;
										fetchMore({
											variables: {
												date,
												typeOfHCP,
												time,
												minPrice,
												maxPrice,
												rating,
												gender,
												limit: 3,
												cursor: endCursor
											},
											updateQuery: (prevResult, { fetchMoreResult }) => {
												console.log('prev', prevResult);
												console.log('fetch', fetchMoreResult);
												fetchMoreResult.searchAppointments.edges = [
													...prevResult.searchAppointments.edges,
													...fetchMoreResult.searchAppointments.edges
												];
												return fetchMoreResult;
												// if endcursor === false No data
											}
										});
									}}
								>
									Load More <ExpandMoreIcon />
								</ButtonNoBorder>
							)}
						</div>
					) : (
						<EmptyDocState />
					)}
				</div>
			)}
			{error && <ErrorMessage />}
			{appointments && (
				<DialogReserve
					open={dialogReserveOpen}
					dateFormatted={dateFormatted}
					appointments={appointments}
					apDoc={apDoc}
					close={() => {
						setDialogReserveOpen(false);
						setAppointments('');
						setApDoc('');
					}}
				/>
			)}
		</div>
	);
};

export default DoctorList;
