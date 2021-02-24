import React, { useState } from 'react';
import useStyles from './style';
import { formatDateShort, convertTime } from '../../../helpers/dateHelper';
import { useTranslation } from 'react-i18next';
import DialogLabTestResult from '../../groups/DialogLabTestResult';
import DialogError from '../../groups/DialogError';
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

function Row({ value, appointment }) {
	const classes = useStyles();
	const { t } = useTranslation();
	const [ dialogOpen, setDialogOpen ] = useState(false);
	const [ dialogErrorOpen, setDialogErrorOpen ] = useState(false);
	const { profileHCPid, appointmentTimeStart, appointmentTimeEnd, _id, accountHCPid } = appointment;
	const { name, isNew, hasResult, result } = value;

	// WHEN DOWNLOADED, CHANGE ISNEW TO FALSE. WHEN UPLOADED, CHANGE HASRESULT TO TRUE

	return (
		<PaperCustomShadow className={classes.paper} style={{ backgroundColor: `${isNew && '#D7FEF1'}` }}>
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
					{name}
				</Grid>

				<Grid item md={2} sm={6} xs={6} className={classes.iconsWrapper}>
					<Tooltip title="Download request">
						<IconButton
							href={`http://localhost:10101/dianurse/v1/download/static/docs/private/${result}`}
							download
							target="_blank"
							color="primary"
						>
							<GetAppIcon />
						</IconButton>
					</Tooltip>
					{hasResult ? (
						<IconButton
							onClick={() => {
								setDialogOpen(true);
							}}
							color="primary"
							disabled
						>
							<PublishIcon />
						</IconButton>
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
					setDialogErrorOpen={setDialogErrorOpen}
					docName={profileHCPid.firstName}
					requestName={name}
					aptId={_id}
				/>
				<DialogError isOpen={dialogErrorOpen} close={() => setDialogErrorOpen(false)} />
			</Grid>
		</PaperCustomShadow>
	);
}
export default Row;
