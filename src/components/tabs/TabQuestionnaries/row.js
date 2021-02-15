import React from 'react';
import useStyles from './style';
import { formatDateShort, convertTime } from '../../../helpers/dateHelper';
import { useTranslation } from 'react-i18next';
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
	const { t , i18n} = useTranslation();
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
					<EditIcon className={classes.editIcon} /> {t("Take_Survey.1")}
				</ButtonOutlined>
			</TableCell>
		</TableRow>
	);
}
export default Row;
