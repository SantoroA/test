import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Context as AuthContext } from '../../context/AuthContext';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

// theming
const useStyles = makeStyles({
	body: {
		display: 'flex',
		alignItems: 'center',
		backgroundColor: '#d8eaf4',
		marginTop: '1.5em',
		justifyContent: 'space-around'
	},
	text: {
		justifyContent: 'center',
		marginTop: '2em',
		marginBottom: '1em'
	},
	avatar: {
		marginRight: '1em',
		marginTop: '3.5em'
	}
});

const PatDashUserInfo = () => {
	const classes = useStyles();

	const { state: { userName } } = useContext(AuthContext);

	return (
		<div>
			<Grid container flexDirection="row" className={classes.body}>
				<Grid item>
					<Avatar className={classes.avatar} />
					{/* fetch the foto as url- it's received from the back-end  */}
					{/* get data request and display the response from the back-end on the page */}
					<Typography variant="h4" className={classes.text}>
						{userName}
					</Typography>
				</Grid>
				<Grid item flexDirection="column" className={classes.secondBlock}>
					<Grid item>
						<Button variant="contained" color="primary">
							Search for a Doctor
						</Button>
					</Grid>
					<Grid item>
						<Button variant="outlined" color="primary">
							Meet the assistant
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default PatDashUserInfo;
