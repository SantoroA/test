import React, { useState } from 'react';
import dianurseApi from '../../api/dianurseApi';

//CUSTOM UI
import ButtonFilled from '../customUi/ButtonFilled';
import ButtonOutlined from '../customUi/ButtonOutlined';
import PaperCustomShadow from '../customUi/PaperCustomShadow';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	container: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column'
	},
	paper: {
		width: '100%',
		padding: '1.5rem',
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		alignItems: 'center'
	},
	gridContainer: {
		justifyContent: 'center'
	},
	form: {
		width: '100%',
		justifyContent: 'center'
	},

	title: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '0.5rem'
	},
	buttons: {
		marginTop: '1.5rem',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	button: {
		padding: '0.5rem'
	},

	input: {
		padding: '0.5rem'
	}
});

const FormLocation = () => {
	const [ country, setCountry ] = useState('');
	const [ city, setCity ] = useState('');
	const [ zipCode, setZipCode ] = useState('');
	const [ street, setStreet ] = useState('');
	const [ num, setNum ] = useState('');
	const [ isDisabled, setIsDisabled ] = useState(true);
	const classes = useStyles();

	const handleSubmit = async() => {
	    let userInfo = {
			 id : '5fe8b0c48bef090026e253b7',
			 country,
			 city,
			 zipCode,
			 street,
			 num,
			 form: 9
		 }
		try {
		 	const response = await dianurseApi.put('/profile/doctor/completeprofile', {
		 		userInfo
		 	})

		 } catch (err){
		 	console.log(err.message);
		 }
	}

	return (
		<Container fullWidth className={classes.container}>
			<PaperCustomShadow className={classes.paper}>
				<Grid container className={classes.gridContainer}>
					<Grid item className={classes.title}>
						<Typography variant="h6">Location</Typography>
						<IconButton>
							<EditIcon onClick={() => setIsDisabled(false)} />
						</IconButton>
					</Grid>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit()
							setIsDisabled(true);
						}}
						className={classes.form}
					>
						<Grid container>
							<Grid item xs={12} className={classes.input}>
								<TextField
									fullWidth
									disabled={isDisabled}
									type="text"
									value={country}
									onChange={(e) => setCountry(e.target.value)}
									label="Country"
									variant="outlined"
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<LocationOnIcon />
											</InputAdornment>
										)
									}}
								/>
							</Grid>
							<Grid xs={12} sm={6} item className={classes.input}>
								<TextField
									fullWidth
									disabled={isDisabled}
									type="text"
									value={city}
									onChange={(e) => setCity(e.target.value)}
									label="City"
									variant="outlined"
								/>
							</Grid>
							<Grid xs={12} sm={6} item className={classes.input}>
								<TextField
									fullWidth
									disabled={isDisabled}
									type="number"
									value={zipCode}
									onChange={(e) => setZipCode(e.target.value)}
									label="Zip Code"
									variant="outlined"
								/>
							</Grid>
							<Grid xs={12} sm={6} item className={classes.input}>
								<TextField
									fullWidth
									disabled={isDisabled}
									type="text"
									value={street}
									onChange={(e) => setStreet(e.target.value)}
									label="Street"
									variant="outlined"
								/>
							</Grid>
							<Grid xs={12} sm={6} item className={classes.input}>
								<TextField
									fullWidth
									disabled={isDisabled}
									type="number"
									value={num}
									onChange={(e) => setNum(e.target.value)}
									label="Apt/Suite/Door"
									variant="outlined"
								/>
							</Grid>
						</Grid>

						{isDisabled ? null : (
							<Grid container className={classes.buttons}>
								<Grid item xs={6} className={classes.button}>
									<ButtonOutlined
										onClick={() => {
											setIsDisabled(true);
											setCountry('');
											setCity('');
										}}
										fullWidth
										variant="outlined"
									>
										Cancel
									</ButtonOutlined>
								</Grid>
								<Grid item xs={6} className={classes.button}>
									<ButtonFilled type="submit" variant="contained" color="primary" fullWidth>
										Update
									</ButtonFilled>
								</Grid>
							</Grid>
						)}
					</form>
				</Grid>
			</PaperCustomShadow>
		</Container>
	);
};

export default FormLocation;
