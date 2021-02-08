import React from 'react';
import useStyles from './style';
//CUSTOM UI
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//CUSTOM ICONS
import EmptyCalendarIcon from '../../customIcons/EmptyCalendarIcon';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';

const EmptyAppState = () => {
	const classes = useStyles();
	return (
		<PaperCustomShadow className={classes.emptyState}>
			<Typography color="textSecondary" variant="subtitle1">
				Start by updating your profile to be seen by patients!
			</Typography>
			<EmptyCalendarIcon className={classes.icon} />
			<Typography className={classes.detail} variant="subtitle1">
				No Appointments Scheduled
			</Typography>
		</PaperCustomShadow>
	);
};

export default EmptyAppState;
