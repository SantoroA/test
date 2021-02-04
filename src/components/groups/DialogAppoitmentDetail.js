import React, { useContext } from 'react';
// import { Context as SearchDoctorContext } from '../../context/SearchDoctorContext';
import BoxTime from '../../components/customUi/BoxTime';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { NavLink } from 'react-router-dom';
import { convertTime } from '../../helpers/dateHelper';
//CUSTOM UI
import ButtonFilled from '../../components/customUi/ButtonFilled';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
	layout: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '2rem',
		textAlign: 'center'
	},
	logo: {
		width: '8rem',
		marginBottom: '2rem'
	},
	divider: {
		marginTop: '1rem',
		marginBottom: '1rem'
	},
	closeButton: {
		alignSelf: 'flex-end'
	},
	appointment: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	price: {
		marginRight: '2rem',
		marginLeft: '2rem'
	},
	navlink: {
		textDecoration: 'none'
	}
});

const DialogAppointmentDetail = ({ open, close, appointments, dateFormatted, apDoc }) => {
	const classes = useStyles();

	return (
		<Dialog
			open={open}
			onClose={close}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<Grid className={classes.layout}>
				<IconButton className={classes.closeButton} onClick={close} color="primary">
					<CloseIcon />
				</IconButton>
				<DialogTitle>Showing availability for {dateFormatted}</DialogTitle>
				<DialogContent>
					{appointments.map((ap) => {
						return (
							<Grid key={ap.idApt} container className={classes.appointment}>
								<BoxTime>
									{convertTime(ap.start)} - {convertTime(ap.end)}
								</BoxTime>
								<Typography className={classes.price}>$ {ap.amount}</Typography>
								<NavLink
									to={{
										pathname: '/in/patient/reserve',
										state: { appointment: ap, apDoc: apDoc }
									}}
									className={classes.navlink}
								>
									<ButtonFilled onClick={() => {}}>Reserve</ButtonFilled>
								</NavLink>
							</Grid>
						);
					})}
				</DialogContent>
				<DialogActions />
			</Grid>
		</Dialog>
	);
};
export default DialogAppointmentDetail;
