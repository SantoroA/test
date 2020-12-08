import React, { useContext, useState } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
//CUSTOM UI
import ButtonFilled from '../customUi/ButtonFilled';
//MATERIAL UI
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
			<Grid container className={classes.body}>
				<Grid item>
					<Avatar className={classes.avatar} />
					{/* fetch the foto as url- it's received from the back-end  */}
					{/* get data request and display the response from the back-end on the page */}
					<Typography variant="h4" className={classes.text}>
						{userName}
					</Typography>
				</Grid>

				<Grid item className={classes.secondBlock}>
					<Grid item>
						<ButtonFilled variant="contained">Search for a Doctor</ButtonFilled>
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
