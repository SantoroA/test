import React, { useState, useContext } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';

import PatLayoutContainer from '../../components/layout/PatLayoutContainer';

import TabDocuments from '../../components/tabs/TabDocuments';
import TabQuestionnaries from '../../components/tabs/TabQuestionnaries';
import TabPatientAppointments from '../../components/tabs/TabPatientAppointments';
import TabPrescriptions from '../../components/tabs/TabPrescriptions';
import TabLabTests from '../../components/tabs/TabLabTests';
import PropTypes from 'prop-types';
import TabCustom from '../../components/customUi/TabCustom';
import { NavLink } from 'react-router-dom';
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
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';

const useStyles = makeStyles({
	userInfo: {
		justifyContent: 'center',
		padding: '2rem'
	},
	userOptions: {
		paddingLeft: '2rem',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	wrapperTab: {
		textTransform: 'capitalize',
		fontSize: '1.2rem'
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
	button: {
		textDecoration: 'none',
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

const PatDashboardScreen = () => {
	const [ value, setValue ] = useState(0);
	const { state: { userName } } = useContext(AuthContext);
	const classes = useStyles();
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<PatLayoutContainer>
			<Grid container className={classes.userInfo}>
				<Grid item lg={5} sm={8} xs={12}>
					<Avatar className={classes.avatar} />
					{/* fetch the foto as url- it's received from the back-end  */}
					{/* get data request and display the response from the back-end on the page */}
					<Typography variant="h4" className={classes.text}>
						{userName}
					</Typography>
				</Grid>
				<Grid item lg={3} sm={4} xs={12} className={classes.userOptions}>
					<NavLink className={classes.button} to="/in/patient/doctorsearch">
						<ButtonFilled variant="contained">Search for a Doctor</ButtonFilled>
					</NavLink>

					<ButtonOutlined variant="outlined" color="primary">
						Meet the assistant
					</ButtonOutlined>
				</Grid>
			</Grid>

			<Divider variant="middle" />
			<Container>
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
						label="My Appointments"
						{...a11yProps(0)}
					/>
					<TabCustom
						className={classes.wrapperTab}
						icon={<FolderIcon className={classes.icons} />}
						label="Documents"
						{...a11yProps(1)}
					/>
					<TabCustom
						className={classes.wrapperTab}
						icon={<PrescriptionIcon className={classes.icons} />}
						label="Prescriptions"
						{...a11yProps(2)}
					/>
					<TabCustom
						className={classes.wrapperTab}
						icon={<LabTestsIcon className={classes.icons} />}
						label="Lab Tests"
						{...a11yProps(3)}
					/>
					<TabCustom
						className={classes.wrapperTab}
						icon={<QuestionnaireIcon className={classes.icons} />}
						label="Surveys"
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
			</Container>
		</PatLayoutContainer>
	);
};

export default PatDashboardScreen;
