import React, { useEffect, useState, useContext } from 'react';
import { Context as SearchDoctorContext } from '../../context/SearchDoctorContext';
import { Context as AuthContext } from '../../context/AuthContext';
import DialogFilter from './DialogFilter';
//CUSTOM UI
import TextInputRounder from '../customUi/TextInputRounder';
import ButtonIcon from '../customUi/ButtonIcon';
import ButtonFilterOption from '../customUi/ButtonFilterOption';
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
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column'
	},

	input: {
		padding: '1rem'
	},
	submit: {
		width: '100%',
		height: '100%',
		borderRadius: '25px'
	},
	formContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
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
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	filterContainer: {
		display: 'flex',
		justifyContent: 'center'
	},
	filterInput: {
		padding: '0.3rem'
	}
});
const FormSearchDoctor = () => {
	const [ timezone, setTimezone ] = useState('Eastern Time');
	const [ nameZone, setNameZone ] = useState('New York, United States');
	const [ typeOfHCP, setTypeOfHCP ] = useState('');
	const [ date, setDate ] = useState('');
	const [ filterDialogOpen, setFilterDialogOpen ] = useState(false);
	const [ filterType, setFilterType ] = useState('');
	const { state: {userId} } = useContext(AuthContext);
	// const userId = '5fe8b0c48bef090026e253b7';
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
	console.log(doctors)
	return (
		<div className={classes.root}>
			<form onSubmit={handleSubmit}>
				<Grid container className={classes.formContainer}>
					<Grid item xs={12} sm={7} md={5} lg={4} className={classes.input}>
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
					<Grid item xs={9} sm={3} className={classes.input}>
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
					<Grid item xs={3} sm={2} md={1} className={classes.input}>
						<ButtonIcon className={classes.submit} type="submit">
							<SearchIcon />
						</ButtonIcon>
					</Grid>
				</Grid>
			</form>
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
				<Grid item xs={12} md={9}>
					<PaperCustomShadow>
						<Grid container className={classes.filter}>
							<Grid className={classes.filterInput} item>
								<FilterIcon style={{ fontSize: '3rem', color: 'gray' }} />
							</Grid>
							<Grid className={classes.filterInput} item>
								<ButtonFilterOption
									onClick={() => {
										setFilterType('time');
										setFilterDialogOpen(true);
									}}
								>
									Desired time
								</ButtonFilterOption>
							</Grid>
							<Grid className={classes.filterInput} item>
								<FormControl>
									<ButtonFilterOption
										onClick={() => {
											setFilterType('price');
											setFilterDialogOpen(true);
										}}
									>
										Price
									</ButtonFilterOption>
								</FormControl>
							</Grid>
							<Grid className={classes.filterInput} item>
								<FormControl>
									<ButtonFilterOption
										onClick={() => {
											setFilterType('rating');
											setFilterDialogOpen(true);
										}}
									>
										Rating
									</ButtonFilterOption>
								</FormControl>
							</Grid>
							<Grid className={classes.filterInput} item>
								<FormControl>
									<ButtonFilterOption
										onClick={() => {
											setFilterType('more');
											setFilterDialogOpen(true);
										}}
									>
										More filters
									</ButtonFilterOption>
								</FormControl>
							</Grid>
						</Grid>
					</PaperCustomShadow>
				</Grid>
			</Grid>
			<DialogFilter isOpen={filterDialogOpen} close={() => setFilterDialogOpen(false)} type={filterType} />
		</div>
	);
};

export default FormSearchDoctor;
