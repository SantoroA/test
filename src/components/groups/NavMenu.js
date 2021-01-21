import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as DocProfileContext } from '../../context/DocProfileContext';
import { Context as PatProfileContext } from '../../context/PatProfileContext';
//MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

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
	}
});

const NavMenu = () => {
	const classes = useStyles();
	const [ menuItem, setMenuItem ] = useState(null);
	const { logout, state: { userAmIHCP } } = useContext(AuthContext);
	const { state: { firstName, image } } = useContext(userAmIHCP ? DocProfileContext : PatProfileContext);

	const handleChange = (event) => {
		setMenuItem(event.currentTarget);
	};

	const handleClose = () => {
		setMenuItem(null);
	};

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
