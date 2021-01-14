import React from 'react';
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

const TabQuestionnaries = () => {
	const classes = useStyles();
	return (
		<div>
			<Grid className={classes.root} container>
				<Paper className={classes.section}>
					<Typography>My Surveys</Typography>
				</Paper>
			</Grid>
		</div>
	);
};

export default TabQuestionnaries;
