import React, { useContext } from 'react';
import { Context as SearchDoctorContext } from '../../context/SearchDoctorContext';
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
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
	card: {
		display: 'flex',
		flexDirection: 'row',
		background: 'linear-gradient(180deg, #F0F9FF 0%, #FFFFFF 100%)',
		// height: '12rem',
		marginTop: '1rem',
		marginBottom: '1rem',
		borderRadius: '8px',
		boxShadow: '0px 6px 12px 0px rgba(16, 30, 115, 0.06)'
	},
	media: {
		width: '15rem'
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

	dividor: {
		height: 102,
		marginTop: '5%',
		color: '#E8E8E8'
	},
	reserve: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		minWidth: '8rem'
	},
	content: {
		padding: '0.5rem',
		paddingLeft: '1rem'
	},
	docInfo: {
		display: 'flex',
		flexDirection: 'column'
	},
	times: {
		display: 'flex',
		flexDirection: 'row'
	}
});

const DoctorCard = () => {
	const classes = useStyles();
	const { state: { doctors }, reserve } = useContext(SearchDoctorContext);
	const convertTime = (start) => {
		let hours = new Date(start).getHours();
		let min = new Date(start).getMinutes();
		let realMin = min < 10 ? '00' : min;
		return `${hours}:${realMin}`;
	};
	console.log(doctors);
	return (
		<div className={classes.mainContent}>
			{doctors.map((doc) => {
				return (
					<Card className={classes.card} key={doc._id}>
						<CardMedia className={classes.media} image={doc.accountHCPid.profilePicture} title="Doctor" />
						<Box borderLeft={10} borderColor="grey.300" />
						<CardContent className={classes.content}>
							<Grid container className={classes.docInfo}>
								<Grid item className={classes.ratingContainer}>
									<Box component="fieldset" borderColor="transparent" className={classes.rating}>
										<Rating
											readOnly
											precision={0.5}
											name="rating"
											value={doc.profileHCPid.rating.averageRating}
											emptyIcon={<StarBorderIcon fontSize="inherit" />}
										/>
									</Box>
									<Typography component="legend" variant="body2">
										({doc.profileHCPid.rating.receivedRating} Reviews)
									</Typography>
								</Grid>
								<Grid item>
									<Typography variant="h5" className={classes.name}>
										Dr. {`${doc.profileHCPid.firstName} ${doc.profileHCPid.lastName}`}
									</Typography>
								</Grid>
								<Grid item>
									<Typography variant="body2">{doc.profileHCPid.description}</Typography>
								</Grid>
								<Grid item className={classes.times}>
									<BoxTime>{convertTime(doc.appointmentTimeStart)}</BoxTime>
								</Grid>
							</Grid>
							<Button className={classes.btn}>More</Button>
						</CardContent>
						<Divider orientation="vertical" className={classes.dividor} />
						<CardActions className={classes.reserve}>
							<Typography variant="body1">From</Typography>
							<Typography variant="body1">
								{doc.accountHCPid.price.currency} {doc.amount}
							</Typography>
							<ButtonFilled onClick={() => reserve(doc._id)}>Reserve</ButtonFilled>
						</CardActions>
					</Card>
				);
			})}
		</div>
	);
};

export default DoctorCard;
