import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Context as SearchDoctorContext } from '../../context/SearchDoctorContext';
import PatLayoutContainer from '../../components/layout/PatLayoutContainer';
import FormSearchDoctor from '../../components/groups/FormSearchDoctor';
import dianurseApi from '../../api/dianurseApi';
import DoctorList from '../../components/groups/DoctorList';
import Calendar from '../../components/customUi/Calendar';
import MessageDialog from '../../components/groups/MessageDialog';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
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
	content: {
		marginTop: '2rem'
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
	const { state: { dialogMessage, dialogOpen, formatDate }, closeDialog } = useContext(SearchDoctorContext);
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
					<div className={classes.content}>
						<Box className={classes.dateSearch}>
							<Typography variant="h5" color="textSecondary" component="p">
								{formatDate}
							</Typography>
						</Box>
						<Grid container>
							<Grid item md={9} className={classes.listContainer}>
								
								<DoctorList />
								
							</Grid>
							<Grid item md={3}>
								<Calendar />
							</Grid>
						</Grid>
					</div>
				</Container>
				<MessageDialog open={dialogOpen} message={dialogMessage} close={closeDialog} />
			</Container>
		</PatLayoutContainer>
	);
};

export default PatDoctorSearchScreen;
