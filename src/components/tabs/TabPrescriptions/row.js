import React from 'react';
import useStyles from './style';
import { formatDateShort, convertTime } from '../../../helpers/dateHelper';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import GetAppIcon from '@material-ui/icons/GetApp';

function Row({ value }) {
	const classes = useStyles();
	//PASS IN DOCUMENT LINK
	const { docName, start, end, prescName, id, docPic } = value;

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
			<TableCell>{prescName}</TableCell>
			<TableCell>
				<Tooltip title="Download">
					<IconButton>
						<GetAppIcon />
					</IconButton>
				</Tooltip>
			</TableCell>
		</TableRow>
	);
}
export default Row;
