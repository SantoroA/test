import React, { useContext, useState } from 'react';
import { Context as AuthContext } from '../../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import logo from '../../../assets/dianurse-logo.png';
import NavMenu from '../NavMenu';
import { NavLink } from 'react-router-dom';
import useStyles from './style';
//CUSTOM ICONS
import FlagUk from '../../customIcons/FlagUk';
import FlagBg from '../../customIcons/FlagBg';
import FlagBr from '../../customIcons/FlagBr';
import FlagMk from '../../customIcons/FlagMk';
import FlagDe from '../../customIcons/FlagDe';
//MATERIAL UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//MATERIAL UI ICONS
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';

export default function Navbar() {
	const { state: { isLoggedIn, userAmIHCP } } = useContext(AuthContext);
	const [ currency, setCurrency ] = useState('dolar');
	const classes = useStyles();
	const { i18n } = useTranslation();
	const [ lang, setLang ] = useState('en_US');

	const handleChange = (event) => {
		setLang(event.target.value);
	};
	const handleClick = (lang) => {
		i18n.changeLanguage(lang);
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

					<div className={classes.section}>
						<FormControl className={classes.formControl}>
							<Select
								className={classes.countrySelect}
								disableUnderline
								value={lang}
								onChange={handleChange}
							>
								<MenuItem value={'en_US'} onClick={() => handleClick('en')}>
									<FlagUk />
								</MenuItem>
								<MenuItem value={'bg_BG'} onClick={() => handleClick('bg')}>
									<FlagBg />
								</MenuItem>
								<MenuItem value={'pt_BR'} onClick={() => handleClick('pt')}>
									<FlagBr />
								</MenuItem>
								<MenuItem value={'mk_MK'} onClick={() => handleClick('mk')}>
									<FlagMk />
								</MenuItem>
								<MenuItem value={'de_DE'} onClick={() => handleClick('de')}>
									<FlagDe />
								</MenuItem>
							</Select>
						</FormControl>
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
