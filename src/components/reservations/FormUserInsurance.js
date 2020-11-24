import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	container: {
		padding: theme.spacing(4),
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		alignItems: 'center'
	}
}));

const FormUserInsurance = ({ step, nextStep, previousStep, insuranceType, setInsuranceType }) => {
	const classes = useStyles();
	return (
		<Container className={classes.container}>
			<Typography variant="h4">What insurance do you have?</Typography>
		</Container>
	);
};

export default FormUserInsurance;
