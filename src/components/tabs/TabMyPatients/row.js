import React from 'react';
import { convertTime, formatDateShort } from '../../../helpers/dateHelper';
import useStyles from './style';
//CUSTOM UI
import ButtonFilled from '../../customUi/ButtonFilled';
//MATERIAL UI
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';

function Row({ value, buttonText }) {
	const classes = useStyles();
	const { profilePatientid, start, reasonForVisit, end, amount, idApt, accountPatientid } = value;

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
			<TableCell>{formatDateShort(start)}</TableCell>
			<TableCell>
				{convertTime(start)} - {convertTime(end)}
			</TableCell>
			<TableCell>{reasonForVisit}</TableCell>
			<TableCell className={classes.amount}>{amount}</TableCell>
			<TableCell align="left">
				<ButtonFilled id={idApt}>{buttonText}</ButtonFilled>
			</TableCell>
		</TableRow>
	);
}

export default Row;
