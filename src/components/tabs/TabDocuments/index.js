import React, { useState, useContext } from 'react';
import Loader from 'react-loader-spinner';
import useStyles from './style';
import EmptyDocState from './emptyState';
import ErrorMessage from '../../groups/ErrorMessage';
import Row from './row';
import dianurseApi from '../../../api/dianurseApi';
import { Context as AuthContext } from '../../../context/AuthContext';
import { useQuery, gql } from '@apollo/client';
import DialogUploadDoc from '../../groups/DialogUploadDoc';
//CUSTOM UI
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
import ButtonFilled from '../../customUi/ButtonFilled';
//MATERIAL UI
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import Container from '@material-ui/core/Container';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PublishIcon from '@material-ui/icons/Publish';

// no back fazer um if do horario e fazer grater and litle

const DOCUMENTS_QUERY = gql`
	query GetAppointments($idPatient: ID!) {
		patientDocuments(idPatient: $idPatient) {
			profileHCPid {
				_id
				firstName
				lastName
			}
			_id
			appointmentTimeStart
			appointmentTimeEnd
			profilePatientid
			accountHCPid {
				profilePicture
			}
			amount
			patientComent
			docStatus
			patientDoc {
				name
				document
			}
		}
	}
`;

const TabDocuments = () => {
	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(5);
	const [ documentSelected, setDocumentSelected ] = useState('');
	const [ dialogOpen, setDialogOpen ] = useState(false);
	const [ documentName, setDocumentName ] = useState('Teste Documents');
	const { state: { userId, userAmIHCP } } = useContext(AuthContext);
	const { loading, error, data, fetchMore } = useQuery(DOCUMENTS_QUERY, {
		variables: {
			idPatient: userId
		}
	});

	const documents = [
		{
			profileHCPid: {
				firstName: 'Gabi'
			},
			appointmentTimeStart: '2021-02-10T09:30:00.000Z',
			appointmentTimeEnd: '2021-02-10T09:30:00.000Z',
			patComments: '',
			docStatus: '',
			accountHCPid: {
				profilePicture:
					'https://images.pexels.com/photos/3053844/pexels-photo-3053844.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
			},
			_id: 'sfwefwefadaawef',
			patientDoc: {
				document: 'q',
				name: 'doc2'
			}
		},
		{
			profileHCPid: {
				firstName: 'Aline'
			},
			appointmentTimeStart: '2021-02-10T08:30:00.000Z',
			appointmentTimeEnd: '2021-02-10T08:30:00.000Z',
			patComments: '',
			docStatus: '',
			accountHCPid: {
				profilePicture:
					'https://images.pexels.com/photos/3136340/pexels-photo-3136340.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
			},
			_id: 'sfwefasdaswefawef',
			patientDoc: {
				document: 'q',
				name: 'doc2'
			}
		},
		{
			profileHCPid: {
				firstName: 'Peach'
			},
			appointmentTimeStart: '2021-02-10T07:00:00.000Z',
			appointmentTimeEnd: '2021-02-10T07:30:00.000Z',
			patComments: '',
			docStatus: '',
			accountHCPid: {
				profilePicture:
					'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
			},
			_id: 'sfwefweaadfeffawef',
			patientDoc: {
				document: 'q',
				name: 'doc2'
			}
		},
		{
			profileHCPid: {
				firstName: 'Pear'
			},
			appointmentTimeStart: '2021-02-05T07:00:00.000Z',
			appointmentTimeEnd: '2021-02-05T07:30:00.000Z',
			patComments: '',
			docStatus: '',
			accountHCPid: {
				profilePicture:
					'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
			},
			_id: 'sfwefwfvfdefawef',
			patientDoc: {
				document: 'q',
				name: 'doc2'
			}
		}
	];

	console.log('data', data);

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	const classes = useStyles();

	return (
		<Grid className={classes.root} container>
			<Grid item className={classes.header}>
				<Typography className={classes.title} variant="h5">
					Documents
				</Typography>
				<ButtonFilled
					className={classes.uploadButton}
					onClick={() => {
						setDialogOpen(true);
					}}
				>
					Upload new document <PublishIcon className={classes.uploadIcon} />
				</ButtonFilled>
			</Grid>
			{loading && (
				<Container className={classes.emptyState}>
					<Loader type="TailSpin" color="primary" height={80} width={80} />
				</Container>
			)}
			{error && <ErrorMessage />}
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
										<TableCell className={classes.tableHeader}>Document name</TableCell>
										<TableCell className={classes.tableHeader}>Doctument Status</TableCell>
										<TableCell />
									</TableRow>
								</TableHead>
								<TableBody>
									{(rowsPerPage > 0
										? data.patientDocuments.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage
											)
										: data.patientDocuments).map((doc) => {
										return <Row value={doc} key={doc._id} />;
									})}
								</TableBody>
								{/* <TableBody>
							{(rowsPerPage > 0
								? documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								: documents).map((doc) => {
								return <Row value={doc} key={doc._id} />;
							})}
						</TableBody> */}
							</Table>
							{/* <TablePagination
								rowsPerPageOptions={[ 5, 10, 20 ]}
								page={page}
								onChangePage={(e, newPage) => setPage(newPage)}
								rowsPerPage={rowsPerPage}
								component="div"
								count={documents.length}
								onChangeRowsPerPage={handleChangeRowsPerPage}
							/> */}
						</TableContainer>
					) : (
						<EmptyDocState />
					)}
				</div>
			)}
			<DialogUploadDoc isOpen={dialogOpen} title="Upload new document" close={() => setDialogOpen(false)} />
		</Grid>
	);
};

export default TabDocuments;
