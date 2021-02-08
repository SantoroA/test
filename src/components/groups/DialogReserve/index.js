import React from 'react';
// import { Context as SearchDoctorContext } from '../../context/SearchDoctorContext';
import BoxTime from '../../customUi/BoxTime';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { NavLink } from 'react-router-dom';
import { convertTime } from '../../../helpers/dateHelper';
import useStyles from './style';
//CUSTOM UI
import ButtonFilled from '../../customUi/ButtonFilled';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';

const DialogReserve = ({ open, close, appointments, dateFormatted, apDoc }) => {
	const classes = useStyles();
	console.log(apDoc);
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
export default DialogReserve;
