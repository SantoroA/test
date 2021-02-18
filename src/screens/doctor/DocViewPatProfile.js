import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import DocLayoutContainer from '../../components/layout/DocLayoutContainer';
import { useLocation, NavLink } from 'react-router-dom';
import CardProfilePublic from '../../components/groups/CardProfilePublic';
import TabCustom from '../../components/customUi/TabCustom';
import PaperCustomShadow from '../../components/customUi/PaperCustomShadow';
import ButtonFilled from '../../components/customUi/ButtonFilled';
import { convertTime, formatDateShort } from '../../helpers/dateHelper';
import ButtonOutlined from '../../components/customUi/ButtonOutlined';
import { Context as AuthContext } from '../../context/AuthContext';
import { useQuery, gql } from '@apollo/client';
//CUSTOM ICONS
import FolderIcon from '../../components/customIcons/FolderIcon';
import PrescriptionIcon from '../../components/customIcons/PrescriptionIcon';
import LabTestsIcon from '../../components/customIcons/LabTestsIcon';
import QuestionnaireIcon from '../../components/customIcons/QuestionnaireIcon';
//MATERIAL UI
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import GetAppIcon from '@material-ui/icons/GetApp';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
	backButton: {
		textDecoration: 'none',
		display: 'flex',
		flexDirection: 'row',
		color: '#07B597',
		marginTop: '2rem',
		marginBottom: '1rem'
	},
	wrapper: {
		display: 'flex',
		flexDirection: 'column'
	},
	section: {
		display: 'flex',
		flexDirection: 'row-reverse',
		marginTop: '1rem',
		marginBottom: '1rem'
	},
	subtitle: {
		fontWeight: 'bold'
	},
	tableSection: {
		marginTop: '2em'
	},
	tableHeader: {
		fontWeight: 'bold'
	},
	wrapperTab: {
		textTransform: 'capitalize',
		fontSize: '1.2rem',
		justifyContent: 'center'
	},
	icons: {
		fontSize: '2.3rem'
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
	editButton: {
		paddingTop: '0.6rem',
		paddingBottom: '0.6rem',
		paddingRight: '1rem',
		paddingLeft: '0.8rem'
	},
	editIcon: {
		marginRight: '0.5rem'
	}
});

const DOCUMENTS_QUERY = gql`
	query GetAppointments(
		$idHCP: ID!,
		$idPatient: ID!
	) {
		patientLabTestForDoctors(
			idHCP: $idHCP,
			idPatient: $idPatient
		) {

			accountPatientid
				{ 
					profilePicture
				  },
			  idApt,
			  profilePatientid{ 
				_id,
				firstName,
				lastName
			  },
			  amount,
			  reasonForVisit,
			  patientDoc,
			  labTest {
				doctorRequest,  
				status,      
				 patientResult,
			  }
		}
	}
`;

