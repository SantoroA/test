import React from 'react';
import { useTranslation } from 'react-i18next';
//MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		flexDirection: 'column'
	},
	section: {
		marginTop: '2em'
	}
});

const TabMyEarnings = () => {
	const classes = useStyles();
	const { t , i18n} = useTranslation();
	return (
		<div>
			<Grid className={classes.root} container>
				<Paper className={classes.section}>
					<Typography>{t('My_Earnings.1')}</Typography>
				</Paper>
			</Grid>
		</div>
	);
};

export default TabMyEarnings;
