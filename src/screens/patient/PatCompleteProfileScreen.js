import React from 'react';
import PatLayoutContainer from '../../components/layout/PatLayoutContainer';
import { NavLink } from 'react-router-dom';
import FormEmailAndPassword from '../../components/groups/FormEmailAndPassword';
import FormContactInfo from '../../components/groups/FormContactInfo';
import { useTranslation } from 'react-i18next';
//MATERIAL UI
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//icons
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles({
	backButton: {
		textDecoration: 'none',
		display: 'flex',
		flexDirection: 'row',
		color: '#07B597',
		marginTop: '2rem',
		marginBottom: '1rem'
	},
	section: {
		marginTop: '1rem'
	}
});

const PatCompleteProfileScreen = () => {
	const classes = useStyles();
	const { t } = useTranslation();
	return (
		<PatLayoutContainer>
			<Container maxWidth="md">
				<NavLink to="/in/doctor/dashboard" className={classes.backButton}>
					<ArrowBackIcon />
					<Typography>{t('Back_to_profile.1')}</Typography>
				</NavLink>
				<Divider />
				<Grid container className={classes.section}>
					<FormEmailAndPassword />
				</Grid>
				<Grid container className={classes.section}>
					<FormContactInfo />
				</Grid>
			</Container>
		</PatLayoutContainer>
	);
};

export default PatCompleteProfileScreen;
