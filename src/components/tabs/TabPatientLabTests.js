import React, { useContext, useState } from 'react';
import { convertTime, formatDateShort } from '../../helpers/dateHelper';
import { useQuery, gql, useMutation } from '@apollo/client';
import ErrorMessage from '../groups/ErrorMessage';
import Loader from 'react-loader-spinner';
import { Context as DocProfileContext } from '../../context/DocProfileContext';
//CUSTOM UI
import PaperCustomShadow from '../../components/customUi/PaperCustomShadow';
import ButtonFilled from '../../components/customUi/ButtonFilled';
import ButtonOutlined from '../../components/customUi/ButtonOutlined';
//MATERIAL UI
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import TableHead from '@material-ui/core/TableHead';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import GetAppIcon from '@material-ui/icons/GetApp';

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
			_id
			profilePatientid {
				_id
				firstName
				lastName
			}
			amount
			appointmentTimeStart
			appointmentTimeEnd
			labTest {
				doctorRequest
				patientResult
			}
		}
	}
`;

const DELETEDOC_MUTATION = gql`
	mutation DeleteLabTest($idApt: ID!, $oldFile: String!) {
		doctorRemoveLabTest(idApt: $idApt, oldFile: $oldFile )
	}
`;

//MAIN FUNCTION

const TabPatientLabTests = ({ idHCP, idPatient }) => {
	const classes = useStyles();
	const [oldFile, setOldFile] = useState('');
	const [idApt, setidApt] = useState('');
	const { state: {firstName, image} } = useContext(DocProfileContext);
	const { error, data, fetchMore } = useQuery(DOCUMENTS_QUERY, {
		variables: {
			idHCP,
			idPatient
		}
	});
	const [ doctorRemoveLabTest, { loading } ] = useMutation(DELETEDOC_MUTATION, {
		variables: {
			oldFile: oldFile,
			idApt: idApt
		}
	});

	console.log('dataDoctorLab', data);

	const tests = [
		{
			docName: 'Bianca',
			docPic:
				'https://images.pexels.com/photos/1832323/pexels-photo-1832323.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
			start: '2021-02-01T06:30:00.000Z',
			end: '2021-02-01T07:00:00.000Z',
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
			{data && (
						<div>
			<Grid item className={classes.header}>
				<ButtonFilled className={classes.uploadButton}>
					<AddIcon className={classes.uploadIcon} /> New Lab Test
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
						{data.patientLabTestForDoctors.map((test) => {
							return	test.labTest.map((lab, i) => {
									console.log(lab, i)
							return (
								<TableRow key={i}>
									<TableCell>
										<div className={classes.name}>
										<Avatar className={classes.avatar} alt={firstName} src={image.includes("http") ? image : `http://localhost:10101/dianurse/v1/profile/static/images/${image}`} />
											{firstName}
										</div>
									</TableCell>
									<TableCell>{formatDateShort(test.appointmentTimeStart)}</TableCell>
									<TableCell>
										{convertTime(test.appointmentTimeStart)} - {convertTime(test.appointmentTimeEnd)}
									</TableCell>

									<TableCell>{test.status}</TableCell>
									<TableCell>
										<IconButton href={`http://localhost:10101/dianurse/v1/download/static/docs/private/${lab.patientResult}`} target="_blank" disabled={lab.patientResult===null}>
											<VisibilityIcon />
										</IconButton>
										<IconButton onClick={(e) => {
							e.preventDefault();
							setOldFile(lab.doctorRequest);
							setidApt(test._id)
							setTimeout(() => {
							doctorRemoveLabTest().catch((err) => console.log(err));
						}, 500);
					}}>
											<DeleteOutlineIcon color="secondary" />
										</IconButton>
										<ButtonOutlined className={classes.editButton} href={`http://localhost:10101/dianurse/v1/download/static/docs/private/${lab.patientResult}`} target="_blank" disabled={lab.patientResult===null}>
											<GetAppIcon className={classes.editIcon} /> Download results
										</ButtonOutlined>
									</TableCell>
								</TableRow>
							);
						})
						})}
					</TableBody>
				</Table>
			</TableContainer>
			
			</div>)}
		</div>
	);
};

export default TabPatientLabTests;
