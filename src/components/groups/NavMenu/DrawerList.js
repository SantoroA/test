import React from 'react';
import { Link } from 'react-router-dom';
import useStyles from './style';
//CUSTOM ICONS
import DrawerIcon from '../../customIcons/DrawerIcon';
import CalendarIcon from '../../customIcons/CalendarIcon';
import PeopleIcon from '../../customIcons/PeopleIcon';
import EarningsIcon from '../../customIcons/EarningsIcon';
import ClockIcon from '../../customIcons/ClockIcon';
import FolderIcon from '../../customIcons/FolderIcon';
import PrescriptionIcon from '../../customIcons/PrescriptionIcon';
import LabTestsIcon from '../../customIcons/LabTestsIcon';
import QuestionnaireIcon from '../../customIcons/QuestionnaireIcon';
//MaterialUI
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const DrawerList = ({ setDrawerOpen, logout }) => {
	const classes = useStyles();
	return (
		<div onClick={() => setDrawerOpen(false)} onKeyDown={() => setDrawerOpen(false)}>
			<List>
				<ListItem component={Link} to="/in/doctor/dashboard/appointments">
					<ListItemIcon>
						<CalendarIcon />
					</ListItemIcon>
					<ListItemText>My Appointments</ListItemText>
				</ListItem>
				<Divider />
				<ListItem component={Link} to="/in/doctor/dashboard/patients">
					<ListItemIcon>
						<PeopleIcon />
					</ListItemIcon>
					<ListItemText>My Patients</ListItemText>
				</ListItem>
				<Divider />
				<ListItem component={Link} to="/in/doctor/dashboard/earnings">
					<ListItemIcon>
						<EarningsIcon />
					</ListItemIcon>
					<ListItemText>My Earnings</ListItemText>
				</ListItem>
				<Divider />
				<ListItem component={Link} to="/in/doctor/dashboard/availability">
					<ListItemIcon>
						<ClockIcon />
					</ListItemIcon>
					<ListItemText>Availability</ListItemText>
				</ListItem>
				<ListItem component={Link} to="/in/doctor/completeprofile">
					<ListItemText>Profile Settings</ListItemText>
				</ListItem>
				<ListItem component={Link} to="/in/doctor/pastappointments">
					<ListItemText>Past Appointments</ListItemText>
				</ListItem>
				<ListItem component={Link} to="/in/patient/membership">
					<ListItemText>Membership</ListItemText>
				</ListItem>
				<ListItem component={Link} to="/in/patient/help">
					<ListItemText>Help</ListItemText>
				</ListItem>
				<ListItem
					component={Link}
					to="/"
					onClick={() => {
						logout();
					}}
				>
					<ListItemText>Logout</ListItemText>
				</ListItem>
				<Divider />
			</List>
		</div>
	);
};

export default DrawerList;
