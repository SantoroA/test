import React from 'react';
import { convertTime, formatDateShort } from '../../../helpers/dateHelper';
import useStyles from './style';
import { Link } from 'react-router-dom';
//CUSTOM UI
import ButtonFilled from '../../customUi/ButtonFilled';
//MATERIAL UI
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';

function Row({ value, buttonText }) {
	const classes = useStyles();
	const { profilePatientid, appointmentTimeStart, reasonForVisit, appointmentTimeEnd, accountPatientid } = value;
	// console.log(profilePatientid)
	return (
		<TableRow>
			<TableCell align="left" className={classes.name}>
				<Avatar
					className={classes.avatar}
					alt={profilePatientid.lastName}
					src={accountPatientid.profilePicture}
				/>
				{profilePatientid.firstName} {profilePatientid.lastName}
			</TableCell>
			<TableCell>{formatDateShort(appointmentTimeStart)}</TableCell>
			<TableCell>
				{convertTime(appointmentTimeStart)} - {convertTime(appointmentTimeEnd)}
			</TableCell>
			<TableCell>{reasonForVisit}</TableCell>
			<TableCell align="left">
				<ButtonFilled
					component={Link}
					className={classes.moreButton}
					to={{
						pathname: '/in/doctor/viewpatientprofile',
						state: {
							id: profilePatientid._id,
							image: accountPatientid.profilePicture,
							firstName: profilePatientid.firstName,
							lastName: profilePatientid.lastName,
							phoneNumber: profilePatientid.phoneNumber,
							email: accountPatientid.username
						}
					}}
				>
					{buttonText}
				</ButtonFilled>
			</TableCell>
		</TableRow>
	);
}

export default Row;
