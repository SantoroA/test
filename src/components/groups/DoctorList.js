import React, { useContext, useState } from 'react';
import { Context as SearchDoctorContext } from '../../context/SearchDoctorContext';
import { Context as AuthContext } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import Pagination from './Pagination';
import DialogReserve from './DialogReserve';
import Loader from 'react-loader-spinner';
import { useQuery, gql } from '@apollo/client';
import MessageDialog from './MessageDialog';
//CUSTOM UI
import ButtonFilled from '../../components/customUi/ButtonFilled';
import BoxTime from '../../components/customUi/BoxTime';
//MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
// import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const useStyles = makeStyles({
	card: {
		display: 'flex',
		flexDirection: 'row',
		background: 'linear-gradient(180deg, #F0F9FF 0%, #FFFFFF 100%)',
		marginTop: '1rem',
		marginBottom: '1rem',
		borderRadius: '8px',
		boxShadow: '0px 6px 12px 0px rgba(16, 30, 115, 0.06)',
		justifyContent: 'space-between'
	},
	media: {
		minWidth: '12rem',
		display: 'flex',
		alignItems: 'flex-end',
		justifyContent: 'center',
		paddingBottom: '0.5rem'
	},
	rating: {
		paddingLeft: 0
	},
	ratingContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		'& fieldset': {
			padding: 0
		}
	},
	name: {
		fontWeight: 700,
		letterSpacing: '0.5px',
		color: '#52575C'
	},
	hours: {
		paddingTop: '1rem',
		fontWeight: 'bold',
		color: '#52575C'
	},

	reserve: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		minWidth: '8rem'
	},
	priceText: {
		color: 'rgba(82, 87, 92, 1)',
		fontWeight: 'bold'
	},
	content: {
		padding: '0',
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	docInfo: {
		display: 'flex',
		flexDirection: 'column',
		padding: '1rem',
		paddingTop: '0.5rem'
	},
	times: {
		display: 'flex',
		flexDirection: 'row',
		paddingTop: '0.5rem',
		paddingBottom: '0.5rem',
		justifyContent: 'space-between'
	},
	viewProfileButton: {
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		textTransform: 'none',
		fontWeight: 'bold',
		borderRadius: '10px'
	},
	viewAvailButton: {
		textTransform: 'none',
		fontWeight: 'bold',
		borderRadius: '10px'
	},
	icon: {
		marginRight: '0.5rem'
	},
	divider: {
		paddingTop: '1rem',
		paddingBottom: '1rem'
	}
});

// testar a string
// no back fazer um if do horario e fazer grater and litle

const APPOINTMENTS_QUERY = gql`
	query GetAppointments(
		$date: String!
		$typeOfHCP: String!
		$maxPrice: Float!
		$minPrice: Float!
		$rating: Float!
		$insurance: Int!
		$gender: Int!
		$time: String!
	) {
		appointment(
			date: $date
			typeOfHCP: $typeOfHCP
			minPrice: $minPrice
			maxPrice: $maxPrice
			gender: $gender
			insurance: $insurance
			rating: $rating
			time: $time
		) {
			_id
			appointmentDate
			appointmentTimeStart
			appointmentTimeEnd
			slotCreated
			appointmentWeek
			appointmentStatus
			amount
			profileHCPid {
				firstName
				lastName
				gender
				profileInfo
			}
			accountHCPid {
				profilePicture
			}
		}
	}
`;

const DoctorList = ({ filterState }) => {
	const { gender, time, insurance, minPrice, maxPrice, rating, date, typeOfHCP } = filterState;
	const classes = useStyles();
	const { state: { doctors, docList } } = useContext(SearchDoctorContext);
	const [ dialogReserveOpen, setDialogReserveOpen ] = useState(false);
	const [ docId, setDocId ] = useState('');
	const [ showPerPage, setShowPerPage ] = useState(2);
	const [ pagination, setPagination ] = useState({
		start: 0,
		end: showPerPage
	});
	const { loading, error, data } = useQuery(APPOINTMENTS_QUERY, {
		variables: { date, typeOfHCP, time, minPrice, maxPrice, rating, gender, insurance }
	});
	const [ dialogOpen, setDialogOpen ] = useState(error ? true : false);
	//USER ID
	const { state: { userId } } = useContext(AuthContext);
	// const userId = '5fe8b0c48bef090026e253b7';
	const convertTime = (start) => {
		let hours = new Date(start).getHours();
		let min = new Date(start).getMinutes();
		let realMin = min < 10 ? '00' : min;
		return `${hours}:${realMin}`;
	};
	console.log(docList);
	const onPaginationChange = (start, end) => {
		setPagination({ start: start, end: end });
	};
	console.log(data);
	if (loading)
		return (
			<Container>
				<Loader type="TailSpin" color="primary" height={80} width={80} />;
			</Container>
		);

	return (
		<div className={classes.mainContent}>
			{docList !== null ? (
				docList.map((doc) => {
					return (
						<Card className={classes.card} key={doc.id}>
							<CardMedia className={classes.media} image={doc.image} title="Doctor">
								<Button className={classes.viewProfileButton} color="primary" as={NavLink} to={''}>
									View Profile
								</Button>
							</CardMedia>
							<CardContent className={classes.content}>
								<Box borderLeft={10} borderColor="grey.300" />
								<Grid container className={classes.docInfo}>
									<Grid item className={classes.ratingContainer}>
										<Box component="fieldset" borderColor="transparent" className={classes.rating}>
											<Rating
												readOnly
												precision={0.5}
												name="rating"
												value={doc.averageRating}
												emptyIcon={<StarBorderIcon fontSize="inherit" />}
											/>
										</Box>
										<Typography component="legend" variant="body2">
											({doc.receivedRating} Reviews)
										</Typography>
									</Grid>
									<Grid item>
										<Typography variant="h5" className={classes.name}>
											Dr. {`${doc.firstName} ${doc.lastName}`}
										</Typography>
									</Grid>
									<Grid item>
										<Typography variant="body2">{doc.description}</Typography>
									</Grid>
									<Grid item className={classes.times}>
										{doctors
											.filter((el) => el.profileHCPid._id === doc.id)
											.slice(0, 3)
											.map((elem, i) => {
												return (
													<BoxTime key={i}>{convertTime(elem.appointmentTimeStart)}</BoxTime>
												);
											})}
										{/* <Button color="primary" className={classes.viewAvailButton}>
											<CalendarTodayIcon className={classes.icon} /> View all Availability
										</Button> */}
									</Grid>
								</Grid>
								<Grid className={classes.divider}>
									<Divider orientation="vertical" />
								</Grid>
							</CardContent>
							<CardActions className={classes.reserve}>
								<Typography className={classes.priceText} variant="body1">
									From
								</Typography>

								<Typography className={classes.priceText} variant="body1">
									${' '}
									{Math.min(
										...doctors.filter((el) => el.profileHCPid._id === doc.id).map((e) => e.amount)
									)}
									{/* $ {doc.amount} */}
								</Typography>
								<ButtonFilled
									onClick={() => {
										setDocId(doc.id);
										setDialogReserveOpen(true);
									}}
								>
									View Times
								</ButtonFilled>
							</CardActions>
						</Card>
					);
				})
			) : (
				[]
			)}
			<DialogReserve open={dialogReserveOpen} id={docId} close={() => setDialogReserveOpen(false)} />
			<MessageDialog open={dialogOpen} message={error} close={() => setDialogOpen(false)} />
			<Pagination showPerPage={showPerPage} onPaginationChange={onPaginationChange} total={docList.length} />
		</div>
	);
};

export default DoctorList;
