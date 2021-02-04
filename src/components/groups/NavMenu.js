import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as DocProfileContext } from '../../context/DocProfileContext';
import { Context as PatProfileContext } from '../../context/PatProfileContext';
//CUSTOM ICONS
import DrawerIcon from '../customIcons/DrawerIcon';
import CalendarIcon from '../../components/customIcons/CalendarIcon';
import PeopleIcon from '../../components/customIcons/PeopleIcon';
import EarningsIcon from '../../components/customIcons/EarningsIcon';
import ClockIcon from '../../components/customIcons/ClockIcon';
import FolderIcon from '../../components/customIcons/FolderIcon';
import PrescriptionIcon from '../../components/customIcons/PrescriptionIcon';
import LabTestsIcon from '../../components/customIcons/LabTestsIcon';
import QuestionnaireIcon from '../../components/customIcons/QuestionnaireIcon';
//MaterialUI
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles({
	loginName: {
		color: 'rgba(82, 87, 92, 1)',
		marginLeft: '0.2rem',
		marginRight: '0.5rem',
		fontWeight: 700
	},
	menu: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	drawerIconContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	avatar: {
		marginRight: '0.5rem'
	}
});

const DrawerList = ({ setDrawerOpen, logout }) => {
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

const NavMenu = () => {
	const classes = useStyles();
	const [ menuItem, setMenuItem ] = useState(null);
	const [ drawerOpen, setDrawerOpen ] = useState(false);
	const { logout, state: { userAmIHCP } } = useContext(AuthContext);
	const { state: { firstName, image } } = useContext(userAmIHCP ? DocProfileContext : PatProfileContext);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
	console.log(isMobile);
	const handleChange = (event) => {
		setMenuItem(event.currentTarget);
	};

	const handleClose = () => {
		setMenuItem(null);
	};

	if (isMobile) {
		return (
			<div className={classes.drawerIconContainer}>
				<Avatar alt={firstName} src={image} className={classes.avatar} />
				<IconButton onClick={() => setDrawerOpen(true)}>
					<DrawerIcon />
				</IconButton>
				<Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
					<DrawerList setDrawerOpen={setDrawerOpen} logout={logout} />
				</Drawer>
			</div>
		);
	}

	return (
		<div className={classes.menu}>
			<IconButton
				aria-controls="menu-appbar"
				aria-haspopup="true"
				onClick={handleChange}
				color="inherit"
				className={classes.iconButton}
			>
				<Avatar alt={firstName} src={image} className={classes.large} />
			</IconButton>
			<Typography variant="h6" className={classes.loginName}>
				{firstName}
			</Typography>
			{userAmIHCP ? (
				<Menu
					id="menu-appbar"
					className={classes.menuStyle}
					anchorEl={menuItem}
					keepMounted
					open={Boolean(menuItem)}
					onClose={handleClose}
				>
					<MenuItem component={Link} to="/in/doctor/completeprofile" onClick={handleClose}>
						Profile Settings
					</MenuItem>
					<MenuItem component={Link} to="/in/doctor/pastappointments" onClick={handleClose}>
						Past Appointments
					</MenuItem>
					<MenuItem component={Link} to="/in/doctor/membership" onClick={handleClose}>
						Membership
					</MenuItem>
					<MenuItem component={Link} to="/in/doctor/help" onClick={handleClose}>
						Help
					</MenuItem>
					<MenuItem
						component={Link}
						to="/"
						onClick={() => {
							logout();
							handleClose();
						}}
					>
						Logout
					</MenuItem>
				</Menu>
			) : (
				<Menu
					id="menu-appbar"
					className={classes.menuStyle}
					anchorEl={menuItem}
					keepMounted
					open={Boolean(menuItem)}
					onClose={handleClose}
				>
					<MenuItem component={Link} to="/in/patient/completeprofile" onClick={handleClose}>
						Profile Settings
					</MenuItem>
					<MenuItem component={Link} to="/in/patient/pastappointments" onClick={handleClose}>
						Past Appointments
					</MenuItem>
					<MenuItem component={Link} to="/in/patient/membership" onClick={handleClose}>
						Membership
					</MenuItem>
					<MenuItem component={Link} to="/in/patient/help" onClick={handleClose}>
						Help
					</MenuItem>
					<MenuItem
						component={Link}
						to="/"
						onClick={() => {
							logout();
							handleClose();
						}}
					>
						Logout
					</MenuItem>
				</Menu>
			)}
		</div>
	);
};

export default NavMenu;
