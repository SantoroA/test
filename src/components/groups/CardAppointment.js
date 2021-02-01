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
		alignItems: 'center',
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
		paddingLeft: '1rem'
	}
});

const CardAppointment = ({ onSubmit, state }) => {
	const classes = useStyles();
	const { appointment, name, pic, buttonText, title } = state;

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
						<Avatar alt={name} src={pic} />
					</Grid>
					<Grid item>
						<Typography variant="body2">{title}</Typography>
						<Typography className={classes.sub} variant="h5">
							{name}
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
					<Grid item sm={12} md={6}>
						<Typography variant="body2">Price</Typography>
						<Typography className={classes.sub} variant="h5">
							{appointment.amount}.00
						</Typography>
					</Grid>
					<Grid item className={classes.button} sm={12} md={6}>
						<ButtonFilled fullWidth onClick={onSubmit}>
							{buttonText}
						</ButtonFilled>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default CardAppointment;
