import React, { useState, useContext } from 'react';
import useStyles from './style';
import { formatDateShort, convertTime } from '../../../helpers/dateHelper';
import { Context as AuthContext } from '../../../context/AuthContext';
import DialogLabTestResult from '../../groups/DialogLabTestResult';
import { gql, useMutation } from '@apollo/client';
import { LABTEST_QUERY } from './index';
//CUSTOM UI
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';

const VIEW_MUTATION = gql`
	mutation UpdateLabTEstViewView($idApt: ID!, $file: String) {
		patientViewLabTest(idApt: $idApt, file: $file)
	}
`;

function Row({ value, appointment, refetch }) {
	const classes = useStyles();
	const [ dialogOpen, setDialogOpen ] = useState(false);
	const { state: { userId } } = useContext(AuthContext);
	const { profileHCPid, appointmentTimeStart, appointmentTimeEnd, _id, accountHCPid } = appointment;
	const { name, isNewForPatient, hasResult, requestLink } = value;
	const [ patientViewLabTest ] = useMutation(VIEW_MUTATION, {
		refetchQueries: () => [
			{
				query: LABTEST_QUERY,
				variables: {
					idPatient: userId,
					cursor: null,
					limit: 3
				}
			}
		]
	});

	// console.log(value);
	// WHEN DOWNLOADED, CHANGE ISNEWForPatient TO FALSE. WHEN UPLOADED, CHANGE HASRESULT TO TRUE

	return (
		<PaperCustomShadow className={classes.paper} style={{ backgroundColor: `${isNewForPatient && '#D7FEF1'}` }}>
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
					{name}
				</Grid>

				<Grid item md={2} sm={6} xs={6} className={classes.iconsWrapper}>
					<Tooltip title="Download request">
						<IconButton
							href={requestLink}
							// download
							// target="_blank"
							color="primary"
							onClick={() => {
								patientViewLabTest({
									variables: {
										idApt: _id,
										file: requestLink
									}
								});
							}}
						>
							<GetAppIcon />
						</IconButton>
					</Tooltip>
					{hasResult ? (
						<Tooltip title="You already uploaded the result">
							<span>
								<IconButton
									onClick={() => {
										setDialogOpen(true);
									}}
									color="primary"
									disabled
								>
									<PublishIcon />
								</IconButton>
							</span>
						</Tooltip>
					) : (
						<Tooltip title="Upload result">
							<IconButton
								onClick={() => {
									setDialogOpen(true);
								}}
								color="primary"
							>
								<PublishIcon />
							</IconButton>
						</Tooltip>
					)}
					{hasResult ? (
						<Tooltip title="Result sent">
							<CheckCircleOutlineIcon color="primary" className={classes.checkIcon} />
						</Tooltip>
					) : (
						<Tooltip title="Waiting for result">
							<ErrorOutlineIcon className={classes.errorIcon} />
						</Tooltip>
					)}
				</Grid>
				<DialogLabTestResult
					isOpen={dialogOpen}
					close={() => setDialogOpen(false)}
					docName={profileHCPid.firstName}
					requestLink={requestLink}
					requestName={name}
					aptId={_id}
					refetch={() => refetch()}
				/>
			</Grid>
		</PaperCustomShadow>
	);
}
export default Row;
