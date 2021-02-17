import React, { useState, useContext } from 'react';
import axios from 'axios';
import useStyles from './style';
import EmptyDocState from './emptyState';
import Row from './row';
import dianurseApi from '../../../api/dianurseApi';
import { Context as AuthContext } from '../../../context/AuthContext';
import { useQuery, gql } from '@apollo/client';
//CUSTOM UI
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
import ButtonFilled from '../../customUi/ButtonFilled';
//MATERIAL UI
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PublishIcon from '@material-ui/icons/Publish';

const documents = [
	{
		docName: 'Gabi',
		start: '2021-02-10T09:30:00.000Z',
		end: '2021-02-10T09:30:00.000Z',
		patComments: '',
		docStatus: '',
		docPic:
			'https://images.pexels.com/photos/3053844/pexels-photo-3053844.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		id: 'sfwefwefadaawef'
	},
	{
		docName: 'Aline',
		start: '2021-02-10T08:30:00.000Z',
		end: '2021-02-10T08:30:00.000Z',
		patComments: '',
		docStatus: '',
		docPic:
			'https://images.pexels.com/photos/3136340/pexels-photo-3136340.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		id: 'sfwefasdaswefawef'
	},
	{
		docName: 'Peach',
		start: '2021-02-10T07:00:00.000Z',
		end: '2021-02-10T07:30:00.000Z',
		patComments: '',
		docStatus: '',
		docPic:
			'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
		id: 'sfwefweaadfeffawef'
	},
	{
		docName: 'Pear',
		start: '2021-02-05T07:00:00.000Z',
		end: '2021-02-05T07:30:00.000Z',
		patComments: '',
		docStatus: '',
		docPic:
			'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
		id: 'sfwefwfvfdefawef'
	}
];

// no back fazer um if do horario e fazer grater and litle

const DOCUMENTS_QUERY = gql`
	query GetAppointments(
		$idHCP: ID!,
		$idPatient: ID!
	) {
		patientDocuments(
			idHCP: $idHCP,
			idPatient: $idPatient
		) {
			profileHCPid { 
				_id
				firstName
				lastName
			   },
			  _id
			  appointmentTimeStart
			  appointmentTimeEnd
			  profilePatientid
			  accountHCPid { 
				profilePicture
			  },
			  amount,
			  patientComent,
			  docStatus,
			  patientDoc {
				  name,
				  document
			  }

		}
	}
`;



const TabDocuments = () => {
	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(5);
	const [ documentSelected, setDocumentSelected ] = useState('');
	const [ documentPreview, setDocumentPreview ] = useState('');
	const [ documentName, setDocumentName ] = useState('Teste Documents');
	const { state: { userId, userAmIHCP } } = useContext(AuthContext);
	const { loading, error, data, fetchMore } = useQuery(DOCUMENTS_QUERY, {
		variables: {
			idHCP: "60116f816913da0029423db5",
			idPatient: userId
		}
	});

	console.log('data', data)

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	const classes = useStyles();

	const onFileChange = (e) => {
		let file = e.target.files[0];
		let reader = new FileReader();
		reader.onloadend = () => {
			setDocumentSelected(file);
			setDocumentPreview(reader.result);
		};
		reader.readAsDataURL(file);
	};

	const onFileUpload = (file) => {
		let  document = new FormData();
		let aptId = "60196388539b8800272f3a36"
		document.append('document', file);
		document.append('documentName', documentName)
		try {
			dianurseApi.post(`download/documents/${aptId}`, document);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Grid className={classes.root} container>
			<Grid item className={classes.header}>
				<Typography className={classes.title} variant="h5">
					Documents
				</Typography>
				<input type="file" onChange={onFileChange} />

				<ButtonFilled className={classes.uploadButton}
				onClick={() => {onFileUpload(documentSelected)} }>
					Upload new document <PublishIcon className={classes.uploadIcon} />
				</ButtonFilled>
			</Grid>
			{/* {loading && (
				<Container className={classes.emptyState}>
					<Loader type="TailSpin" color="primary" height={80} width={80} />
				</Container>
			)} */}
			{/* {error && (
				<Container className={classes.emptyState}>
					<Typography color="textSecondary" variant="h4">
						Something went wrong, please try again later
					</Typography>
				</Container>
			)} */}

			{/* IF DATA */}
			{data && (
				<div>
					{data.patientDocuments.length > 0 ? (

			<TableContainer className={classes.section} component={PaperCustomShadow}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell className={classes.tableHeader}>Doctor Name</TableCell>
							<TableCell className={classes.tableHeader}>Date</TableCell>
							<TableCell className={classes.tableHeader}>Appointment Time</TableCell>
							<TableCell className={classes.tableHeader}>Patient comments</TableCell>
							<TableCell className={classes.tableHeader}>Doctument Status</TableCell>
							<TableCell />
						</TableRow>
					</TableHead>
					<TableBody>
						{(rowsPerPage > 0
							? data.patientDocuments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							: data.patientDocuments).map((doc) => {
							return <Row value={doc} key={doc._id} />;
						})}
					</TableBody>
				</Table>
				<TablePagination
					rowsPerPageOptions={[ 5, 10, 20 ]}
					page={page}
					onChangePage={(e, newPage) => setPage(newPage)}
					rowsPerPage={rowsPerPage}
					component="div"
					count={documents.length}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</TableContainer> 
				) : (
					<EmptyDocState />
			)}
		</div>
	)}
		</Grid>
		
	);
};

export default TabDocuments;
