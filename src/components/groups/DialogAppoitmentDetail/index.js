import React from 'react';
import { formatDateDisplay } from '../../../helpers/dateHelper';
import CardAppointment from '../CardAppointment';
//CUSTOM UI
import ButtonOutlined from '../../customUi/ButtonOutlined';
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
import ButtonNoBorder from '../../customUi/ButtonNoBorder';
//MATERIAL UI
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ShareIcon from '@material-ui/icons/Share';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import useStyles from './style';

const DialogAppointmentDetail = ({ appointment, isOpen, close }) => {
	const classes = useStyles();
	const { aptId, cardPic, cardName, showPrice, timeStart, timeEnd, amount, cardTitle } = appointment;
	console.log('detail', appointment);

	return (
		<Dialog
			fullScreen
			open={isOpen}
			onClose={close}
			aria-labelledby="appointment-detail"
			aria-describedby="appointment-detail"
		>
			<Container maxWidth="md" className={classes.layout}>
				<div className={classes.buttonWrapper}>
					<ButtonNoBorder onClick={close}>
						<ArrowBackIcon />
						<Typography>Back to my profile</Typography>
					</ButtonNoBorder>
				</div>
				<Divider className={classes.divider} />
				<Grid container className={classes.container}>
					<Typography variant="subtitle1">SHOWING APPOINTMENT FOR</Typography>
					<Typography color="primary" className={classes.sub} variant="h5">
						{formatDateDisplay(new Date(timeStart))}
					</Typography>
					<CardAppointment
						onSubmit={() => {}}
						key={aptId}
						showPrice={false}
						state={{
							appointment: {
								amount: amount,
								end: timeEnd,
								idappointment: aptId,
								start: timeStart
							},
							name: cardName,
							pic: cardPic,
							buttonText: 'Start Video',
							title: cardTitle,
							showPrice: showPrice
						}}
					/>
					<PaperCustomShadow>
						<Grid container className={classes.optionsContainer}>
							<Grid item sm={8}>
								<ButtonOutlined fullWidth>Test your device here</ButtonOutlined>
							</Grid>
							<Grid item sm={4} className={classes.iconsWrapper}>
								<CalendarTodayIcon /> <ShareIcon /> <EditIcon />
								<HighlightOffIcon color="secondary" />
							</Grid>
						</Grid>
					</PaperCustomShadow>
					<Typography className={classes.subtitle} variant="h5">
						Patient comments
					</Typography>
					<Typography color="textSecondary" variant="body1">
						Bacon ipsum dolor amet short ribs capicola venison swine flank chislic cow. Pastrami pork loin
						turkey swine pork chop, chislic strip steak corned beef ball tip meatball cow kielbasa tail
						chicken. Shank filet mignon ham hock beef meatloaf shoulder doner jerky hamburger chuck short
						loin jowl cow. Kevin chislic leberkas alcatra kielbasa swine meatball bacon pancetta tongue
						short ribs biltong ham.
					</Typography>
					<Typography className={classes.subtitle} variant="h5">
						Important Information
					</Typography>
					<Typography color="textSecondary" variant="body1">
						- This appointment will be held by Dianurse.
					</Typography>
					<Typography color="textSecondary" variant="body1">
						You will receive an email reminder a few hours before the appointment.
					</Typography>
					<Typography color="textSecondary" variant="body1">
						- Dianurse is optimized for laptops, tablets, mobiles and pc browsers,no downloads required. For
						a better experience we recommend log in on a laptop.
					</Typography>
					<Typography color="textSecondary" variant="body1">
						- The waiting room opens 15 minutes before the appointment begins.
					</Typography>
					<Typography color="textSecondary" variant="body1">
						- Following the appointment you will be asket to provide feedback. Your input help us improve!
					</Typography>
				</Grid>
			</Container>
		</Dialog>
	);
};
export default DialogAppointmentDetail;
