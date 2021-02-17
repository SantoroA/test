import React, { useContext, useState } from 'react';
import { Context as LanguageContext } from '../../../context/LanguageContext';
import { Context as AuthContext } from '../../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import logo from '../../../assets/dianurse-logo.png';
import NavMenu from '../NavMenu';
import { NavLink } from 'react-router-dom';
import useStyles from './style';
//MATERIAL UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
//MATERIAL UI ICONS
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';

export default function Navbar() {
	const { state: { language }, changeLanguage } = useContext(LanguageContext);
	const { state: { isLoggedIn, userAmIHCP } } = useContext(AuthContext);
	const [ currency, setCurrency ] = useState('dolar');
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
	// console.log(isMobile);
	const classes = useStyles();
	const { t , i18n} = useTranslation();
	
	const handleClick = (lang) => {
		// changeLanguage(event.target.value);
		i18n.changeLanguage(lang);
		console.log(" THIS IS THE LANGUAGE", lang);
	};
	const handleChangeCurrency = (event) => {
		setCurrency(event.target.value);
	};

	

	return (
		<div>
			<AppBar className={classes.navbar} style={{ backgroundColor: '#EFF8FF' }} position="static">
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
					
					

					{ /*<button onClick={() => handleClick('en')}>English</button>
					<button onClick={() => handleClick('bg')}>Bulgarian</button> */}
					 <FormControl variant="outlined" className={classes.formControl}>
						<Select  >
							<MenuItem value={'en_US'} onClick={() => handleClick('en')}>English</MenuItem>
							<MenuItem value={'bg_BG'} onClick={() => handleClick('bg')}>Bulgarian</MenuItem>
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
