import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import logo from '../../assets/dianurse-logo.png';
import { Context as AuthContext } from '../../context/AuthContext';

// theming
const useStyles = makeStyles({
	title: {
		flexGrow: 1
	},
	navbar: {
		flexGrow: 1,
		backgroundColor: '#fff',
		color: '#000'
	},
	toolbar: {
		justifyContent: 'space-between'
	},
	iconButton: {
		display: 'flex',
		color: '#808080',
		marginLeft: 0,
		justifyContent: 'flex-end',
		float: 'right'
	},
	img: {
		width: '8.5em',
		height: '1.3em',
		paddingInlineStart: '1em'
	},
	loginName: {
		color: '#000',
		marginLeft: '0.5em'
	},
	menuStyle: {
		marginTop: '3em'
	}
});

const AppBarPage = () => {
	const classes = useStyles();
	const [ menu, setMenu ] = useState(null);
	const open = Boolean(menu);
	const { state: { userName } } = useContext(AuthContext);

	const handleMenu = (event) => {
		setMenu(event.currentTarget);
	};

	const handleClose = () => {
		setMenu(null);
	};

	return (
		<div>
			<AppBar className={classes.navbar} position="static">
				<Toolbar className={classes.toolbar}>
					<img src={logo} alt="Logo" className={classes.img} />
					<div>
						<IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
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
							anchorEl={menu}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'center'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'center'
							}}
							open={open}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose}>Profile Settings</MenuItem>
							<MenuItem onClick={handleClose}>Past Appointments</MenuItem>
							<MenuItem onClick={handleClose}>Membership</MenuItem>
							<MenuItem onClick={handleClose}>Help</MenuItem>
							<MenuItem onClick={handleClose}>Logout</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default AppBarPage;
