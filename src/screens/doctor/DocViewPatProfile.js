import React from 'react';
import DocLayoutContainer from '../../components/layout/DocLayoutContainer';
import { useLocation, NavLink } from 'react-router-dom';
import CardMyProfile from '../../components/groups/CardMyProfile';
//MATERIAL UI
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	backButton: {
		textDecoration: 'none',
		display: 'flex',
		flexDirection: 'row',
		color: '#07B597',
		marginTop: '2rem',
		marginBottom: '1rem'
	},
	wrapper: {
		display: 'flex',
		flexDirection: 'column'
	},
	section: {
		display: 'flex',
		flexDirection: 'row-reverse',
		marginTop: '1rem'
	},
	subtitle: {
		fontWeight: 'bold'
	}
});

const DocViewPatProfile = () => {
	const classes = useStyles();
	const location = useLocation();
	const { id } = location.state;
	console.log(id);
	return (
		<DocLayoutContainer>
			<Container maxWidth="md">
				<NavLink to="/in/doctor/dashboard" className={classes.backButton}>
					<ArrowBackIcon />
					<Typography>Back to my patients</Typography>
				</NavLink>
				<Divider />
				<Grid container className={classes.wrapper}>
					<Grid item className={classes.section}>
						<Typography variant="h6" className={classes.subtitle}>
							Patient Information
						</Typography>
					</Grid>
					<Grid item className={classes.section}>
						<CardMyProfile />
					</Grid>
				</Grid>
			</Container>
		</DocLayoutContainer>
	);
};

export default DocViewPatProfile;
