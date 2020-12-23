import React, { useState } from 'react';
import DocLayoutContainer from '../../components/layout/DocLayoutContainer';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import TabCustom from '../../components/customUi/TabCustom';
import FormCompleteProfile from '../../components/groups/FormCompleteProfile';
//CUSTOM ICONS
import ProfileIcon from '../../components/customIcons/ProfileIcon';
import InfoIcon from '../../components/customIcons/InfoIcon';
import AboutIcon from '../../components/customIcons/AboutIcon';
//MATERIAL UI
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
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
					<FormCompleteProfile />
				</TabPanel>
			</Container>
		</DocLayoutContainer>
	);
};

export default DocCompleteProfileScreen;
