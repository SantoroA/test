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
	const { docName, start, end, patComments, docStatus, id, docPic } = value;

	return (
		<TableRow>
			<TableCell align="left">
				<div className={classes.name}>
					<Avatar className={classes.avatar} alt={docName} src={docPic} />
					{docName}
				</div>
			</TableCell>
			<TableCell>{formatDateShort(start)}</TableCell>
			<TableCell>
				{convertTime(start)} - {convertTime(end)}
			</TableCell>
			<TableCell>{patComments}</TableCell>
			<TableCell>{docStatus}</TableCell>
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
