import React from 'react';
import useStyles from './style';
import { formatDateShort, convertTime } from '../../../helpers/dateHelper';
//CUSTOM UI
import ButtonOutlined from '../../customUi/ButtonOutlined';
//MATERIAL UI
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';

function Row({ value }) {
	const classes = useStyles();
	const { docName, start, end, docStatus, docComments, id, docPic } = value;

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
			<TableCell>{docStatus}</TableCell>
			<TableCell>{docComments}</TableCell>
			<TableCell>
				<ButtonOutlined className={classes.editButton}>
					<EditIcon className={classes.editIcon} /> Take Survey
				</ButtonOutlined>
			</TableCell>
		</TableRow>
	);
}
export default Row;
