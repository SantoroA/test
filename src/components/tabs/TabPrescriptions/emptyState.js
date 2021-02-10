import React from 'react';
import useStyles from './style';
//CUSTOM UI
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//CUSTOM ICONS
import EmptyPrescriptionIcon from '../../customIcons/EmptyPrescriptionIcon';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';

const EmptyPrescState = () => {
	const classes = useStyles();
	return (
		<PaperCustomShadow className={classes.emptyState}>
			<Typography color="textSecondary" variant="subtitle1">
				Here you will see your prescriptions and health recommendations
			</Typography>
			<EmptyPrescriptionIcon className={classes.icon} />
			<Typography className={classes.detail} variant="subtitle1">
				No Prescriptions Added
			</Typography>
		</PaperCustomShadow>
	);
};

export default EmptyPrescState;
