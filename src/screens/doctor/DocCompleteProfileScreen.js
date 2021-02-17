import React, { useState, useContext } from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import DocLayoutContainer from '../../components/layout/DocLayoutContainer';
import { Context as DocProfileContext } from '../../context/DocProfileContext';
// import { Context as AuthContext } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import TabCustom from '../../components/customUi/TabCustom';
import FormEmailAndPassword from '../../components/groups/FormEmailAndPassword';
import FormContactInfo from '../../components/groups/FormContactInfo';
import FormProfile from '../../components/groups/FormProfile';
import FormExperience from '../../components/groups/FormExperience';
import FormEducation from '../../components/groups/FormEducation';
import FormLocation from '../../components/groups/FormLocation';
import DialogMessage from '../../components/groups/DialogMessage';
//CUSTOM ICONS
import ProfileIcon from '../../components/customIcons/ProfileIcon';
import AboutIcon from '../../components/customIcons/AboutIcon';
import InfoIcon from '../../components/customIcons/InfoIcon';

//MATERIAL UI
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';
//icons
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles({
	backButton: {
		textDecoration: 'none',
		display: 'flex',
		flexDirection: 'row',
		color: '#07B597',
		marginTop: '2rem',
		marginBottom: '1rem'
	},
	wrapperTab: {
		textTransform: 'capitalize',
		fontSize: '1.2rem'
	},
	icons: {
		fontSize: '2.4rem'
	},
	tabs: {
		marginTop: '1rem'
	},
	section: {
		marginBottom: '1rem'
	},
	warning: {
		marginTop: '1rem'
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

const DocCompleteProfileScreen = () => {
	const classes = useStyles();
	const [ value, setValue ] = useState(0);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
	const { state: { dialogMessage, dialogOpen, firstName, lastName, specialty }, closeDialog } = useContext(
		DocProfileContext
	);
	let { path } = useRouteMatch();
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<DocLayoutContainer>
			<Container maxWidth="md">
				<NavLink to="/in/doctor/dashboard" className={classes.backButton}>
					<ArrowBackIcon />
					<Typography>Back to my profile</Typography>
				</NavLink>
				<Divider />
				{firstName === '' || lastName === '' || specialty === '' ? (
					<Alert className={classes.warning} severity="warning">
						Name and specialty must be filled to appear in searches
					</Alert>
				) : null}
				{isMobile ? (
					<Switch>
						<Route
							path={`${path}/general`}
							render={() => {
								return (
									<div>
										<Typography>Add services treated here</Typography>
									</div>
								);
							}}
						/>
						<Route
							path={`${path}/about`}
							render={() => {
								return (
									<div>
										<div className={classes.section}>
											<FormProfile />
										</div>
										<div className={classes.section}>
											<FormExperience />
										</div>
										<div className={classes.section}>
											<FormEducation />
										</div>
										<div className={classes.section}>
											<FormLocation />
										</div>
									</div>
								);
							}}
						/>
						<Route
							path={`${path}/profile`}
							render={() => {
								return (
									<div>
										<div className={classes.section}>
											<FormEmailAndPassword />
										</div>
										<div className={classes.section}>
											<FormContactInfo />
										</div>
									</div>
								);
							}}
						/>

						<Route path={`${path}/`}>
							<Redirect to={`${path}/profile`} />
						</Route>
					</Switch>
				) : (
					<div>
						<Tabs
							value={value}
							className={classes.tabs}
							onChange={handleChange}
							variant="fullWidth"
							indicatorColor="primary"
							aria-label="icon label tabs"
						>
							<TabCustom
								className={classes.wrapperTab}
								icon={<ProfileIcon className={classes.icons} />}
								label="My Profile"
								{...a11yProps(0)}
							/>
							<TabCustom
								className={classes.wrapperTab}
								icon={<InfoIcon className={classes.icons} />}
								label="General Information"
								{...a11yProps(1)}
							/>

							<TabCustom
								className={classes.wrapperTab}
								icon={<AboutIcon className={classes.icons} />}
								label="About me"
								{...a11yProps(2)}
							/>
						</Tabs>
						<TabPanel value={value} index={0}>
							<div className={classes.section}>
								<FormEmailAndPassword />
							</div>
							<div className={classes.section}>
								<FormContactInfo />
							</div>
						</TabPanel>
						<TabPanel value={value} index={2}>
							<div className={classes.section}>
								<FormProfile />
							</div>
							<div className={classes.section}>
								<FormExperience />
							</div>
							<div className={classes.section}>
								<FormEducation />
							</div>
							<div className={classes.section}>
								<FormLocation />
							</div>
						</TabPanel>
					</div>
				)}
			</Container>
			<DialogMessage open={dialogOpen} message={dialogMessage} close={closeDialog} />
		</DocLayoutContainer>
	);
};

export default DocCompleteProfileScreen;
