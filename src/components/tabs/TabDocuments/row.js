import React, { useState } from 'react';
import useStyles from './style';
import { formatDateShort, convertTime } from '../../../helpers/dateHelper';
import DialogError from '../../groups/DialogError';
import DialogConfirm from '../../groups/DialogConfirm';
//CUSTOM UI
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
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
		<PaperCustomShadow className={classes.paper}>
			<Grid container className={classes.wrapper}>
				<Grid item md={3} sm={4} xs={12}>
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
						Dr. {profileHCPid.lastName}
					</div>
				</Grid>
				<Grid item md={2} sm={4} xs={6}>
					{formatDateShort(appointmentTimeStart)}
				</Grid>
				<Grid item md={2} sm={4} xs={6}>
					{convertTime(appointmentTimeStart)} - {convertTime(appointmentTimeEnd)}
				</Grid>
				<Grid item md={3} sm={6} xs={6}>
					{patientDoc.name}
				</Grid>
				<Grid item md={2} sm={6} xs={6} className={classes.iconsWrapper}>
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
				</Grid>

				<DialogConfirm
					action={patientRemoveDoc}
					isOpen={dialogConfirmOpen}
					close={() => setDialogConfirmOpen(false)}
					actionText="delete this document"
					confirmButton="Delete"
				/>
			</Grid>
		</PaperCustomShadow>
	);
}
export default Row;
