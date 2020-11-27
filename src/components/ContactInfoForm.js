import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import MuiPhoneInput from 'material-ui-phone-number';

const useStyles = makeStyles((theme) => ({
	container: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column'
	},
	paper: {
		padding: theme.spacing(4),
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		alignItems: 'center'
	},
	form: {
		width: '100%',
		justifyContent: 'center'
	},
	item: {
		padding: theme.spacing(1, 0)
	},
	submit: {
		width: '100%',
		margin: theme.spacing(3, 0, 2)
	},
	link: {
		borderWidth: 1,
		borderColor: 'black',
		textDecoration: 'none',
		padding: theme.spacing(1),
		borderRadius: 5
	},
	text: {
		marginTop: '0',
		textAlign: 'center'
	},
	socialMedia: {
		borderRadius: 15,
		height: 30,
		width: 30,
		padding: 20,
		minHeight: 0,
		minWidth: 0,
		fontSize: 20
	},
	redes: {
		marginTop: 20,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%'
	},
	gridContainer: {
		justifyContent: 'center'
	}
}));

const ContactInfoForm = ({ togglePasswordRecoveryOpen }) => {
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLasttName ] = useState('');
	const [ phoneNumber, setPhoneNumber ] = useState('');
	const [ birthday, setBirthday ] = useState('');
	const [ birthPlace, setbirthPlace ] = useState('');

	const classes = useStyles();

	return (
		<Container className={classes.container}>
			<Typography variant="h4">Contact Info</Typography>
			<Grid container className={classes.gridContainer}>
				<Grid item lg={6}>
					<Paper elevation={3} className={classes.paper}>
						<form onSubmit={() => {}} className={classes.form}>
							<Grid className={classes.item}>
								<TextField
									fullWidth
									type="text"
									required
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									label="First name"
									variant="outlined"
								/>
							</Grid>
							<Grid className={classes.item}>
								<TextField
									fullWidth
									required
									type="text"
									value={lastName}
									onChange={(e) => setLasttName(e.target.value)}
									label="Last name"
									variant="outlined"
								/>
							</Grid>
							<Grid className={classes.item}>
								<MuiPhoneInput
									fullWidth
									required
									value={phoneNumber}
									onChange={(e) => setPhoneNumber(e.value)}
									label="Phone Number"
									variant="outlined"
								/>
							</Grid>
							<Grid className={classes.item}>
								<TextField
									fullWidth
									required
									type="date"
									value={birthday}
									onChange={(e) => setBirthday(e.target.value)}
									label="Birthday"
									variant="outlined"
									InputLabelProps={{
										shrink: true
									}}
								/>
							</Grid>
							<Grid className={classes.item}>
								<TextField
									fullWidth
									required
									type="text"
									value={birthPlace}
									onChange={(e) => setbirthPlace(e.target.value)}
									label="Place of Birth"
									variant="outlined"
								/>
							</Grid>
							<Button type="submit" variant="contained" color="primary" className={classes.submit}>
								Update
							</Button>
						</form>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
};

export default ContactInfoForm;
