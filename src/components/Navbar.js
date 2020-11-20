import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { Context as LanguageContext } from '../context/LanguageContext';
import { Context as AuthContext } from '../context/AuthContext';
import logo from '../assets/dianurse-logo.png';

const useStyles = makeStyles((theme) => ({
	navbar: {
		flexGrow: 1,
		backgroundColor: '#fff',
		color: 'black'
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
	const { state: { userName } } = useContext(AuthContext);
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
							<MenuItem value={'en_US'}>English</MenuItem>
							<MenuItem value={'bg_BG'}>Bulgarian</MenuItem>
						</Select>
					</FormControl>
					{userName && <Typography>{userName}</Typography>}
				</Toolbar>
			</AppBar>
		</div>
	);
}
