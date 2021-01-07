import React from 'react';
import FormServiceAvailability from '../groups/FormServiceAvailability';
import FormTimeSlots from '../groups/FormTimeSlots';
//MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		flexDirection: 'column'
	},
	section: {
		marginTop: '2em'
	}
});

const TabAvailability = () => {
	const classes = useStyles();
	return (
		<div>
			<Grid className={classes.root} container>
				<Paper className={classes.section}>
					<FormServiceAvailability />
				</Paper>
				{/* <Paper className={classes.section}>
					<FormTimeSlots />
				</Paper> */}
			</Grid>
		</div>
	);
};

export default TabAvailability;
