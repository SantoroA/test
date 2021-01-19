import React, { useContext } from 'react';
import { Context as SearchDoctorContext } from '../../context/SearchDoctorContext';
import { Context as AuthContext } from '../../context/AuthContext';
import BoxTime from '../../components/customUi/BoxTime';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
//CUSTOM UI
import ButtonFilled from '../../components/customUi/ButtonFilled';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
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
	}
});

const DialogReserve = ({ open, close, id }) => {
	const classes = useStyles();
	// const { state: {userId} } = useContext(AuthContext);
	const userId = '5fe8b0c48bef090026e253b7';
	const { state: { doctors, formatDate }, reserve } = useContext(SearchDoctorContext);
	const convertTime = (start) => {
		let hours = new Date(start).getHours();
		let min = new Date(start).getMinutes();
		let realMin = min < 10 ? '00' : min;
		return `${hours}:${realMin}`;
	};
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
				<DialogTitle>Showing availability for {formatDate}</DialogTitle>
				<DialogContent>
					{doctors.filter((el) => el.profileHCPid._id === id).map((ap, i) => {
						return (
							<Grid key={ap._id} container className={classes.appointment}>
								<BoxTime>
									{convertTime(ap.appointmentTimeStart)} - {convertTime(ap.appointmentTimeEnd)}
								</BoxTime>
								<Typography className={classes.price}>$ {ap.amount}</Typography>
								<ButtonFilled
									onClick={() => {
										reserve({
											appointmentId: ap._id,
											patientId: userId
										});
									}}
								>
									Reserve
								</ButtonFilled>
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
