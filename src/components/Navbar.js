import React, { useContext } from 'react';
import { Context as LanguageContext } from '../context/LanguageContext';
import logo from '../assets/dianurse-logo.png';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	}
}));

export default function ButtonAppBar() {
	const { state: { language }, changeLanguage } = useContext(LanguageContext);
	const classes = useStyles();
	const handleChange = (event) => {
		changeLanguage(event.target.value);
	};

	return (
		<div>
			<AppBar className={classes.navbar} position="static">
				<Toolbar className={classes.toolbar}>
					<img src={logo} alt="Logo" className={classes.img} />
					<FormControl variant="outlined" className={classes.formControl}>
						<Select value={language} onChange={handleChange}>
							<MenuItem value={'en'}>English</MenuItem>
							<MenuItem value={'bg'}>Bulgarian</MenuItem>
						</Select>
					</FormControl>
					<Button color="primary">Login</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}
