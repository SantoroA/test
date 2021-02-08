import React from 'react';
import useStyles from './style';
//CUSTOM UI
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//CUSTOM ICONS
import EmptyDoctorIcon from '../../customIcons/EmptyDoctorIcon';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';

const EmptyDocState = () => {
	const classes = useStyles();
	return (
		<PaperCustomShadow className={classes.emptyState}>
			<EmptyDoctorIcon className={classes.iconBig} />
			<Typography className={classes.detail} variant="subtitle1">
				We're sorry but we couldn't find a match. Please try another search
			</Typography>
		</PaperCustomShadow>
	);
};
export default EmptyDocState;
