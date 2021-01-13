import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const PatDashboardTabs = () => {
	const [ value, setValue ] = useState(0);
	const classes = useStyles();
	const handleChangeValue = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div>
			<Tabs
				value={value}
				onChange={handleChangeValue}
				variant="fullWidth"
				indicatorColor="primary"
				aria-label="icon label tabs"
			>
				<Tab
					className={classes.wrapperTab}
					icon={<VideocamOutlinedIcon className={classes.icons} />}
					label="My Appointments"
				/>
				<Tab
					className={classes.wrapperTab}
					icon={<PeopleAltOutlinedIcon className={classes.icons} />}
					label="Documents"
				/>
				<Tab
					className={classes.wrapperTab}
					icon={<AccountBalanceWalletOutlinedIcon className={classes.icons} />}
					label="Prescriptions"
				/>
				<Tab
					className={classes.wrapperTab}
					icon={<EventAvailableOutlinedIcon className={classes.icons} />}
					label="LabTests"
				/>
				<Tab
					className={classes.wrapperTab}
					icon={<EventAvailableOutlinedIcon className={classes.icons} />}
					label="Questionaries"
				/>
			</Tabs>
		</div>
	);
};

export default PatDashboardTabs;
