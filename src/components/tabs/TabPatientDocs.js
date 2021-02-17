import React from 'react';
import { convertTime, formatDateShort } from '../../helpers/dateHelper';
import { useQuery, gql } from '@apollo/client';
import ErrorMessage from '../groups/ErrorMessage';
import Loader from 'react-loader-spinner';
//CUSTOM UI
import PaperCustomShadow from '../../components/customUi/PaperCustomShadow';

//MATERIAL UI
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import TableHead from '@material-ui/core/TableHead';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import GetAppIcon from '@material-ui/icons/GetApp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	tableSection: {
		marginTop: '2em'
	},
	tableHeader: {
		fontWeight: 'bold'
	},
	name: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	avatar: {
		marginRight: '1rem'
	},
	emptyState: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '20rem',
		flexDirection: 'column',
		textAlign: 'center'
	}
});

const DOCUMENTS_QUERY = gql`
	query GetAppointments($idHCP: ID!, $idPatient: ID!) {
		patientLabTestForDoctors(idHCP: $idHCP, idPatient: $idPatient) {
			accountPatientid {
				profilePicture
			}
			idApt
			profilePatientid {
				_id
				firstName
				lastName
			}
			amount
			reasonForVisit
			patientDoc
			labTest {
				doctorRequest
				status
				patientResult
			}
		}
	}
`;

//MAIN FUNCTION

const TabPatientDocs = ({ idHCP, idPatient }) => {
	const classes = useStyles();
	const { loading, error, data, fetchMore } = useQuery(DOCUMENTS_QUERY, {
		variables: {
			idHCP,
			idPatient
		}
	});

	console.log('data', data);

	const documents = [
		{
			docName: 'Priscilla',
			docPic:
				'https://images.pexels.com/photos/773371/pexels-photo-773371.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
			start: '2021-02-01T06:30:00.000Z',
			end: '2021-02-01T07:00:00.000Z',
			name: '',
			status: ''
		}
	];

	return (
		<div>
			{loading && (
				<Container className={classes.emptyState}>
					<Loader type="TailSpin" color="primary" height={80} width={80} />
				</Container>
			)}
			{error && <ErrorMessage />}
			{/* IF DATA */}
			<TableContainer className={classes.tableSection} component={PaperCustomShadow}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell className={classes.tableHeader}>Doctor Name</TableCell>
							<TableCell className={classes.tableHeader}>Date</TableCell>
							<TableCell className={classes.tableHeader}>Appointment Time</TableCell>
							<TableCell className={classes.tableHeader}>Document name</TableCell>
							<TableCell className={classes.tableHeader}>Document Status</TableCell>
							<TableCell />
						</TableRow>
					</TableHead>
					<TableBody>
						{documents.map((doc, i) => {
							return (
								<TableRow key={i}>
									<TableCell>
										<div className={classes.name}>
											<Avatar className={classes.avatar} alt={doc.docName} src={doc.docPic} />
											{doc.docName}
										</div>
									</TableCell>
									<TableCell>{formatDateShort(doc.start)}</TableCell>
									<TableCell>
										{convertTime(doc.start)} - {convertTime(doc.end)}
									</TableCell>
									<TableCell>{doc.name}</TableCell>
									<TableCell>{doc.status}</TableCell>
									<TableCell>
										<IconButton>
											<GetAppIcon />
										</IconButton>
										<IconButton>
											<VisibilityIcon />
										</IconButton>
										<IconButton>
											<DeleteOutlineIcon color="secondary" />
										</IconButton>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default TabPatientDocs;
