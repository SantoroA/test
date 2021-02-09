import React from 'react';
import useStyles from './style';
//CUSTOM UI
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//CUSTOM ICONS
import EmptyDocumentIcon from '../../customIcons/EmptyDocumentIcon';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';

const EmptyDocState = () => {
	const classes = useStyles();
	return (
		<PaperCustomShadow className={classes.emptyState}>
			<Typography color="textSecondary" variant="subtitle1">
				Save time! Documents uploaded to your doctor will appear here.
			</Typography>
			<EmptyDocumentIcon className={classes.icon} />
			<Typography className={classes.detail} variant="subtitle1">
				No Documents Added
			</Typography>
		</PaperCustomShadow>
	);
};

export default EmptyDocState;
