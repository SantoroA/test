import React, { useState } from 'react';
import useStyles from './style';
import Loader from 'react-loader-spinner';
import { formatDateShort, convertTime } from '../../../helpers/dateHelper';
import { useTranslation } from 'react-i18next';
import DialogLabTestResult from '../../groups/DialogLabTestResult';
import DialogError from '../../groups/DialogError';
//CUSTOM UI
import ButtonOutlined from '../../customUi/ButtonOutlined';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import { useMutation, gql } from '@apollo/client';

const DELETELABTEST_MUTATION = gql`
	mutation DeleteLabTest($idApt: ID!, $oldFile: String!) {
		patientRemoveLabTest(idApt: $idApt, oldFile: $oldFile)
	}
`;

function Row({ value, appointment }) {
	const classes = useStyles();
	const { docName, start, end, docStatus, id, docPic } = value;
	const { t } = useTranslation();
	const [ oldFile, setOldFile ] = useState('');
	const [ dialogOpen, setDialogOpen ] = useState(false);
	const [ dialogErrorOpen, setDialogErrorOpen ] = useState(false);
	const { profileHCPid, appointmentTimeStart, appointmentTimeEnd, _id, accountHCPid } = appointment;
	const { doctorRequest, patientResult } = value;
	const [ patientRemoveLabTest, { error, loading } ] = useMutation(DELETELABTEST_MUTATION, {
		variables: {
			idApt: _id,
			oldFile: oldFile
		}
	});

	if (loading) {
		return (
			<Container className={classes.emptyState}>
				<Loader type="TailSpin" color="primary" height={80} width={80} />
			</Container>
		);
	}

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

			<TableCell>
				<IconButton
					href={`http://localhost:10101/dianurse/v1/download/static/docs/private/${patientResult}`}
					download
					target="_blank"
				>
					<GetAppIcon />
				</IconButton>
				<IconButton
					onClick={(e) => {
						e.preventDefault();
						setOldFile(patientResult);
						setTimeout(() => {
							console.log(oldFile);
							patientRemoveLabTest().catch((err) => setDialogErrorOpen(true));
						}, 500);
					}}
				>
					<DeleteOutlineIcon color="secondary" />
				</IconButton>
				<ButtonOutlined
					className={classes.uploadButton}
					onClick={() => {
						setDialogOpen(true);
					}}
				>
					<PublishIcon className={classes.uploadIcon} /> {t('Upload_results.1')}
				</ButtonOutlined>
			</TableCell>
			<DialogLabTestResult
				isOpen={dialogOpen}
				close={() => setDialogOpen(false)}
				setDialogErrorOpen={setDialogErrorOpen}
				docName={profileHCPid.firstName}
				requestName={doctorRequest}
				aptId={_id}
			/>
			<DialogError isOpen={dialogErrorOpen} close={() => setDialogErrorOpen(false)} />
		</TableRow>
	);
}
export default Row;
