import React, { useEffect, useState, useContext } from 'react';
import { Context as SearchDoctorContext } from '../../context/SearchDoctorContext';
import { Context as AuthContext } from '../../context/AuthContext';
//CUSTOM UI
import TextInputRounder from '../customUi/TextInputRounder';
import ButtonIcon from '../customUi/ButtonIcon';
import FilterIcon from '../customIcons/FilterIcon';
import PaperCustomShadow from '../customUi/PaperCustomShadow';
//MATERIAL UI
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';

import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
	formControl: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		width: '100%'
	},
	input: {
		padding: '1rem'
	},
	submit: {
		width: '100%',
		height: '100%'
	},
	timeZone: {
		padding: '0.4rem',
		marginTop: '1.5rem',
		backgroundColor: '#D7FEF1',
		marginBottom: '1.5rem'
	},
	timeZoneForm: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},

	filter: {
		marginTop: '1.5rem',
		padding: '1rem',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	filterContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
	}
});
const FormSearchDoctor = () => {
	const [ timezone, setTimezone ] = useState('Eastern Time');
	const [ nameZone, setNameZone ] = useState('New York, United States');
	const [ typeOfHCP, setTypeOfHCP ] = useState('Cardiologist');
	const [ date, setDate ] = useState('');
	// const { state: {userId} } = useContext(AuthContext);
	const userId = '5fe8b0c48bef090026e253b7';
	const { getDoctorList, state: { doctors, allSpecialty } } = useContext(SearchDoctorContext);
	const classes = useStyles();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('submit', typeOfHCP);
		getDoctorList({ typeOfHCP, date });
	};

	useEffect(() => {
		const date = new Date();
		const dateAsString = date.toString();
		const timezone = dateAsString.match(/\(([^\)]+)\)$/)[1];
		const nameTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		setTimezone(timezone);
		setNameZone(nameTimeZone);
	});
	return (
		<div>
			<Grid className={classes.root} container>
				<form className={classes.formControl} onSubmit={handleSubmit}>
					<Grid item xs={4} className={classes.input}>
						<TextInputRounder
							fullWidth
							id="Speciality"
							label="Speciality"
							select
							variant="outlined"
							value={typeOfHCP}
							onChange={(e) => setTypeOfHCP(e.target.value)}
							InputLabelProps={{
								shrink: true
							}}
						>
							{allSpecialty !== 'undefined' ? (
								allSpecialty.map((el) => {
									return <MenuItem value={el}>{el}</MenuItem>;
								})
							) : null}
						</TextInputRounder>
					</Grid>
					<Grid item xs={2} className={classes.input}>
						<TextInputRounder
							fullWidth
							id="date"
							label="Date"
							type="date"
							variant="outlined"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							InputLabelProps={{
								shrink: true
							}}
						/>
					</Grid>
					<Grid item xs={1} className={classes.input}>
						<ButtonIcon className={classes.submit} type="submit">
							<SearchIcon />
						</ButtonIcon>
					</Grid>
				</form>
			</Grid>
			<Divider orientation="horizontal" />

			<PaperCustomShadow className={classes.timeZone}>
				<FormControl className={classes.timeZoneForm}>
					<Typography>
						We believe you are in - {timezone} ({nameZone}) -
					</Typography>
					<TextInputRounder
						id="time"
						type="time"
						placeholder="CHANGE THE TIME ZONE"
						multiline
						InputLabelProps={{
							shrink: true
						}}
					/>
				</FormControl>
			</PaperCustomShadow>
			<Divider orientation="horizontal" />
			<Grid container className={classes.filterContainer}>
				<Grid item xs={9}>
					<PaperCustomShadow className={classes.filter}>
						<FilterIcon style={{ fontSize: '3rem', color: 'gray' }} />
						<FormControl>
							<TextInputRounder
								id="time"
								type="time"
								placeholder="Desired time"
								variant="outlined"
								style={{
									width: 200
								}}
								InputLabelProps={{
									shrink: true
								}}
							/>
						</FormControl>
						<FormControl>
							<TextInputRounder
								variant="outlined"
								label="Price"
								style={{
									width: 90
								}}
							/>
						</FormControl>
						<FormControl>
							<TextInputRounder
								variant="outlined"
								label="More filters"
								style={{
									width: 130
								}}
							/>
						</FormControl>
						<FormControl>
							<TextInputRounder
								variant="outlined"
								label="Rating"
								style={{
									width: 90
								}}
							/>
						</FormControl>
					</PaperCustomShadow>
				</Grid>
			</Grid>
		</div>
	);
};

export default FormSearchDoctor;
