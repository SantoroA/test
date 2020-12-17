import React, { useState } from 'react';
import TabAvailability from '../tabs/TabAvailability';
import PropTypes from 'prop-types';
import TabCustom from '../customUi/TabCustom';
//CUSTOM ICONS
import CalendarIcon from '../customIcons/CalendarIcon';
import PeopleIcon from '../customIcons/PeopleIcon';
import EarningsIcon from '../customIcons/EarningsIcon';
import ClockIcon from '../customIcons/ClockIcon';
//MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
	wrapperTab: {
		textTransform: 'capitalize',
		fontSize: '1.2rem'
	},
	icons: {
		fontSize: '2.3rem'
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

const DocDashboardTabs = () => {
	const [ value, setValue ] = useState(0);
	const classes = useStyles();
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
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
					icon={<PeopleIcon className={classes.icons} />}
					label="My Patients"
					{...a11yProps(1)}
				/>
				<TabCustom
					className={classes.wrapperTab}
					icon={<EarningsIcon className={classes.icons} />}
					label="My Earnings"
					{...a11yProps(2)}
				/>
				<TabCustom
					className={classes.wrapperTab}
					icon={<ClockIcon className={classes.icons} />}
					label="Availability"
					{...a11yProps(3)}
				/>
			</Tabs>
			<TabPanel value={value} index={3}>
				<TabAvailability />
			</TabPanel>
		</Container>
	);
};

export default DocDashboardTabs;
