import React from 'react';
import useStyles from './style';
//CUSTOM UI
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//CUSTOM ICONS
import EmptySurveyIcon from '../../customIcons/EmptySurveyIcon';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';

const EmptySurveyState = () => {
	const classes = useStyles();
	return (
		<PaperCustomShadow className={classes.emptyState}>
			<Typography color="textSecondary" variant="subtitle1">
				Here you will see questionnaries and surveys from your doctor.
			</Typography>
			<EmptySurveyIcon className={classes.icon} />
			<Typography className={classes.detail} variant="subtitle1">
				No Surveys Added
			</Typography>
		</PaperCustomShadow>
	);
};

export default EmptySurveyState;
