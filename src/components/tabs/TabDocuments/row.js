import React, { useState } from 'react';
import useStyles from './style';
import { formatDateShort, convertTime } from '../../../helpers/dateHelper';
import dianurseApi from '../../../api/dianurseApi';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Link from '@material-ui/core/Link';
import { useMutation, gql } from '@apollo/client';

const DELETEDOC_MUTATION = gql`
	mutation DeleteDoc($idApt: ID!) {
		patientRemoveDoc(idApt: $idApt)
	}
`;

function Row({ value }) {
	const classes = useStyles();
	const [ documentName, setDocumentName ] = useState();
	const [ documentSelected, setDocumentSelected ] = useState('');
	const {
		profileHCPid,
		appointmentTimeStart,
		appointmentTimeEnd,
		patientComent,
		docStatus,
		_id,
		accountHCPid
	} = value;
	const filename = value.patientDoc.document;
	const [ patientRemoveDoc, { data, error, loading } ] = useMutation(DELETEDOC_MUTATION, {
		variables: {
			idApt: _id
		}
	});

	console.log(data);
	console.log(_id);

	const onFileChange = (e) => {
		let file = e.target.files[0];
		let reader = new FileReader();
		reader.onloadend = () => {
			setDocumentSelected(file);
		};
		reader.readAsDataURL(file);
	};

	const onFileUpload = (file) => {
		let document = new FormData();
		let aptId = '60196388539b8800272f3a36';
		document.append('document', file);
		document.append('documentName', documentName);
		try {
			dianurseApi.put(`download/documents/${aptId}`, document);
		} catch (error) {
			console.log(error);
		}
	};

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
			{/* <TableCell>{patientComent}</TableCell> */}
			<TableCell />
			<TableCell>{docStatus}</TableCell>
			<TableCell>
				<input type="file" onChange={onFileChange} />
				<IconButton
					onClick={() => {
						onFileUpload(documentSelected);
					}}
				>
					<EditIcon />
				</IconButton>
				<IconButton
					href={`http://localhost:10101/dianurse/v1/download/static/docs/private/${filename}`}
					target="_blank"
				>
					<VisibilityIcon />
				</IconButton>
				<IconButton
					onClick={(e) => {
						e.preventDefault();
						patientRemoveDoc();
					}}
				>
					<DeleteOutlineIcon color="secondary" />
				</IconButton>
			</TableCell>
		</TableRow>
	);
}
export default Row;
