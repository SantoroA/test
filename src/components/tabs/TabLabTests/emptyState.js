import React from 'react';
import useStyles from './style';
//CUSTOM UI
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//CUSTOM ICONS
import EmptyLabTestsIcon from '../../customIcons/EmptyLabTestsIcon';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';

const EmptyLabTestState = () => {
	const classes = useStyles();
	return (
		<PaperCustomShadow className={classes.emptyState}>
			<Typography color="textSecondary" variant="subtitle1">
				Here you will see your lab tests results.
			</Typography>
			<EmptyLabTestsIcon className={classes.icon} />
			<Typography className={classes.detail} variant="subtitle1">
				No Lab tests Added
			</Typography>
		</PaperCustomShadow>
	);
};

export default EmptyLabTestState;
