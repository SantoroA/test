import React, { useContext } from 'react';
import logo from '../../../assets/dianurse-vertical.svg';
import { formatDateShort } from '../../../helpers/dateHelper';
import { Context as DocProfileContext } from '../../../context/DocProfileContext';
import useStyles from './style';
//CUSTOM UI
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Preview = ({ diagnosis, recommendation, medicineList, patientInfo }) => {
	const { state: { firstName, lastName, email, phoneNumber, country, city, zipcode, street, num } } = useContext(
		DocProfileContext
	);
	const classes = useStyles();

	const mockPatientInfo = {
		profilePatientid: {
			firstName: 'Peach',
			lastName: 'Nintendo',
			phoneNumber: '2424545432'
		},
		accountPatientid: {
			username: 'peach@nintendo.com'
		}
	};

	// console.log(patientInfo);
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
							Patient Information: {patientInfo.profilePatientid.firstName}{' '}
							{patientInfo.profilePatientid.lastName}
						</Typography>
						<Typography color="textSecondary" variant="body2">
							Phone: {patientInfo.profilePatientid.phoneNumber}
						</Typography>
						<Typography color="textSecondary" variant="body2">
							Email: {patientInfo.accountPatientid.username}
						</Typography>
						<Typography color="textSecondary" variant="body2">
							Address:
							{/* {mockPatientInfo.profilePatientid.adress} */}
						</Typography>
					</Grid>
					{/* <Grid item xs={6}>
						<Typography className={classes.bold} variant="subtitle1">
							Patient Information: {patientInfo.profilePatientid.firstName}{' '}
							{patientInfo.profilePatientid.lastName}
						</Typography>
						<Typography color="textSecondary" variant="body2">
							Phone: {patientInfo.profilePatientid.phoneNumber}
						</Typography>
						<Typography color="textSecondary" variant="body2">
							Email: {patientInfo.accountPatientid.username}
						</Typography>
						<Typography color="textSecondary" variant="body2">
							Address:
							{patientInfo.profilePatientid.adress}
						</Typography>
					</Grid> */}

					<Grid item xs={6}>
						<Typography className={classes.bold} variant="h5">
							Prescription order
						</Typography>
						<Typography className={classes.bold}>Date: {formatDateShort(new Date())}</Typography>
					</Grid>
				</Grid>
				<Divider className={classes.previewDivider} />
				<Typography className={classes.diagnosis} color="textSecondary" variant="body1">
					Medical diagnosis: {diagnosis}
				</Typography>
				<Typography className={classes.bold} color="textSecondary" variant="body1">
					Presciption requested:
				</Typography>
				{medicineList && (
					<TableContainer className={classes.tableContainer}>
						<Table size="small">
							<TableHead>
								<TableRow>
									<TableCell className={classes.tableTitle}>Quantity</TableCell>
									<TableCell className={classes.tableTitle}>Medication name</TableCell>
									<TableCell className={classes.tableTitle}>Directions of use</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{medicineList.map((med, i) => {
									return (
										<TableRow key={i}>
											<TableCell className={classes.tableCell}>{med.quantity}</TableCell>
											<TableCell className={classes.tableCell}>{med.name}</TableCell>
											<TableCell className={classes.tableCell}>{med.directions}</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				)}
				<Typography className={classes.bold} variant="body1">
					Heath recommendations:
				</Typography>

				<Typography color="textSecondary" variant="body1">
					{recommendation}
				</Typography>
				<Divider className={classes.endDivider} />
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
