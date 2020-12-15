import React from 'react';
import PatLayoutContainer from '../../components/layout/PatLayoutContainer';

import DoctorSearch from '../../components/layout/FormFindDoctor';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	title: {
		marginTop: '20px',
		textAlign: 'center'
	},
	content: {
		marginTop: 80
	}
});

const PatDoctorSearchScreen = () => {
	const classes = useStyles();

	return (
		<PatLayoutContainer>
			<Typography variant="h4" className={classes.title}>
				Find your health professional now.
			</Typography>
			<Typography variant="h6" className={classes.title}>
				Without any Location Barrier
			</Typography>
			<div className={classes.content}>
				<DoctorSearch />
			</div>
		</PatLayoutContainer>
	);
};

export default PatDoctorSearchScreen;
