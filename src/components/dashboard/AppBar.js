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
import NavMenu from '../NavMenu';

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
		height: '2em',
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
					<NavMenu />
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default AppBarPage;
