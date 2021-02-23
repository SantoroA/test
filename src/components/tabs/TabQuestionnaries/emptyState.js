import React from 'react';
import useStyles from './style';
import { useTranslation } from 'react-i18next';
//CUSTOM UI
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//CUSTOM ICONS
import EmptySurveyIcon from '../../customIcons/EmptySurveyIcon';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';

const EmptySurveyState = () => {
	const classes = useStyles();
	const { t } = useTranslation();
	return (
		<PaperCustomShadow className={classes.emptyState}>
			<Typography color="textSecondary" variant="subtitle1">
				{t('Here_you_will_see_surveys.1')}
			</Typography>
			<EmptySurveyIcon className={classes.icon} />
			<Typography className={classes.detail} variant="subtitle1">
				{t('No_Surveys_Added.1')}
			</Typography>
		</PaperCustomShadow>
	);
};

export default EmptySurveyState;
