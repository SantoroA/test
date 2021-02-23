import React from 'react';
import useStyles from './style';
import { useTranslation } from 'react-i18next';
//CUSTOM UI
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//CUSTOM ICONS
import EmptyDocumentIcon from '../../customIcons/EmptyDocumentIcon';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';

const EmptyDocState = () => {
	const classes = useStyles();
	const { t } = useTranslation();
	return (
		<PaperCustomShadow className={classes.emptyState}>
			<Typography color="textSecondary" variant="subtitle1">
				{t('Save_time.1')}
			</Typography>
			<EmptyDocumentIcon className={classes.icon} />
			<Typography className={classes.detail} variant="subtitle1">
				{t('No_documents_added.1')}
			</Typography>
		</PaperCustomShadow>
	);
};

export default EmptyDocState;
