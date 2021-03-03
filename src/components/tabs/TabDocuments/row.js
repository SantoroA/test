import React, { useState, useContext } from 'react';
import useStyles from './style';
import { formatDateShort, convertTime } from '../../../helpers/dateHelper';
import DialogConfirm from '../../groups/DialogConfirm';
import { DOCUMENTS_QUERY, MYAPPOINTMENTS_QUERY, DELETEDOC_MUTATION } from '../../../context/GraphQl/graphQlQuery';
import { Context as AuthContext } from '../../../context/AuthContext';
//CUSTOM UI
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useMutation } from '@apollo/client';

function Row({ value }) {
	const classes = useStyles();
	const [ dialogConfirmOpen, setDialogConfirmOpen ] = useState(false);
	const { profileHCPid, appointmentTimeStart, appointmentTimeEnd, _id, accountHCPid, patientDoc } = value;
	const filename = value.patientDoc.document;
	const { state: { userId } } = useContext(AuthContext);
	const [ patientRemoveDoc, { data } ] = useMutation(DELETEDOC_MUTATION, {
		refetchQueries: () => [
			{
				query: DOCUMENTS_QUERY,
				variables: {
					idPatient: userId
				}
			},
			{
				query: MYAPPOINTMENTS_QUERY,
				variables: {
					id: userId
				}
			}
		]
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
							src={accountHCPid.profilePicture}
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
						<IconButton href={filename} target="_blank">
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
					idApt={_id}
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
