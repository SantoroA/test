import React, { useContext, useState } from 'react';
import { Context as LanguageContext } from '../../context/LanguageContext';
import { Context as AuthContext } from '../../context/AuthContext';
import logo from '../../assets/dianurse-logo.png';
import NavMenu from './NavMenu';
import { NavLink } from 'react-router-dom';
//MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';

const useStyles = makeStyles((theme) => ({
	navbar: {
		flexGrow: 1,
		backgroundColor: '#EFF8FF',
		color: 'black',
		boxShadow: '0px 6px 12px 0px rgba(16, 30, 115, 0.06)'
	},
	toolbar: {
		justifyContent: 'space-between'
	},

	title: {
		flexGrow: 1
	},
	img: {
		height: '2em',
		paddingInlineStart: '1em'
	},

	currencySelect: {
		width: '3rem',
		marginRight: '1rem'
	},
	section: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	}
}));

export default function ButtonAppBar() {
	const { state: { language }, changeLanguage } = useContext(LanguageContext);
	const { state: { isLoggedIn, userAmIHCP } } = useContext(AuthContext);
	const [ currency, setCurrency ] = useState('dolar');
	const classes = useStyles();
	const handleChange = (event) => {
		changeLanguage(event.target.value);
	};
	const handleChangeCurrency = (event) => {
		setCurrency(event.target.value);
	};

	return (
		<div>
			<AppBar className={classes.navbar} position="static">
				<Toolbar className={classes.toolbar}>
					{userAmIHCP ? (
						<NavLink to="/in/patient/dashboard">
							<img src={logo} alt="Logo" className={classes.img} />
						</NavLink>
					) : (
						<NavLink to="/in/doctor/dashboard">
							<img src={logo} alt="Logo" className={classes.img} />
						</NavLink>
					)}
					<FormControl variant="outlined" className={classes.formControl}>
						<Select value={language} onChange={handleChange}>
							<MenuItem value={'en_US'}>English</MenuItem>
							<MenuItem value={'bg_BG'}>Bulgarian</MenuItem>
						</Select>
					</FormControl>
					<div className={classes.section}>
						<FormControl className={classes.formControl}>
							<Select
								className={classes.currencySelect}
								labelId="currency-select"
								value={currency}
								onChange={handleChangeCurrency}
								disableUnderline
							>
								<MenuItem value={'dolar'}>
									<AttachMoneyIcon />
								</MenuItem>
								<MenuItem value={'euro'}>
									<EuroSymbolIcon />
								</MenuItem>
							</Select>
						</FormControl>
						{isLoggedIn && <NavMenu />}
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}
