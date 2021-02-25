import React from 'react';
import { Link } from 'react-router-dom';
import { convertTime } from '../../../helpers/dateHelper';
import useStyles from './style';
//CUSTOM UI
import ButtonFilled from '../../customUi/ButtonFilled';
import BoxTime from '../../customUi/BoxTime';
//MATERIAL UI
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

const ShowDocData = ({ docs, setAppointments, setApDoc, setDialogReserveOpen }) => {
	const classes = useStyles();
	return docs.map((doc) => {
		console.log(doc)
		return (
			<Card className={classes.card} key={doc.id}>
				<CardMedia className={classes.media} image={doc.image} title="Doctor">
					<Button
						className={classes.viewProfileButton}
						color="primary"
						component={Link}
						to={{
							pathname: '/in/patient/doctorprofile',
							state: {
								id: doc.id,
								rating: doc.rating,
								description: doc.profileInfo,
								firstname: doc.firstname,
								lastname: doc.lastname,
								minPrice: doc.minPrice,
								image: doc.image,
							}
						}}
					>
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
								Dr. {`${doc.firstname} ${doc.lastname}`}
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant="body2">{doc.description}</Typography>
						</Grid>
						<Grid item className={classes.times}>
							{doc.appointments.slice(0, 3).map((elem, i) => {
								return <BoxTime key={i}>{convertTime(elem.start)}</BoxTime>;
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
						$ {doc.minPrice}
						{/* {Math.min(
								...doctors.filter((el) => el.profileHCPid._id === doc.id).map((e) => e.amount)
							)} */}
						{/* $ {doc.amount} */}
					</Typography>
					<ButtonFilled
						onClick={() => {
							setDialogReserveOpen(true);
							setAppointments(doc.appointments);
							setApDoc({ lastName: doc.lastname, pic: doc.image });
						}}
					>
						View
					</ButtonFilled>
				</CardActions>
			</Card>
		);
	});
};

export default ShowDocData;
