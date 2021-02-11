import React, { useContext, useState } from 'react';
import { Context as AuthContext } from '../../../context/AuthContext';
import useStyles from './style';
import { useTranslation } from 'react-i18next';
//CUSTOM UI
import ButtonFilled from '../../customUi/ButtonFilled';
//MATERIAL UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const DocUserOptions = () => {
	const classes = useStyles();
	const [ state, setState ] = useState({
		checkedPublic: false,
		checkedPrivate: true
	});

	const { state: { userName } } = useContext(AuthContext);

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};
	const { t , i18n} = useTranslation();
	return (
		<Paper elevation={0} className={classes.root}>
			{/* to be dynamic later, the doc should click on reviews */}

			<Rating name="read-only" value={0} readOnly />
			<Typography variant="subtitle1">(0 {t('Reviews.1')})</Typography>

			<ButtonFilled>
				<div className={classes.button}>
					<Typography variant="body1" className={classes.price}>
						{t('Price_from.1')}
					</Typography>
					<Typography variant="h5">LV 00.00</Typography>
				</div>
			</ButtonFilled>
			<FormGroup row>
				<FormControlLabel
					control={
						<Switch
							checked={state.checkedPrivate}
							onChange={handleChange}
							name="checkedPrivate"
							color="primary"
						/>
					}
					label={t("Private_profile.1")}
				/>
			</FormGroup>
		</Paper>
	);
};

export default DocUserOptions;
