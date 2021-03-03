import React, { useState } from 'react';
import { formatDateDisplay, formatFormDate } from '../../helpers/dateHelper';
import Loader from 'react-loader-spinner';
import { NavLink } from 'react-router-dom';
import { convertTime } from '../../helpers/dateHelper';
import { useQuery } from '@apollo/client';
import ErrorMessage from '../groups/ErrorMessage';
import { MYAPPOINTMENTS_QUERY_DOCPUBLIC } from '../../context/GraphQl/graphQlQuery';
//CUSTOM UI
import CalendarApp from '../customUi/CalendarApp';
import BoxTime from '../customUi/BoxTime';
import PaperCustomShadow from '../customUi/PaperCustomShadow';
import ButtonFilled from '../customUi/ButtonFilled';
//MATERIAL UI
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'row'
	},

	datePicker: {
		padding: '1rem'
	},
	datePickerMobile: {
		'& .MuiFilledInput-root': {
			backgroundColor: 'rgba(255, 255, 255, 0)'
		},
		'& .MuiInputBase-input': {
			textAlign: 'center',
			fontSize: '1.2rem'
		},
		marginBottom: '1rem'
	},
	dateDisplay: {
		fontWeight: 700,
		marginBottom: '1rem'
	},
	emptyState: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '20rem',
		flexDirection: 'column',
		textAlign: 'center'
	},
	subtitle: {
		textTransform: 'uppercase',
		fontWeight: 'bold',
		marginBottom: '0.5rem'
	},
	sub: {
		fontWeight: 'bold'
	},
	paper: {
		padding: '1rem',
		marginBottom: '1rem'
	},
	appointment: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: '0.4rem',
		justifyContent: 'space-between'
	},
	price: {
		marginRight: '2rem',
		marginLeft: '2rem',
		color: '#52575C',
		fontWeight: 700
	},
	navlink: {
		textDecoration: 'none'
	},
	priceWrapper: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		background: '#F6F8FB',
		borderRadius: '5px'
	},
	bookButton: {
		display: 'flex',
		flexDirection: 'row',
		paddingTop: '0.8rem',
		paddingBottom: '0.8rem',
		textDecoration: 'none',
		minWidth: '8rem',
		justifyContent: 'center'
	},
	divider: {
		marginBottom: '1rem',
		marginTop: '1rem'
	}
});

const TabDocPublicGeneral = ({ docId, disableBooking }) => {
	const classes = useStyles();
	const theme = useTheme();
	const [ date, setDate ] = useState(new Date());
	const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
	const { loading, error, data } = useQuery(MYAPPOINTMENTS_QUERY_DOCPUBLIC, {
		variables: { date, id: docId, limit: 2, cursor: null }
	});

	return (
		<Grid className={classes.root} container>
			<Grid item sm={7} md={8}>
				{isMobile && (
					<Grid item xs={12}>
						<TextField
							fullWidth
							id="date"
							type="date"
							variant="filled"
							className={classes.datePickerMobile}
							value={formatFormDate(date)}
							onChange={(e) => setDate(new Date(`${e.target.value}T00:00:00`))}
							InputProps={{
								disableUnderline: true
							}}
						/>
					</Grid>
				)}
				{loading && (
					<Container className={classes.emptyState}>
						<Loader type="TailSpin" color="primary" height={80} width={80} />
					</Container>
				)}
				{error && <ErrorMessage />}

				{/* IF DATA */}
				{data && (
					<div>
						<PaperCustomShadow className={classes.paper}>
							<Typography className={classes.subtitle} variant="body1">
								Showing time availability for
							</Typography>
							<Typography color="primary" className={classes.dateDisplay} variant="h5">
								{formatDateDisplay(date)}
							</Typography>
							{data.doctorsAppointmentsDayAvailability.map((ap) => {
								return (
									<Grid key={ap._id} container className={classes.appointment}>
										<BoxTime>
											{convertTime(ap.appointmentTimeStart)} -{' '}
											{convertTime(ap.appointmentTimeEnd)}
										</BoxTime>
										<Box className={classes.priceWrapper}>
											<Typography className={classes.price}>Price:</Typography>
											<Typography className={classes.price}>$ {ap.amount}.00</Typography>
										</Box>
										{disableBooking ? (
											<ButtonFilled
												disabled
												className={classes.bookButton}
												onClick={(e) => e.preventDefault}
											>
												Book
											</ButtonFilled>
										) : (
											<ButtonFilled
												disabled
												to={{
													pathname: '/in/patient/reserve',
													state: { appointment: ap, apDoc: docId }
												}}
												component={NavLink}
												className={classes.bookButton}
												onClick={(e) => e.preventDefault}
											>
												Book
											</ButtonFilled>
										)}
									</Grid>
								);
							})}
						</PaperCustomShadow>
					</div>
				)}
				<PaperCustomShadow className={classes.paper}>
					<Typography className={classes.sub} variant="subtitle1">
						Services Treated
					</Typography>
					{data && (
						<div>
							{data.doctorsAppointmentsDayAvailability.length > 0 ? (
								data.doctorsAppointmentsDayAvailability[0].profileHCPid.services.map((el, index) => (
									<Typography key={index}>{el}</Typography>
								))
							) : null}
						</div>
					)}
					<Divider className={classes.divider} />
				</PaperCustomShadow>
				<PaperCustomShadow className={classes.paper}>
					<Typography className={classes.sub} variant="subtitle1">
						Reviews
					</Typography>
					<Divider className={classes.divider} />
				</PaperCustomShadow>
			</Grid>
			{!isMobile && (
				<Grid item sm={5} md={4} className={classes.datePicker}>
					<CalendarApp value={date} onChange={setDate} />
				</Grid>
			)}
		</Grid>
	);
};

export default TabDocPublicGeneral;
