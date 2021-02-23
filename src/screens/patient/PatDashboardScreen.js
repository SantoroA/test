import React, { useState } from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import PatLayoutContainer from '../../components/layout/PatLayoutContainer';
import CardMyProfile from '../../components/groups/CardMyProfile';
import TabDocuments from '../../components/tabs/TabDocuments';
import TabQuestionnaries from '../../components/tabs/TabQuestionnaries';
import TabPatientAppointments from '../../components/tabs/TabPatientAppointments';
import TabPrescriptions from '../../components/tabs/TabPrescriptions';
import TabLabTests from '../../components/tabs/TabLabTests';
import PropTypes from 'prop-types';
import TabCustom from '../../components/customUi/TabCustom';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
//CUSTOM UI
import ButtonFilled from '../../components/customUi/ButtonFilled';
import ButtonOutlined from '../../components/customUi/ButtonOutlined';
//CUSTOM ICONS
import CalendarIcon from '../../components/customIcons/CalendarIcon';
import FolderIcon from '../../components/customIcons/FolderIcon';
import PrescriptionIcon from '../../components/customIcons/PrescriptionIcon';
import LabTestsIcon from '../../components/customIcons/LabTestsIcon';
import QuestionnaireIcon from '../../components/customIcons/QuestionnaireIcon';
//MATERIAL UI
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles({
	userInfo: {
		justifyContent: 'center',
		padding: '2rem'
	},
	userOptions: {
		padding: '2rem',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	wrapperTab: {
		textTransform: 'capitalize',
		fontSize: '1.2rem',
		justifyContent: 'center'
	},
	icons: {
		fontSize: '2.3rem'
	},
	body: {
		display: 'flex',
		alignItems: 'center',
		backgroundColor: '#d8eaf4',
		marginTop: '1.5em',
		justifyContent: 'space-around'
	},
	text: {
		justifyContent: 'center',
		marginTop: '2em',
		marginBottom: '1em'
	},
	avatar: {
		marginRight: '1em',
		marginTop: '3.5em'
	},
	buttonNav: {
		textDecoration: 'none',
		marginBottom: '1rem'
	},
	button: {
		paddingBottom: '0.7rem',
		paddingTop: '0.7rem',
		paddingLeft: '1.5em',
		paddingRight: '1.5rem'
	},
	buttonIcon: {
		marginRight: '0.3rem'
	},
	buttonWrapper: {
		marginTop: '0.5rem',
		marginBottom: '0.5rem',
		display: 'flex',
		justifyContent: 'center'
	}
});

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

const PatDashboardScreen = () => {
	const [ value, setValue ] = useState(0);
	const classes = useStyles();
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	let { path } = useRouteMatch();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
	const { t } = useTranslation();
	return (
		<PatLayoutContainer>
			<Grid container className={classes.userInfo}>
				<Grid item lg={5} md={8} xs={12}>
					<CardMyProfile />
				</Grid>

				<Grid item lg={3} md={4} xs={12} className={classes.userOptions}>
					<Grid container>
						<Grid item md={12} sm={6} xs={12} className={classes.buttonWrapper}>
							<NavLink className={classes.buttonNav} to="/in/patient/doctorsearch">
								<ButtonFilled className={classes.button} variant="contained">
									<SearchIcon className={classes.buttonIcon} />
									{t('Search_Doctor.1')}
								</ButtonFilled>
							</NavLink>
						</Grid>
						<Grid item md={12} sm={6} xs={12} className={classes.buttonWrapper}>
							<ButtonOutlined className={classes.button} variant="outlined" color="primary">
								<ChatBubbleOutlineIcon className={classes.buttonIcon} /> {t('Meet_assistant.1')}
							</ButtonOutlined>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			<Divider variant="middle" />
			<Container>
				{isMobile ? (
					<Switch>
						<Route path={`${path}/appointments`} component={TabPatientAppointments} />
						<Route path={`${path}/documents`} component={TabDocuments} />
						<Route path={`${path}/prescriptions`} component={TabPrescriptions} />
						<Route path={`${path}/labTests`} component={TabLabTests} />
						<Route path={`${path}/surveys`} component={TabQuestionnaries} />
						<Route path={`${path}/`}>
							<Redirect to={`${path}/appointments`} />
						</Route>
					</Switch>
				) : (
					<div>
						<Tabs
							value={value}
							onChange={handleChange}
							variant="fullWidth"
							indicatorColor="primary"
							aria-label="icon label tabs"
						>
							<TabCustom
								className={classes.wrapperTab}
								icon={<CalendarIcon className={classes.icons} />}
								label={t('My_Appointments.1')}
								{...a11yProps(0)}
							/>
							<TabCustom
								className={classes.wrapperTab}
								icon={<FolderIcon className={classes.icons} />}
								label={t('DOCUMENTS.1')}
								{...a11yProps(1)}
							/>
							<TabCustom
								className={classes.wrapperTab}
								icon={<PrescriptionIcon className={classes.icons} />}
								label={t('PRESCRIPTIONS.1')}
								{...a11yProps(2)}
							/>
							<TabCustom
								className={classes.wrapperTab}
								icon={<LabTestsIcon className={classes.icons} />}
								label={t('LAB_TESTS.1')}
								{...a11yProps(3)}
							/>
							<TabCustom
								className={classes.wrapperTab}
								icon={<QuestionnaireIcon className={classes.icons} />}
								label={t('SURVEYS.1')}
								{...a11yProps(4)}
							/>
						</Tabs>
						<TabPanel value={value} index={0}>
							<TabPatientAppointments />
						</TabPanel>
						<TabPanel value={value} index={1}>
							<TabDocuments />
						</TabPanel>
						<TabPanel value={value} index={2}>
							<TabPrescriptions />
						</TabPanel>
						<TabPanel value={value} index={3}>
							<TabLabTests />
						</TabPanel>
						<TabPanel value={value} index={4}>
							<TabQuestionnaries />
						</TabPanel>
					</div>
				)}
			</Container>
		</PatLayoutContainer>
	);
};

export default PatDashboardScreen;
