import React, { useContext } from 'react';
import logo from '../../../assets/dianurse-vertical.svg';
import { formatDateShort } from '../../../helpers/dateHelper';
import { Context as DocProfileContext } from '../../../context/DocProfileContext';
import useStyles from './style';
import { useTranslation } from 'react-i18next';
//CUSTOM UI
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';

//QUERY DOCTOR AND PATIENT INFORMATION

const Preview = ({ patientId, diagnosis, recommendation, exams }) => {
	const { state: { firstName, lastName, email, phoneNumber, country, city, zipcode, street, num } } = useContext(
		DocProfileContext
	);
	const classes = useStyles();
	const patientInfo = {
		patientFirstName: 'Peach',
		patientLastName: 'Nintendo',
		patientPhone: '2424545432',
		patientEmail: 'peach@nintendo.com',
		patientAdress: '1 Mario Street, Kart, 78.584-99, Nintendo.'
	};
	return (
		<PaperCustomShadow className={classes.prescriptionPaper}>
			<Typography className={classes.bold} variant="h5" color="primary">
				Dr. {firstName} {lastName}
			</Typography>
			<Divider className={classes.previewDivider} />
			<Typography color="textSecondary" variant="body2">
				Phone: {phoneNumber}
			</Typography>
			<Typography color="textSecondary" variant="body2">
				Email: {email}
			</Typography>
			<Typography color="textSecondary" variant="body2">
				Address: {street}, {num}, {city}, {zipcode}, {country}
			</Typography>
			<Box className={classes.patientBox}>
				<Grid container>
					<Grid item xs={6}>
						<Typography className={classes.bold} variant="subtitle1">
							Patient Information: {patientInfo.patientFirstName} {patientInfo.patientLastName}
						</Typography>
						<Typography color="textSecondary" variant="body2">
							Phone: {patientInfo.patientPhone}
						</Typography>
						<Typography color="textSecondary" variant="body2">
							Email: {patientInfo.patientEmail}
						</Typography>
						<Typography color="textSecondary" variant="body2">
							Address: {patientInfo.patientAdress}
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography className={classes.bold} variant="h5">
							Lab Test order
						</Typography>
						<Typography className={classes.bold}>Date: {formatDateShort(new Date())}</Typography>
					</Grid>
				</Grid>
				<Divider className={classes.previewDivider} />
				<Typography className={classes.bold} color="textSecondary" variant="body1">
					Medical diagnosis: {diagnosis}
				</Typography>
				<Typography className={classes.bold} color="textSecondary" variant="body1">
					Test requested:
				</Typography>
				<Typography color="textSecondary" variant="body1">
					{exams}
				</Typography>
				<Divider className={classes.previewDivider} />
			</Box>
			<Grid container className={classes.logoWrapper}>
				<Grid item>
					<img src={logo} alt="Logo" className={classes.img} />
				</Grid>
				<Grid item>
					<Typography>XXX45983286095</Typography>
				</Grid>
			</Grid>
			<Grid container>
				<Typography paragraph align="center" variant="body2" color="textSecondary">
					The telemedicine services made available through Dianurse are provided by licensed physicians
					practicing within a group of independently owned professional practices collectively known as
					“Dianurse Professionals”. These professional practices provide services via the Dianurse telehealth
					platform. Dianurse does not itself provide any physician, mental health or other healthcare provider
					services.
				</Typography>
			</Grid>
		</PaperCustomShadow>
	);
};

export default Preview;
