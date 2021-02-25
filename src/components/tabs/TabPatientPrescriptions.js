import React, { useContext, useState } from 'react';
import { convertTime, formatDateShort } from '../../helpers/dateHelper';
import { Context as DocProfileContext } from '../../context/DocProfileContext';
import { useQuery, gql } from '@apollo/client';
import ErrorMessage from '../groups/ErrorMessage';
import Loader from 'react-loader-spinner';
import DialogNewPrescription from '../groups/DialogNewPrescription';
//CUSTOM UI
import PaperCustomShadow from '../../components/customUi/PaperCustomShadow';
import ButtonFilled from '../../components/customUi/ButtonFilled';
//MATERIAL UI
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
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
	},
	paper: {
		marginBottom: '0.5rem'
	},
	wrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: '1rem'
	},
	iconsWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end'
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
	const [ dialogPrescOpen, setDialogPrescOpen ] = useState(false);
	const { state: { lastName, image } } = useContext(DocProfileContext);
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
			name: 'May 2021',
			filename: 'jj'
		}
	];

	return (
		<div>
			<Grid item className={classes.header}>
				<ButtonFilled onClick={() => setDialogPrescOpen(true)} className={classes.uploadButton}>
					<AddIcon /> New Prescription
				</ButtonFilled>
			</Grid>
			{loading && (
				<Container className={classes.emptyState}>
					<Loader type="TailSpin" color="primary" height={80} width={80} />
				</Container>
			)}
			{error && <ErrorMessage />}

			{/* IF DATA */}
			{prescriptions.map((presc, i) => {
				return (
					<PaperCustomShadow className={classes.paper} key={i}>
						<Grid container className={classes.wrapper}>
							<Grid item md={3} sm={4} xs={12}>
								<div className={classes.name}>
									<Avatar className={classes.avatar} alt={lastName} src={image} />
									Dr. {lastName}
								</div>
							</Grid>
							<Grid item md={2} sm={4} xs={6}>
								{formatDateShort(presc.start)}
							</Grid>
							<Grid item md={2} sm={4} xs={6}>
								{convertTime(presc.start)} - {convertTime(presc.end)}
							</Grid>
							<Grid item md={3} sm={6} xs={6}>
								<Tooltip title="Download">
									<Link
										href={`http://localhost:10101/dianurse/v1/download/static/docs/private/${presc.filename}`}
										target="_blank"
										color="primary"
									>
										{presc.name}
									</Link>
								</Tooltip>
							</Grid>
							<Grid item md={2} sm={6} xs={6} className={classes.iconsWrapper}>
								<Tooltip title="View Prescription">
									<IconButton>
										<VisibilityIcon color="primary" />
									</IconButton>
								</Tooltip>
								<Tooltip title="Delete">
									<IconButton>
										<DeleteOutlineIcon color="secondary" />
									</IconButton>
								</Tooltip>
							</Grid>
						</Grid>
					</PaperCustomShadow>
				);
			})}
			<DialogNewPrescription
				idHCP={idHCP}
				idPatient={idPatient}
				isOpen={dialogPrescOpen}
				close={() => setDialogPrescOpen(false)}
			/>
		</div>
	);
};

export default TabPatientDocs;
