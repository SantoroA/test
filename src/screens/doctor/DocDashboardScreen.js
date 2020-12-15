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
		margin: '2rem'
	},
	userOptions: {
		marginLeft: '6rem'
	}
});

const DocDashboardScreen = () => {
	const classes = useStyles();
	return (
		<DocLayoutContainer>
			<Grid container className={classes.userInfo}>
				<Grid item md={4} xs={9}>
					<DocProfileCard />
				</Grid>
				<Grid item md={2} xs={2} className={classes.userOptions}>
					<DocUserOptions />
				</Grid>
			</Grid>
			<Divider variant="middle" />
			<DocDashboardTabs />
		</DocLayoutContainer>
	);
};

export default DocDashboardScreen;
