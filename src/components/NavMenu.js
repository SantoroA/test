import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Context as AuthContext } from '../context/AuthContext';

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
	const { state: { userName } } = useContext(AuthContext);

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
			<Menu
				id="menu-appbar"
				className={classes.menuStyle}
				anchorEl={menuItem}
				keepMounted
				open={Boolean(menuItem)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleClose}>Profile Settings</MenuItem>
				<MenuItem onClick={handleClose}>Past Appointments</MenuItem>
				<MenuItem onClick={handleClose}>Membership</MenuItem>
				<MenuItem onClick={handleClose}>Help</MenuItem>
				<MenuItem onClick={handleClose}>Logout</MenuItem>
			</Menu>
		</div>
	);
};

export default NavMenu;
