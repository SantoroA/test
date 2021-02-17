import React, { useState, useContext } from 'react';
import { Context as AuthContext } from '../../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const DrawerList = ({ setDrawerOpen, logout }) => {
	const classes = useStyles();
	const { state: { userAmIHCP } } = useContext(AuthContext);
	const [ open, setOpen ] = useState(false);
	const handleClick = () => {
		setOpen(!open);
	};
	let location = useLocation();
	const [ selected, setSelected ] = useState(null);
	console.log(selected);
	const activeRoute = (routeName) => {
		return location.pathname.indexOf(routeName) > -1 ? true : false;
	};
	console.log(location);
	return (
		<div onClick={() => setDrawerOpen(false)} onKeyDown={() => setDrawerOpen(false)} className={classes.root}>
			<List className={classes.menuList}>
				{userAmIHCP ? (
					<div>
						<ListItem
							component={Link}
							divider
							to="/in/doctor/dashboard/appointments"
							selected={activeRoute('/in/doctor/dashboard/appointments')}
							onClick={() => setSelected(0)}
							className={classes.listItems}
						>
							<CalendarIcon className={classes.icons} />

							<ListItemText>
								<Typography className={classes.listText}>My Appointments</Typography>
							</ListItemText>
						</ListItem>
						<ListItem
							component={Link}
							divider
							to="/in/doctor/dashboard/patients"
							selected={activeRoute('/in/doctor/dashboard/patients')}
							className={classes.listItems}
						>
							<PeopleIcon className={classes.icons} />

							<ListItemText>
								<Typography className={classes.listText}>My Patients</Typography>
							</ListItemText>
						</ListItem>

						<ListItem
							component={Link}
							divider
							to="/in/doctor/dashboard/earnings"
							selected={activeRoute('/in/doctor/dashboard/earnings')}
							className={classes.listItems}
						>
							<EarningsIcon className={classes.icons} />
							<ListItemText>
								<Typography className={classes.listText}>My Earnings</Typography>
							</ListItemText>
						</ListItem>

						<ListItem
							component={Link}
							divider
							to="/in/doctor/dashboard/availability"
							selected={activeRoute('/in/doctor/dashboard/availability')}
							className={classes.listItems}
						>
							<ClockIcon className={classes.icons} />
							<ListItemText>
								<Typography className={classes.listText}>Availability</Typography>
							</ListItemText>
						</ListItem>

						<ListItem
							button
							selected={activeRoute('/in/doctor/completeprofile')}
							className={classes.linkItems}
							onClick={(e) => {
								e.stopPropagation();
								handleClick();
							}}
						>
							<ListItemText primary="Profile Settings" />
							{open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
						</ListItem>
						<Collapse in={open} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItem
									component={Link}
									divider
									to="/in/doctor/completeprofile/profile"
									selected={activeRoute('/in/doctor/completeprofile/profile')}
									className={classes.listItems}
								>
									<ProfileIcon className={classes.icons} />
									<ListItemText className={classes.items}>
										<Typography className={classes.listText}>My Profile</Typography>
									</ListItemText>
								</ListItem>
								<ListItem
									component={Link}
									divider
									to="/in/doctor/completeprofile/general"
									selected={activeRoute('/in/doctor/completeprofile/general')}
									className={classes.listItems}
								>
									<InfoIcon className={classes.icons} />
									<ListItemText className={classes.items}>
										<Typography className={classes.listText}>General Information</Typography>
									</ListItemText>
								</ListItem>

								<ListItem
									component={Link}
									divider
									to="/in/doctor/completeprofile/about"
									selected={activeRoute('/in/doctor/completeprofile/about')}
									className={classes.listItems}
								>
									<AboutIcon className={classes.icons} />
									<ListItemText className={classes.items}>
										<Typography className={classes.listText}>About me</Typography>
									</ListItemText>
								</ListItem>
							</List>
						</Collapse>

						<ListItem
							className={classes.linkItems}
							selected={activeRoute('/in/doctor/pastappointments')}
							component={Link}
							to="/in/doctor/pastappointments"
						>
							<ListItemText>Past Appointments</ListItemText>
						</ListItem>
						<ListItem
							className={classes.linkItems}
							selected={activeRoute('/in/doctor/membership')}
							component={Link}
							to="/in/doctor/membership"
						>
							<ListItemText>Membership</ListItemText>
						</ListItem>
						<ListItem
							className={classes.linkItems}
							selected={activeRoute('/in/doctor/help')}
							component={Link}
							to="/in/doctor/help"
						>
							<ListItemText>Help</ListItemText>
						</ListItem>
						<ListItem
							component={Link}
							to="/"
							onClick={() => {
								logout();
							}}
						>
							<ListItemText className={classes.linkItems}>Logout</ListItemText>
						</ListItem>
					</div>
				) : (
					<div>
						<ListItem
							component={Link}
							divider
							to="/in/patient/dashboard/appointments"
							selected={activeRoute('/in/patient/dashboard/appointments')}
							className={classes.listItems}
						>
							<CalendarIcon className={classes.icons} />

							<ListItemText>
								<Typography className={classes.listText}>My Appointments</Typography>
							</ListItemText>
						</ListItem>

						<ListItem
							component={Link}
							divider
							to="/in/patient/dashboard/documents"
							selected={activeRoute('/in/patient/dashboard/documents')}
							className={classes.listItems}
						>
							<FolderIcon className={classes.icons} />

							<ListItemText>
								<Typography className={classes.listText}>Documents</Typography>
							</ListItemText>
						</ListItem>

						<ListItem
							component={Link}
							divider
							to="/in/patient/dashboard/prescriptions"
							selected={activeRoute('/in/patient/dashboard/prescriptions')}
							className={classes.listItems}
						>
							<PrescriptionIcon className={classes.icons} />

							<ListItemText>
								<Typography className={classes.listText}>Prescriptions</Typography>
							</ListItemText>
						</ListItem>

						<ListItem
							component={Link}
							divider
							to="/in/patient/dashboard/labTests"
							selected={activeRoute('/in/patient/dashboard/labTests')}
							className={classes.listItems}
						>
							<LabTestsIcon className={classes.icons} />

							<ListItemText>
								<Typography className={classes.listText}>Lab Tests</Typography>
							</ListItemText>
						</ListItem>

						<ListItem
							component={Link}
							divider
							to="/in/patient/dashboard/surveys"
							selected={activeRoute('/in/patient/dashboard/surveys')}
							className={classes.listItems}
						>
							<QuestionnaireIcon className={classes.icons} />

							<ListItemText>
								<Typography className={classes.listText}>Surveys</Typography>
							</ListItemText>
						</ListItem>

						<ListItem
							selected={activeRoute('/in/patient/completeprofile')}
							component={Link}
							to="/in/patient/completeprofile"
							className={classes.linkItems}
						>
							<ListItemText>Profile Settings</ListItemText>
						</ListItem>
						<ListItem
							className={classes.linkItems}
							selected={activeRoute('/in/patient/pastappointments')}
							component={Link}
							to="/in/patient/pastappointments"
						>
							<ListItemText>Past Appointments</ListItemText>
						</ListItem>
						<ListItem
							className={classes.linkItems}
							selected={activeRoute('/in/patient/membership')}
							component={Link}
							to="/in/patient/membership"
						>
							<ListItemText>Membership</ListItemText>
						</ListItem>
						<ListItem
							className={classes.linkItems}
							selected={activeRoute('/in/patient/help')}
							component={Link}
							to="/in/patient/help"
						>
							<ListItemText>Help</ListItemText>
						</ListItem>
						<ListItem
							component={Link}
							to="/"
							onClick={() => {
								logout();
							}}
						>
							<ListItemText className={classes.linkItems}>Logout</ListItemText>
						</ListItem>
					</div>
				)}
			</List>
		</div>
	);
};

export default DrawerList;

{
	/* <ListItem component={Link} to="/in/doctor/dashboard/appointments">
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
<Divider /> */
}
