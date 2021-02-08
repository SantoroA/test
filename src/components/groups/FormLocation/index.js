import React, { useState, useContext } from 'react';
import { Context as DocProfileContext } from '../../../context/DocProfileContext';
import { Context as AuthContext } from '../../../context/AuthContext';
//CUSTOM UI
import ButtonFilled from '../../customUi/ButtonFilled';
import ButtonOutlined from '../../customUi/ButtonOutlined';
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import useStyles from './style';

const FormLocation = () => {
	const { updateLocationInfo, state } = useContext(DocProfileContext);
	const { state: { userId } } = useContext(AuthContext);
	// const userId = '5fe8b0c48bef090026e253b7';
	const [ country, setCountry ] = useState(state.country);
	const [ city, setCity ] = useState(state.city);
	const [ zipcode, setZipcode ] = useState(state.zipcode);
	const [ street, setStreet ] = useState(state.street);
	const [ num, setNum ] = useState(state.num);
	const [ isDisabled, setIsDisabled ] = useState(true);
	const classes = useStyles();

	const handleSubmit = () => {
		updateLocationInfo({
			id: userId,
			country,
			city,
			zipcode,
			street,
			num
		});
	};

	const resetState = () => {
		setCountry(state.country);
		setCity(state.city);
		setZipcode(state.zipcode);
		setStreet(state.street);
		setNum(state.num);
	};

	return (
		<Container className={classes.container}>
			<PaperCustomShadow className={classes.paper}>
				<Grid container className={classes.gridContainer}>
					<Grid item className={classes.title}>
						<Typography variant="h6">Location</Typography>
						<IconButton onClick={() => setIsDisabled(false)}>
							<EditIcon />
						</IconButton>
					</Grid>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit();
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
									type="text"
									value={zipcode}
									onChange={(e) => setZipcode(e.target.value)}
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
											resetState();
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
