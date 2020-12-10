import React, { useState } from 'react';
import TabAvailability from '../tabs/TabAvailability';
import PropTypes from 'prop-types';
//MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';

// theming
const useStyles = makeStyles({
	wrapperTab: {
		textTransform: 'capitalize',
		fontSize: '1.2em'
	},
	icons: {
		color: '#6c6c5a',
		marginRight: '0.3em',
		marginLeft: '1em'
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
				<Tab
					className={classes.wrapperTab}
					icon={<VideocamOutlinedIcon className={classes.icons} />}
					label="My Appointments"
					{...a11yProps(0)}
				/>
				<Tab
					className={classes.wrapperTab}
					icon={<PeopleAltOutlinedIcon className={classes.icons} />}
					label="My Patients"
					{...a11yProps(1)}
				/>
				<Tab
					className={classes.wrapperTab}
					icon={<AccountBalanceWalletOutlinedIcon className={classes.icons} />}
					label="My Earnings"
					{...a11yProps(2)}
				/>
				<Tab
					className={classes.wrapperTab}
					icon={<EventAvailableOutlinedIcon className={classes.icons} />}
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
