import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context as AuthContext } from '../../../context/AuthContext';
import { Context as DocProfileContext } from '../../../context/DocProfileContext';
import { Context as PatProfileContext } from '../../../context/PatProfileContext';
import useStyles from './style';
import DrawerList from './list';
//CUSTOM ICONS
import DrawerIcon from '../../customIcons/DrawerIcon';
//MaterialUI
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

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
				<Drawer
					className={classes.drawer}
					anchor="right"
					open={drawerOpen}
					onClose={() => setDrawerOpen(false)}
				>
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
