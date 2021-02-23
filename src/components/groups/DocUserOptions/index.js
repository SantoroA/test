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

//QUERY MIN PRICE AND REVIEWS (NUMBER OF REVIEWS AND RATING)

const DocUserOptions = ({ setIsPublic, isPublic }) => {
	const classes = useStyles();

	const handleChange = () => {
		setIsPublic(!isPublic);
	};
	const { t, i18n } = useTranslation();
	return (
		<Paper elevation={0} className={classes.root}>
			{/* to be dynamic later, the doc should click on reviews */}
			<div className={classes.reviewWrapper}>
				<Rating name="read-only" value={0} readOnly />
				<Typography color="textSecondary" variant="body2">
					(0 {t('Reviews.1')})
				</Typography>
			</div>

			<ButtonFilled>
				<div className={classes.button}>
					<Typography variant="body1" className={classes.price}>
						{t('Price_from.1')}
					</Typography>
					<Typography variant="h5">LV 00.00</Typography>
				</div>
			</ButtonFilled>
			<FormGroup row className={classes.switchWrapper}>
				<FormControlLabel
					control={
						<Switch checked={isPublic} onChange={handleChange} name="checkedPrivate" color="primary" />
					}
					label={
						<div>
							{isPublic ? (
								<Typography color="textSecondary" variant="body2">
									Switch to private profile
								</Typography>
							) : (
								<Typography color="textSecondary" variant="body2">
									Switch to public profile
								</Typography>
							)}
						</div>
					}
				/>
			</FormGroup>
		</Paper>
	);
};

export default DocUserOptions;
