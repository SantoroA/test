import React, { useState, useContext } from 'react';
import { Context as AuthContext } from '../../../context/AuthContext';
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
import InfoIcon from '../../customIcons/InfoIcon';
import AboutIcon from '../../customIcons/AboutIcon';
import ProfileIcon from '../../customIcons/ProfileIcon';
//MaterialUI
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Collapse from '@material-ui/core/Collapse';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const DrawerList = ({ setDrawerOpen, logout }) => {
	const classes = useStyles();
	const { state: { userAmIHCP } } = useContext(AuthContext);
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
