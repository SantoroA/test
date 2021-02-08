import React from 'react';
import { formatDateDisplay, formatFormDate } from '../../../helpers/dateHelper';
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
						{formatDateDisplay(appointment.appointmentTimeStart)}
					</Typography>
					<CardAppointment
						onSubmit={() => {}}
						key={appointment._id}
						state={{
							appointment: {
								amount: appointment.amount,
								end: appointment.appointmentTimeEnd,
								id: appointment.profilePatientid._id,
								idappointment: appointment._id,
								start: appointment.appointmentTimeStart
							},
							name: `${appointment.profilePatientid.firstName} ${appointment.profilePatientid.lastName}`,
							pic: appointment.accountPatientid.profilePicture,
							// apt.accountPatientid.profilePicture
							buttonText: 'Start Video',
							title: 'Patient'
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
						Description
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
						Biltong chislic doner fatback boudin pork belly sirloin beef. Tri-tip burgdoggen spare ribs
						ground round brisket, pork loin kielbasa jerky pork chop andouille shoulder sirloin pancetta
						biltong. Turducken beef ribs beef strip steak jerky bacon. Swine tail tenderloin shankle
						meatloaf sirloin. T-bone pancetta tail chuck porchetta kielbasa short loin turducken pastrami
						hamburger strip steak tenderloin rump.
					</Typography>
				</Grid>
			</Container>
		</Dialog>
	);
};
export default DialogAppointmentDetail;