//TAB PANEL
function TabPanel(props) {
	const { children, value, index, ...other } = props;
	

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`wrapped-tabpanel-${index}`}
			aria-labelledby={`wrapped-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	};
}

//MAIN FUNCTION

const DocViewPatProfile = () => {
	const classes = useStyles();
	const [ value, setValue ] = useState(0);
	const { state: { userId, userAmIHCP } } = useContext(AuthContext);
	const location = useLocation();
	const { id, image, firstName, lastName, phoneNumber, email } = location.state;
	const { loading, error, data, fetchMore } = useQuery(DOCUMENTS_QUERY, {
		variables: {
			idHCP: userId,
			idPatient: id
		}
	});
	console.log(id, firstName, image);
	console.log('data', data)
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const documents = [
		{
			docName: 'Priscilla',
			docPic:
				'https://images.pexels.com/photos/773371/pexels-photo-773371.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
			start: '2021-02-01T06:30:00.000Z',
			end: '2021-02-01T07:00:00.000Z',
			comments: '',
			status: ''
		}
	];
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
	const surveys = [
		{
			docName: 'Jeniffer',
			docPic:
				'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
			start: '2021-02-01T06:30:00.000Z',
			end: '2021-02-01T07:00:00.000Z',
			comments: '',
			status: ''
		}
	];

	return (
		<DocLayoutContainer>
			<Container maxWidth="md">
				<NavLink to="/in/doctor/dashboard" className={classes.backButton}>
					<ArrowBackIcon />
					<Typography>Back to my patients</Typography>
				</NavLink>
				<Divider />
				<Grid container className={classes.wrapper}>
					<Grid item className={classes.section}>
						<Typography variant="h6" className={classes.subtitle}>
							Patient Information
						</Typography>
					</Grid>
					<Grid item className={classes.section}>
						<CardProfilePublic
							firstName= {firstName}
							lastName={lastName}
							phoneNumber={phoneNumber}
							email= {email}
							isHCP={false}
							image={image.includes("http") ? image : `http://localhost:10101/dianurse/v1/profile/static/images/${image}`}
						/>
					</Grid>
				</Grid>
				<Grid item>
					<Tabs
						value={value}
						onChange={handleChange}
						variant="fullWidth"
						indicatorColor="primary"
						aria-label="icon label tabs"
					>
						<TabCustom
							className={classes.wrapperTab}
							icon={<FolderIcon className={classes.icons} />}
							label="Documents"
							{...a11yProps(0)}
						/>
						<TabCustom
							className={classes.wrapperTab}
							icon={<PrescriptionIcon className={classes.icons} />}
							label="Prescriptions"
							{...a11yProps(1)}
						/>
						<TabCustom
							className={classes.wrapperTab}
							icon={<LabTestsIcon className={classes.icons} />}
							label="Lab Tests"
							{...a11yProps(2)}
						/>
						<TabCustom
							className={classes.wrapperTab}
							icon={<QuestionnaireIcon className={classes.icons} />}
							label="Surveys"
							{...a11yProps(3)}
						/>
					</Tabs>
					<TabPanel value={value} index={0}>
						<TableContainer className={classes.tableSection} component={PaperCustomShadow}>
							<Table>
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
									{documents.map((doc, i) => {
										return (
											<TableRow key={i}>
												<TableCell>
													<div className={classes.name}>
														<Avatar
															className={classes.avatar}
															alt={doc.docName}
															src={doc.docPic}
														/>
														{doc.docName}
													</div>
												</TableCell>
												<TableCell>{formatDateShort(doc.start)}</TableCell>
												<TableCell>
													{convertTime(doc.start)} - {convertTime(doc.end)}
												</TableCell>
												<TableCell>{doc.comments}</TableCell>
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
					</TabPanel>
					<TabPanel value={value} index={1}>
						<Grid item className={classes.header}>
							<ButtonFilled className={classes.uploadButton}>
								<AddIcon className={classes.uploadIcon} /> New Prescription
							</ButtonFilled>
						</Grid>
						<TableContainer className={classes.tableSection} component={PaperCustomShadow}>
							<Table>
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
									{prescriptions.map((presc, i) => {
										return (
											<TableRow key={i}>
												<TableCell>
													<div className={classes.name}>
														<Avatar
															className={classes.avatar}
															alt={presc.docName}
															src={presc.docPic}
														/>
														{presc.docName}
													</div>
												</TableCell>
												<TableCell>{formatDateShort(presc.start)}</TableCell>
												<TableCell>
													{convertTime(presc.start)} - {convertTime(presc.end)}
												</TableCell>
												<TableCell>{presc.comments}</TableCell>
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
					</TabPanel>
					<TabPanel value={value} index={2}>
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
									{tests.map((test, i) => {
										return (
											<TableRow key={i}>
												<TableCell>
													<div className={classes.name}>
														<Avatar
															className={classes.avatar}
															alt={test.docName}
															src={test.docPic}
														/>
														{test.docName}
													</div>
												</TableCell>
												<TableCell>{formatDateShort(test.start)}</TableCell>
												<TableCell>
													{convertTime(test.start)} - {convertTime(test.end)}
												</TableCell>

												<TableCell>{test.status}</TableCell>
												<TableCell>
													<IconButton>
														<VisibilityIcon />
													</IconButton>
													<IconButton>
														<DeleteOutlineIcon color="secondary" />
													</IconButton>
													<ButtonOutlined className={classes.editButton}>
														<GetAppIcon className={classes.editIcon} /> Download results
													</ButtonOutlined>
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</TabPanel>
					<TabPanel value={value} index={3}>
						<Grid item className={classes.header}>
							<ButtonFilled className={classes.uploadButton}>
								<AddIcon className={classes.uploadIcon} /> New Survey
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
									{surveys.map((surv, i) => {
										return (
											<TableRow key={i}>
												<TableCell>
													<div className={classes.name}>
														<Avatar
															className={classes.avatar}
															alt={surv.docName}
															src={surv.docPic}
														/>
														{surv.docName}
													</div>
												</TableCell>
												<TableCell>{formatDateShort(surv.start)}</TableCell>
												<TableCell>
													{convertTime(surv.start)} - {convertTime(surv.end)}
												</TableCell>

												<TableCell>{surv.status}</TableCell>
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
					</TabPanel>
				</Grid>
			</Container>
		</DocLayoutContainer>
	);
};

export default DocViewPatProfile;
