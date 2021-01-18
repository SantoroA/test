import React, { useContext, useState } from 'react';
import { Context as SearchDoctorContext } from '../../context/SearchDoctorContext';
import { NavLink } from 'react-router-dom';
import Pagination from './Pagination';
import Image from 'material-ui-image';
//CUSTOM UI
import ButtonFilled from '../../components/customUi/ButtonFilled';
import BoxTime from '../../components/customUi/BoxTime';
import ButtonOutlined from '../customUi/ButtonOutlined';

//MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

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

const DoctorList = () => {
	const classes = useStyles();
	const { state: { doctors, docList }, reserve } = useContext(SearchDoctorContext);
	const [ showPerPage, setShowPerPage ] = useState(2);
	const [ pagination, setPagination ] = useState({
		start: 0,
		end: showPerPage
	});
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
	return (
		<div className={classes.mainContent}>
			{docList !== null ? (
				docList.slice(pagination.start, pagination.end).map((docs) => {
					return (
						<Card className={classes.card} key={docs.id}>
							<CardMedia className={classes.media} image={docs.image} title="Doctor">
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
												value={docs.averageRating}
												emptyIcon={<StarBorderIcon fontSize="inherit" />}
											/>
										</Box>
										<Typography component="legend" variant="body2">
											({docs.receivedRating} Reviews)
										</Typography>
									</Grid>
									<Grid item>
										<Typography variant="h5" className={classes.name}>
											Dr. {`${docs.firstname} ${docs.lastname}`}
										</Typography>
									</Grid>
									<Grid item>
										<Typography variant="body2">{docs.description}</Typography>
									</Grid>
									<Grid item className={classes.times}>
										{doctors
											.filter((el) => el.profileHCPid._id === docs.id)
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
									{Math.min(...doctors.map((e) => e.amount))}
									{/* $ {doc.amount} */}
								</Typography>
								<ButtonFilled onClick={() => reserve(docs._id)}>View All</ButtonFilled>
							</CardActions>
						</Card>
					);
				})
			) : null}

			<Pagination showPerPage={showPerPage} onPaginationChange={onPaginationChange} total={docList.length} />
		</div>
	);
};

export default DoctorList;
