import React, { useState } from 'react';
import DialogReserve from '../DialogReserve';
import Loader from 'react-loader-spinner';
import { useQuery, gql } from '@apollo/client';
import useStyles from './style';
import EmptyDocState from './emptyState';
import ShowDocData from './showData';
import ErrorMessage from '../ErrorMessage';
//CUSTOM UI
import ButtonNoBorder from '../../customUi/ButtonNoBorder';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// testar a string
// no back fazer um if do horario e fazer grater and litle

const APPOINTMENTS_QUERY = gql`
	query GetAppointments(
		$date: String!
		$typeOfHCP: String!
		$maxPrice: Float!
		$minPrice: Float!
		$rating: Float!
		$gender: Int!
		$time: String!
		$offset: Int
		$limit: Int
		$cursor: ID
	) {
		doctors(
			date: $date
			typeOfHCP: $typeOfHCP
			minPrice: $minPrice
			maxPrice: $maxPrice
			gender: $gender
			rating: $rating
			time: $time
			offset: $offset
			limit: $limit
			cursor: $cursor
		) {
			edges {
				firstname
				lastname
				image
				description
				averageRating
				receivedRating
				id
				minPrice
				appointments {
					amount
					idApt
					start
					end
					id
				}
			}
			totalCount
			pageInfo {
				endCursor
				hasNextPage
			}
		}
	}
`;

const DoctorList = ({ filterState, dateFormatted }) => {
	const { gender, time, minPrice, maxPrice, rating, date, typeOfHCP } = filterState;

	const [ dialogReserveOpen, setDialogReserveOpen ] = useState(false);
	const [ apDoc, setApDoc ] = useState('');
	const [ appointments, setAppointments ] = useState([]);

	const { loading, error, data, fetchMore } = useQuery(APPOINTMENTS_QUERY, {
		variables: {
			date,
			typeOfHCP,
			time,
			minPrice,
			maxPrice,
			rating,
			gender,
			offset: 0,
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
						fistName: 'Bianca',
						lastName: 'Green',
						receivedRating: '5',
						averageRating: 4,
						description: 'sdfsf',
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
					{data.doctors.edges.length > 0 ? (
						<div className={classes.infoContainer}>
							<ShowDocData
								docs={data.doctors.edges}
								setDialogReserveOpen={setDialogReserveOpen}
								setAppointments={setAppointments}
								setApDoc={setApDoc}
							/>
							{data.doctors.pageInfo.hasNextPage && (
								<ButtonNoBorder
									className={classes.buttonLoadMore}
									onClick={() => {
										const { endCursor } = data.doctors.pageInfo;
										fetchMore({
											variables: {
												date,
												typeOfHCP,
												time,
												minPrice,
												maxPrice,
												rating,
												gender,
												offset: 0,
												limit: 3,
												cursor: endCursor
											},
											updateQuery: (prevResult, { fetchMoreResult }) => {
												console.log('prev', prevResult);
												console.log('fetch', fetchMoreResult);
												fetchMoreResult.doctors.edges = [
													...prevResult.doctors.edges,
													...fetchMoreResult.doctors.edges
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
