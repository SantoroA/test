import React, { useState } from 'react';
import useStyles from './style';
import { formatDateShort, convertTime } from '../../../helpers/dateHelper';
import DialogError from '../../groups/DialogError';
import DialogConfirm from '../../groups/DialogConfirm';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useMutation, gql } from '@apollo/client';
import DialogEditDocument from '../../groups/DialogEditDocument';

const DELETEDOC_MUTATION = gql`
	mutation DeleteDoc($idApt: ID!) {
		patientRemoveDoc(idApt: $idApt)
	}
`;

function Row({ value }) {
	const classes = useStyles();
	const [ dialogConfirmOpen, setDialogConfirmOpen ] = useState(false);
	const { profileHCPid, appointmentTimeStart, appointmentTimeEnd, _id, accountHCPid, patientDoc } = value;
	const filename = value.patientDoc.document;
	const [ patientRemoveDoc, { data } ] = useMutation(DELETEDOC_MUTATION, {
		variables: {
			idApt: _id
		}
	});

	console.log(data);
	console.log(_id);

	return (
		<TableRow>
			<TableCell align="left">
				<div className={classes.name}>
					<Avatar
						className={classes.avatar}
						alt={profileHCPid.firstName}
						src={
							accountHCPid.profilePicture.includes('http') ? (
								accountHCPid.profilePicture
							) : (
								`url(http://localhost:10101/dianurse/v1/profile/static/images/${accountHCPid.profilePicture})`
							)
						}
					/>
					{profileHCPid.firstName}
				</div>
			</TableCell>
			<TableCell>{formatDateShort(appointmentTimeStart)}</TableCell>
			<TableCell>
				{convertTime(appointmentTimeStart)} - {convertTime(appointmentTimeEnd)}
			</TableCell>
			<TableCell>{patientDoc.name}</TableCell>
			<TableCell>
				<Tooltip title="Preview">
					<IconButton
						href={`http://localhost:10101/dianurse/v1/download/static/docs/private/${filename}`}
						target="_blank"
					>
						<VisibilityIcon color="primary" />
					</IconButton>
				</Tooltip>
				<Tooltip title="Delete">
					<IconButton
						onClick={(e) => {
							setDialogConfirmOpen(true);
						}}
					>
						<DeleteOutlineIcon color="secondary" />
					</IconButton>
				</Tooltip>
			</TableCell>
			<DialogConfirm
				action={patientRemoveDoc}
				isOpen={dialogConfirmOpen}
				close={() => setDialogConfirmOpen(false)}
				actionText="delete this document"
				confirmButton="Delete"
			/>
		</TableRow>
	);
}
export default Row;
