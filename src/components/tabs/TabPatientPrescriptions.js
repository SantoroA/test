import React from 'react';
import { convertTime, formatDateShort } from '../../helpers/dateHelper';
import { useQuery, gql } from '@apollo/client';
import ErrorMessage from '../groups/ErrorMessage';
import Loader from 'react-loader-spinner';
//CUSTOM UI
import PaperCustomShadow from '../../components/customUi/PaperCustomShadow';
import ButtonFilled from '../../components/customUi/ButtonFilled';
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
import VisibilityIcon from '@material-ui/icons/Visibility';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';

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
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: '1rem',
		alignItems: 'center'
	},
	uploadButton: {
		paddingTop: '0.6rem',
		paddingBottom: '0.6rem',
		paddingRight: '1rem',
		paddingLeft: '1rem'
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

	const prescriptions = [
		{
			docName: 'Maricella',
			docPic:
				'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
			start: '2021-02-01T08:30:00.000Z',
			end: '2021-02-01T09:00:00.000Z',
			comments: '',
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
			<Grid item className={classes.header}>
				<ButtonFilled className={classes.uploadButton}>
					<AddIcon /> New Prescription
				</ButtonFilled>
			</Grid>
			<TableContainer className={classes.tableSection} component={PaperCustomShadow}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell className={classes.tableHeader}>Doctor Name</TableCell>
							<TableCell className={classes.tableHeader}>Date</TableCell>
							<TableCell className={classes.tableHeader}>Appointment Time</TableCell>

							<TableCell className={classes.tableHeader}>Doctument Status</TableCell>
							<TableCell />
						</TableRow>
					</TableHead>
					<TableBody>
						{prescriptions.map((presc, i) => {
							return (
								<TableRow key={i}>
									<TableCell>
										<div className={classes.name}>
											<Avatar className={classes.avatar} alt={presc.docName} src={presc.docPic} />
											{presc.docName}
										</div>
									</TableCell>
									<TableCell>{formatDateShort(presc.start)}</TableCell>
									<TableCell>
										{convertTime(presc.start)} - {convertTime(presc.end)}
									</TableCell>
									<TableCell>{presc.status}</TableCell>
									<TableCell>
										<IconButton>
											<EditIcon />
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
