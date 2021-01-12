import React, { useState, useContext } from 'react';
import { Context as DocProfileContext } from '../../../context/DocProfileContext';
// import { Context as AuthContext } from '../../context/AuthContext';
import useStyles from './style';
import dianurseApi from '../../../api/dianurseApi';
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
import CardTravelIcon from '@material-ui/icons/CardTravel';

const FormExperience = () => {
	const { updateExperience, state } = useContext(DocProfileContext);
	const userId = '5fe8b0c48bef090026e253b7';
	// const { state: {userId} } = useContext(AuthContext);
	const [ yearsExperience, setYearsExperience ] = useState(state.yearsExperience);
	const [ yearsSpecialist, setYearsSpecialist ] = useState(state.yearsSpecialist);

	const [ isDisabled, setIsDisabled ] = useState(true);
	const classes = useStyles();
	console.log(yearsExperience);
	const handleSubmit = () => {
		updateExperience({
			id: userId,
			yearsExperience,
			yearsSpecialist
		});
	};

	return (
		<Container className={classes.container}>
			<PaperCustomShadow className={classes.paper}>
				<Grid container className={classes.gridContainer}>
					<Grid item className={classes.title}>
						<Typography variant="h6">Experience</Typography>
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
						<Grid container className={classes.item}>
							<Grid className={classes.input} item xs={6}>
								<TextField
									fullWidth
									disabled={isDisabled}
									type="number"
									value={yearsExperience}
									onChange={(e) => setYearsExperience(e.target.value)}
									label="Years of experience"
									variant="outlined"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<CardTravelIcon />
											</InputAdornment>
										)
									}}
								/>
							</Grid>
							<Grid xs={6} item className={classes.input}>
								<TextField
									fullWidth
									disabled={isDisabled}
									type="number"
									value={yearsSpecialist}
									onChange={(e) => setYearsSpecialist(e.target.value)}
									label="Years as a specialist"
									variant="outlined"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<CardTravelIcon />
											</InputAdornment>
										)
									}}
								/>
							</Grid>
						</Grid>

						{isDisabled ? null : (
							<Grid container className={classes.buttons}>
								<Grid item xs={6} className={classes.button}>
									<ButtonOutlined
										onClick={() => {
											setIsDisabled(true);
											setYearsExperience(state.yearsExperience);
											setYearsSpecialist(state.yearsSpecialist);
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

export default FormExperience;
