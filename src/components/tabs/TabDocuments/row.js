import React from 'react';
import useStyles from './style';
import { formatDateShort, convertTime } from '../../../helpers/dateHelper';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

function Row({ value }) {
	const classes = useStyles();
	const { profileHCPid, appointmentTimeStart, appointmentTimeEnd, patientComent, docStatus, id, accountHCPid } = value;
	const filename = value.patientDoc

	return (
		<TableRow>
			<TableCell align="left">
				<div className={classes.name}>
					<Avatar className={classes.avatar} alt={profileHCPid.firstName} src={accountHCPid.profilePicture.includes("http") ? accountHCPid.profilePicture : `url(http://localhost:10101/dianurse/v1/profile/static/images/${accountHCPid.profilePicture})`} />
					{profileHCPid.firstName}
				</div>
			</TableCell>
			<TableCell>{formatDateShort(appointmentTimeStart)}</TableCell>
			<TableCell>
				{convertTime(appointmentTimeStart)} - {convertTime(appointmentTimeEnd)}
			</TableCell>
			<TableCell>{patientComent}</TableCell>
			<TableCell>{docStatus}</TableCell>
			<a href={`http://localhost:10101/dianurse/v1/download/static/docs/private/${filename}`}>{filename}</a>
			<TableCell>
				<IconButton>
					<EditIcon />
				</IconButton>
				<IconButton>
					<VisibilityIcon />
				</IconButton>
				<IconButton>
					<DeleteOutlineIcon color="secondary" />
				</IconButton>
			</TableCell>
		</TableRow>
	);
}
export default Row;
