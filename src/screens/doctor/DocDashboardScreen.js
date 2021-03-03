import React, { useState, useContext } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import CardMyProfile from '../../components/groups/CardMyProfile';
import DocLayoutContainer from '../../components/layout/DocLayoutContainer';
import DocUserOptions from '../../components/groups/DocUserOptions';
import TabMyPatients from '../../components/tabs/TabMyPatients';
import TabMyAppointments from '../../components/tabs/TabMyAppointments';
import TabMyEarnings from '../../components/tabs/TabMyEarnings';
import TabAvailability from '../../components/tabs/TabAvailability';
import TabDocPublicGeneral from '../../components/tabs/TabDocPublicGeneral';
import TabDocPublicAbout from '../../components/tabs/TabDocPublicAbout';
import PropTypes from 'prop-types';
import TabCustom from '../../components/customUi/TabCustom';
import { useTranslation } from 'react-i18next';
//CUSTOM ICONS
import CalendarIcon from '../../components/customIcons/CalendarIcon';
import PeopleIcon from '../../components/customIcons/PeopleIcon';
import EarningsIcon from '../../components/customIcons/EarningsIcon';
import ClockIcon from '../../components/customIcons/ClockIcon';
import InfoIcon from '../../components/customIcons/InfoIcon';
import AboutIcon from '../../components/customIcons/AboutIcon';
//MATERIAL UI
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles({
	userInfo: {
		justifyContent: 'center',
		padding: '2rem'
	},
	userOptions: {
		paddingRight: '2rem'
	},
	wrapperTab: {
		textTransform: 'capitalize',
		fontSize: '1.2rem'
	},
	icons: {
		fontSize: '2.3rem'
	},
	cardContainer: {
		paddingRight: '2rem',
		marginBottom: '1rem'
	},
	divider: {
		marginBottom: '1rem'
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

const DocDashboardScreen = () => {
	const [ value, setValue ] = useState(0);
	const [ valuePublic, setValuePublic ] = useState(0);
	const [ isPublic, setIsPublic ] = useState(false);
	const { state: { userId } } = useContext(AuthContext);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
	const classes = useStyles();
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	let { path } = useRouteMatch();
	const { t } = useTranslation();

	return (
		<DocLayoutContainer>
			<Grid container className={classes.userInfo}>
				<Grid className={classes.cardContainer} item lg={5} md={8} xs={12}>
					<CardMyProfile />
				</Grid>
				<Grid item lg={3} md={4} xs={12} className={classes.userOptions}>
					<DocUserOptions docId={userId} isHCP={true} setIsPublic={setIsPublic} isPublic={isPublic} />
				</Grid>
			</Grid>
			<Divider variant="middle" className={classes.divider} />
			{isPublic ? (
				<Container>
					<Tabs
						value={valuePublic}
						onChange={(e, newValue) => setValuePublic(newValue)}
						variant="fullWidth"
						indicatorColor="primary"
						aria-label="icon label tabs"
					>
						<TabCustom
							className={classes.wrapperTab}
							icon={<InfoIcon className={classes.icons} />}
							label="General Information"
							{...a11yProps(0)}
						/>
						<TabCustom
							className={classes.wrapperTab}
							icon={<AboutIcon className={classes.icons} />}
							label="About Me"
							{...a11yProps(1)}
						/>
					</Tabs>
					<TabPanel value={valuePublic} index={0}>
						<TabDocPublicGeneral disableBooking={true} docId={userId} />
					</TabPanel>
					<TabPanel value={valuePublic} index={1}>
						<TabDocPublicAbout docId={userId} />
					</TabPanel>
				</Container>
			) : (
				<Container>
					{isMobile ? (
						<Switch>
							<Route path={`${path}/appointments`} component={TabMyAppointments} />
							<Route path={`${path}/patients`} component={TabMyPatients} />
							<Route path={`${path}/earnings`} component={TabMyEarnings} />
							<Route path={`${path}/availability`} component={TabAvailability} />
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
									icon={<PeopleIcon className={classes.icons} />}
									label={t('My_Patients.1')}
									{...a11yProps(1)}
								/>
								<TabCustom
									className={classes.wrapperTab}
									icon={<EarningsIcon className={classes.icons} />}
									label={t('My_Earnings.1')}
									{...a11yProps(2)}
								/>
								<TabCustom
									className={classes.wrapperTab}
									icon={<ClockIcon className={classes.icons} />}
									label={t('Availability.1')}
									{...a11yProps(3)}
								/>
							</Tabs>
							<TabPanel value={value} index={0}>
								<TabMyAppointments />
							</TabPanel>
							<TabPanel value={value} index={1}>
								<TabMyPatients />
							</TabPanel>
							<TabPanel value={value} index={2}>
								<TabMyEarnings />
							</TabPanel>
							<TabPanel value={value} index={3}>
								<TabAvailability />
							</TabPanel>
						</div>
					)}
				</Container>
			)}
		</DocLayoutContainer>
	);
};

export default DocDashboardScreen;
