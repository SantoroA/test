import React from 'react';
import { NavLink } from 'react-router-dom';
import PatLayoutContainer from '../../components/layout/PatLayoutContainer';
import FormSearchDoctor from '../../components/groups/FormSearchDoctor';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
//icons
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles({
	title: {
		marginTop: '3rem',
		textAlign: 'center',
		fontWeight: 600
	},
	subtitle: {
		marginTop: '1rem',
		textAlign: 'center',
		fontWeight: 500,
		color: '#52575C',
		marginBottom: '2rem'
	},

	dateSearch: {
		padding: '15px',
		width: '43.5rem',
		marginLeft: '12%'
	},

	backButton: {
		textDecoration: 'none',
		display: 'flex',
		flexDirection: 'row',
		color: '#07B597',
		marginTop: '2rem',
		marginBottom: '1rem'
	},
	listContainer: {
		paddingRight: '2rem'
	}
});

const PatDoctorSearchScreen = () => {
	const classes = useStyles();
	return (
		<PatLayoutContainer>
			<Container maxWidth="lg">
				<NavLink to="/in/doctor/dashboard" className={classes.backButton}>
					<ArrowBackIcon />
					<Typography>Back to my profile</Typography>
				</NavLink>
				<Divider />
				<Typography variant="h4" className={classes.title}>
					Find your health professional now.
				</Typography>
				<Typography variant="h6" className={classes.subtitle}>
					Without any Location Barrier
				</Typography>
				<Container>
					<FormSearchDoctor />
				</Container>
			</Container>
		</PatLayoutContainer>
	);
};

export default PatDoctorSearchScreen;
