import React, {useState} from 'react';
import useStyles from './style';
import { formatDateShort, convertTime } from '../../../helpers/dateHelper';
import dianurseApi from '../../../api/dianurseApi';
//CUSTOM UI
import ButtonOutlined from '../../customUi/ButtonOutlined';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import { useMutation, gql } from '@apollo/client';

const DELETELABTEST_MUTATION = gql`
	mutation DeleteLabTest(
		$idApt: ID!,
		$oldFile: String! 
	) {
		patientRemoveLabTest(
			idApt: $idApt,
			oldFile: $oldFile
		) 
	}
`;

function Row({ value }) {
	const classes = useStyles();
	const [ documentSelected, setDocumentSelected ] = useState('');
	const [ documentPreview, setDocumentPreview ] = useState('');
	const [ oldFile, setOldFile ] = useState('');
	const { profileHCPid, appointmentTimeStart, appointmentTimeEnd, labTest, _id, accountHCPid } = value;
	let files = labTest.patientResult;
	const [ patientRemoveLabTest, { data, error, loading } ] = useMutation(DELETELABTEST_MUTATION, {
		variables: {
			idApt: _id,
			oldFile: oldFile	
		}
	});
	

	console.log(files)
	const onFileChange = (e) => {
		let file = e.target.files;
		console.log(file)
		// let reader = new FileReader();
		// reader.onloadend = () => {
			setDocumentSelected(file);
		// 	setDocumentPreview(reader.result);
		// };
		// reader.readAsDataURL(file);
	};

	const onFileUpload = (file) => {
		console.log(file)
		let  labTest = new FormData();
		const files = file;

		for (let i = 0; i < files.length; i++) {
			labTest.append(`labTest`, files[i])
		}
		let aptId = "60196388539b8800272f3a36"
		// labTest.append('labTest', file);
		try {
			dianurseApi.post(`download/labTest/${aptId}`, labTest);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
		{files.filter((el) => el !== null)
		.map((filename) => 
		<TableRow>
			{console.log(filename)}
			<TableCell align="left">
				<div className={classes.name}>
					<Avatar className={classes.avatar} alt={profileHCPid.firstName} src={accountHCPid.profilePicture.includes("http") ? accountHCPid.profilePicture : `url(http://localhost:10101/dianurse/v1/profile/static/images/${accountHCPid.profilePicture})`} />
					{profileHCPid.firstName}
				</div>
			</TableCell>
			<TableCell>{formatDateShort(appointmentTimeStart)}</TableCell>
			<TableCell>
				{convertTime(appointmentTimeStart)} - {convertTime(appointmentTimeEnd)}
			</TableCell>
			<TableCell>{labTest.status}</TableCell>
			<TableCell>
				<IconButton href={`http://localhost:10101/dianurse/v1/download/static/docs/private/${filename}`} download target="_blank">
					<GetAppIcon />
				</IconButton>
				<IconButton href={`http://localhost:10101/dianurse/v1/download/static/docs/private/${filename}`} target="_blank">
					<VisibilityIcon />
				</IconButton>
				<IconButton onClick={(e) => {
					e.preventDefault();
					setOldFile(filename);
					setTimeout(() => {
						console.log(oldFile)
						patientRemoveLabTest()
					}, 500);
				}}>
					<DeleteOutlineIcon color="secondary" />
				</IconButton>
				<input type="file" onChange={onFileChange} multiple/>
				<ButtonOutlined className={classes.uploadButton}
				onClick={() => {onFileUpload(documentSelected)
								console.log('send')}}
				>
					<PublishIcon className={classes.uploadIcon} /> Upload results
				</ButtonOutlined>
			</TableCell>
		</TableRow>
		)
				}
				</div>
	);
}
export default Row;
