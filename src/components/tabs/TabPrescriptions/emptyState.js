import React from 'react';
import useStyles from './style';
import { useTranslation } from 'react-i18next';
//CUSTOM UI
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//CUSTOM ICONS
import EmptyPrescriptionIcon from '../../customIcons/EmptyPrescriptionIcon';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';

const EmptyPrescState = () => {
	const classes = useStyles();
	const { t , i18n} = useTranslation();
	return (
		<PaperCustomShadow className={classes.emptyState}>
			<Typography color="textSecondary" variant="subtitle1">
			{t("Here_you_will_see_prescriptions.1")}
			</Typography>
			<EmptyPrescriptionIcon className={classes.icon} />
			<Typography className={classes.detail} variant="subtitle1">
			{t("No_Prescriptions_Added.1")}
			</Typography>
		</PaperCustomShadow>
	);
};

export default EmptyPrescState;
