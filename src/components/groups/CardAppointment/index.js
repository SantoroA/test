import React from 'react';
import { convertTime, getTimeDifference } from '../../../helpers/dateHelper';
//CUSTOM UI
import ButtonFilled from '../../customUi/ButtonFilled';
//CUSTOM ICONS
import QuestionnaireIcon from '../../customIcons/QuestionnaireIcon';
import FolderIcon from '../../customIcons/FolderIcon';
//MATERIAL UI
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import useStyles from './style';

const CardAppointment = ({ onSubmit, state, showPrice }) => {
	const classes = useStyles();
	const { appointment, name, pic, buttonText, title } = state;
	let image = pic
	getTimeDifference(appointment.end, appointment.start);

	return (
		<Grid container className={classes.root}>
			<Grid item xs={4} sm={2} className={classes.timeWrapper}>
				<Typography className={classes.sub} variant="h5">
					{convertTime(appointment.start)}
				</Typography>
				<Typography variant="body2">
					{getTimeDifference(appointment.end, appointment.start) === 0 ? (
						'60'
					) : (
						getTimeDifference(appointment.end, appointment.start)
					)}{' '}
					mins
				</Typography>
			</Grid>
			<Grid item>
				<Divider orientation="vertical" />
			</Grid>
			<Grid item xs={7} sm={6}>
				<Grid container className={classes.docInfo}>
					<Grid item sm={4} className={classes.avatarWrapper}>
						<Avatar alt={name} src={image.includes("http") ? image : `http://localhost:10101/dianurse/v1/profile/static/images/${image}`} />
					</Grid>
					<Grid item sm={8}>
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
			<Grid item xs={12} sm={3} className={classes.paymentWrapper}>
				{showPrice ? (
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
				) : (
					<Grid container className={classes.paymentContainer}>
						<Grid item className={classes.button} sm={12}>
							<ButtonFilled fullWidth onClick={onSubmit}>
								{buttonText}
							</ButtonFilled>
						</Grid>
					</Grid>
				)}
			</Grid>
		</Grid>
	);
};

export default CardAppointment;
