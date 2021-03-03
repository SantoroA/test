import React from 'react';
import useStyles from './style';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { REVIEW_QUERY } from '../../../context/GraphQl/graphQlQuery';
import Loader from 'react-loader-spinner';
//CUSTOM ICONS
import ErrorIcon from '../../customIcons/ErrorIcon';
//MATERIAL UI
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Container from '@material-ui/core/Container';

const DocUserOptions = ({ setIsPublic, isPublic, docId, isHCP }) => {
	const classes = useStyles();
	const { loading, error, data } = useQuery(REVIEW_QUERY, {
		variables: { id: docId }
	});

	const handleChange = () => {
		setIsPublic(!isPublic);
	};
	const { t } = useTranslation();

	return (
		<Paper elevation={0} className={classes.root}>
			{/* to be dynamic later, the doc should click on reviews */}
			{loading && (
				<Container className={classes.emptyState}>
					<Loader type="TailSpin" color="primary" height={80} width={80} />
				</Container>
			)}
			{error && (
				<div className={classes.errorContainer}>
					<ErrorIcon className={classes.icon} />
					<Typography className={classes.text} color="textSecondary" variant="body1">
						This information is not available. Please try again later.
					</Typography>
				</div>
			)}
			{data && (
				<div>
					<div className={classes.reviewWrapper}>
						<Rating
							name="read-only"
							value={data.doctorReviewCard.profileHCPid.rating.averageRating}
							readOnly
						/>
						<Typography color="textSecondary" variant="body2">
							({data.doctorReviewCard.profileHCPid.rating.receivedRating} {t('Reviews.1')})
						</Typography>
					</div>

					<Box className={classes.priceContainer}>
						<Typography variant="body1" className={classes.price}>
							{t('Price_from.1')}
						</Typography>
						<Typography variant="h5">LV {data.doctorReviewCard.amount}.00</Typography>
					</Box>
				</div>
			)}
			{isHCP && (
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
			)}
		</Paper>
	);
};

export default DocUserOptions;
