import React from 'react';
import useStyles from './style';
import { useTranslation } from 'react-i18next';
//MATERIAL UI
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
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
	const { t } = useTranslation();

	const info = {
		averageRating: 4,
		numberOfRatings: '45',
		minPrice: '75'
	};

	return (
		<Paper elevation={0} className={classes.root}>
			{/* to be dynamic later, the doc should click on reviews */}
			<div className={classes.reviewWrapper}>
				<Rating name="read-only" value={info.averageRating} readOnly />
				<Typography color="textSecondary" variant="body2">
					({info.numberOfRatings} {t('Reviews.1')})
				</Typography>
			</div>

			<Box className={classes.priceContainer}>
				<Typography variant="body1" className={classes.price}>
					{t('Price_from.1')}
				</Typography>
				<Typography variant="h5">LV {info.minPrice}.00</Typography>
			</Box>

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
