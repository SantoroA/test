import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import DocLayoutContainer from '../../components/layout/DocLayoutContainer';
import { useLocation, NavLink } from 'react-router-dom';
import CardProfilePublic from '../../components/groups/CardProfilePublic';
import TabCustom from '../../components/customUi/TabCustom';
import { Context as AuthContext } from '../../context/AuthContext';
import { useQuery, gql } from '@apollo/client';
import TabPatientDocs from '../../components/tabs/TabPatientDocs';
import TabPatientPrescriptions from '../../components/tabs/TabPatientPrescriptions';
import TabPatientLabTests from '../../components/tabs/TabPatientLabTests';
import TabPatientSurveys from '../../components/tabs/TabPatientSurveys';
import ErrorMessage from '../../components/groups/ErrorMessage';
import Loader from 'react-loader-spinner';
//CUSTOM ICONS
import FolderIcon from '../../components/customIcons/FolderIcon';
import PrescriptionIcon from '../../components/customIcons/PrescriptionIcon';
import LabTestsIcon from '../../components/customIcons/LabTestsIcon';
import QuestionnaireIcon from '../../components/customIcons/QuestionnaireIcon';
//MATERIAL UI
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';

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
	wrapperTab: {
		textTransform: 'capitalize',
		fontSize: '1.2rem',
		justifyContent: 'center'
	},
	icons: {
		fontSize: '2.3rem'
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

//QUERY INFO DO PACIENTE - NOME, TELEFONE, EMAIL
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
	const location = useLocation();
	// const { id } = location.state;
	// console.log(id);
	const { state: { userId, userAmIHCP } } = useContext(AuthContext);
	const { loading, error, data, fetchMore } = useQuery(DOCUMENTS_QUERY, {
		variables: {
			idHCP: '60116f816913da0029423db5', //userId
			idPatient: '6011887672a95e0028bcbcd7' //location.state.id
		}
	});

	console.log('data', data);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<DocLayoutContainer>
			<Container maxWidth="md">
				<NavLink to="/in/doctor/dashboard" className={classes.backButton}>
					<ArrowBackIcon />
					<Typography>Back to my patients</Typography>
				</NavLink>
				<Divider />
				{loading && (
					<Container className={classes.emptyState}>
						<Loader type="TailSpin" color="primary" height={80} width={80} />
					</Container>
				)}
				{error && <ErrorMessage />}

				{/* IF DATA */}
				<Grid container className={classes.wrapper}>
					<Grid item className={classes.section}>
						<Typography variant="h6" className={classes.subtitle}>
							Patient Information
						</Typography>
					</Grid>
					<Grid item className={classes.section}>
						<CardProfilePublic
							firstName="Aline"
							lastName="Santoro"
							phoneNumber="665985555"
							email="aline@gamil.com"
							isHCP={false}
							image="https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
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
						<TabPatientDocs idHCP="60116f816913da0029423db5" idPatient="6011887672a95e0028bcbcd7" />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<TabPatientPrescriptions
							idHCP="60116f816913da0029423db5"
							idPatient="6011887672a95e0028bcbcd7"
						/>
					</TabPanel>
					<TabPanel value={value} index={2}>
						<TabPatientLabTests idHCP="60116f816913da0029423db5" idPatient="6011887672a95e0028bcbcd7" />
					</TabPanel>
					<TabPanel value={value} index={3}>
						<TabPatientSurveys idHCP="60116f816913da0029423db5" idPatient="6011887672a95e0028bcbcd7" />
					</TabPanel>
				</Grid>
			</Container>
		</DocLayoutContainer>
	);
};

export default DocViewPatProfile;
