import React from 'react';
import DocProfileCard from '../../components/groups/DocProfileCard';
import DocLayoutContainer from '../../components/layout/DocLayoutContainer';
import DocDashboardTabs from '../../components/layout/DocDashboardTabs';
import DocUserOptions from '../../components/groups/DocUserOptions';
//MATEIAL UI
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	userInfo: {
		justifyContent: 'center',
		padding: '2rem'
	},
	userOptions: {
		paddingLeft: '2rem'
	}
});

const DocDashboardScreen = () => {
	const classes = useStyles();
	return (
		<DocLayoutContainer>
			<Grid container className={classes.userInfo}>
				<Grid item lg={5} md={8} xs={12}>
					<DocProfileCard />
				</Grid>
				<Grid item lg={3} md={4} xs={12} className={classes.userOptions}>
					<DocUserOptions />
				</Grid>
			</Grid>
			<Divider variant="middle" />
			<DocDashboardTabs />
		</DocLayoutContainer>
	);
};

export default DocDashboardScreen;
