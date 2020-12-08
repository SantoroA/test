import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context as AuthContext } from '../../context/AuthContext';
//MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles({
	iconButton: {
		display: 'flex',
		color: '#808080'
	},
	loginName: {
		color: '#000',
		marginLeft: '0.5em'
	},
	menuStyle: {
		marginTop: '3em'
	}
});

const NavMenu = () => {
	const classes = useStyles();
	const [ menuItem, setMenuItem ] = useState(null);
	const { logout, state: { userName, userAmIHCP } } = useContext(AuthContext);

	const handleChange = (event) => {
		setMenuItem(event.currentTarget);
	};

	const handleClose = () => {
		setMenuItem(null);
	};

	return (
		<div>
			<IconButton
				aria-controls="menu-appbar"
				aria-haspopup="true"
				onClick={handleChange}
				color="inherit"
				className={classes.iconButton}
			>
				<AccountCircle fontSize="large" />
				<Typography variant="h6" className={classes.loginName}>
					{userName}
				</Typography>
			</IconButton>
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
						Payment Method
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
