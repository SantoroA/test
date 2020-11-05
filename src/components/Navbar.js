import React from 'react';
import logo from '../assets/dianurse-logo.png';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	navbar: {
		flexGrow: 1,
		backgroundColor: '#fff'
	},
	toolbar: {
		justifyContent: 'space-between'
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	},
	img: {
		width: '8.5em',
		height: '1.3em',
		paddingInlineStart: '1em'
	}
}));

export default function ButtonAppBar() {
	const classes = useStyles();

	return (
		<div>
			<AppBar className={classes.navbar} position="static">
				<Toolbar className={classes.toolbar}>
					<img src={logo} alt="Logo" className={classes.img} />
					<Button color="primary">Login</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}
