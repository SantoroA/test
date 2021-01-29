import React from 'react';
import { convertTime, getTimeDifference } from '../../helpers/dateHelper';
//CUSTOM UI
import ButtonFilled from '../customUi/ButtonFilled';
//CUSTOM ICONS
import QuestionnaireIcon from '../customIcons/QuestionnaireIcon';
import FolderIcon from '../customIcons/FolderIcon';
//MATERIAL UI

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		background: 'linear-gradient(180deg, #F0F9FF 0%, #FFFFFF 100%)',
		marginTop: '1rem',
		marginBottom: '1rem',
		borderRadius: '8px',
		boxShadow: '0px 6px 12px 0px rgba(16, 30, 115, 0.06)',
		padding: '1rem',
		justifyContent: 'space-between'
	},
	grid: {
		display: 'flex',
		flexDirection: 'row'
	},
	sub: {
		fontWeight: 700,
		marginBottom: '0.5rem',
		color: 'rgba(82, 87, 92, 1)'
	},

	avatarWrapper: {
		padding: '1rem',
		display: 'flex',
		alignItems: 'center'
	},
	icon: {
		fontSize: '2.5rem'
	},
	timeWrapper: {
		padding: '1rem',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		textAlign: 'end'
	},
	paymentWrapper: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row'
	},
	paymentContainer: {
		display: 'flex',
		justifyContent: 'flex-end',
		flexDirection: 'row',
		textAlign: 'end',
		padding: '1rem'
	},
	docInfo: {
		borderRadius: '8px',
		backgroundColor: 'white',
		padding: '0.5rem'
	},
	button: {
		padding: '1rem'
	}
});

const CardAppointment = ({ buttonText, onSubmit, state }) => {
	const classes = useStyles();
	const appointment = {
		amount: 95,
		end: '2021-01-29T07:15:00.000Z',
		id: '601175526913da0029424025',
		idApt: '601186c472a95e0028bcb6f5',
		start: '2021-01-29T06:50:00.000Z'
	};
	const apDoc = {
		lastName: 'Santoro',
		pic:
			'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
	};

	getTimeDifference(appointment.end, appointment.start);

	return (
		<Grid container className={classes.root}>
			<Grid item xs={4} sm={2} className={classes.timeWrapper}>
				<Typography className={classes.sub} variant="h5">
					{convertTime(appointment.start)}
				</Typography>
				<Typography variant="body2">{getTimeDifference(appointment.end, appointment.start)} mins</Typography>
			</Grid>
			<Grid item>
				<Divider orientation="vertical" />
			</Grid>
			<Grid item xs={7} sm={5}>
				<Grid container className={classes.docInfo}>
					<Grid item className={classes.avatarWrapper}>
						<Avatar alt={apDoc.lastName} src={apDoc.pic} />
					</Grid>
					<Grid item>
						<Typography variant="body2">{state.title}</Typography>
						<Typography className={classes.sub} variant="h5">
							{apDoc.lastName}
						</Typography>
						<QuestionnaireIcon color="primary" className={classes.icon} />
						<FolderIcon color="primary" className={classes.icon} />
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				<Divider orientation="vertical" />
			</Grid>
			<Grid item xs={12} sm={4} className={classes.paymentWrapper}>
				<Grid container className={classes.paymentContainer}>
					<Grid item xs={3} sm={6}>
						<Typography variant="body2">Price</Typography>
						<Typography className={classes.sub} variant="h5">
							{appointment.amount}.00
						</Typography>
					</Grid>
					<Grid item className={classes.button} xs={4} sm={6}>
						<ButtonFilled fullWidth onClick={onSubmit}>
							{state.buttonText}
						</ButtonFilled>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default CardAppointment;
