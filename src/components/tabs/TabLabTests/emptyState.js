import React from 'react';
import useStyles from './style';
import { useTranslation } from 'react-i18next';
//CUSTOM UI
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//CUSTOM ICONS
import EmptyLabTestsIcon from '../../customIcons/EmptyLabTestsIcon';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';

const EmptyLabTestState = () => {
	const classes = useStyles();
	const { t } = useTranslation();
	return (
		<PaperCustomShadow className={classes.emptyState}>
			<Typography color="textSecondary" variant="subtitle1">
				{t('Here_you_will_see_LabTests.1')}
			</Typography>
			<EmptyLabTestsIcon className={classes.icon} />
			<Typography className={classes.detail} variant="subtitle1">
				{t('No_LabTests_Added.1')}
			</Typography>
		</PaperCustomShadow>
	);
};

export default EmptyLabTestState;
