import React, { useEffect, useState } from 'react';
import DialogFilter from '../DialogFilter';
import DoctorList from '../DoctorList';
import { formatDateNoYear, formatFormDate } from '../../../helpers/dateHelper';
import useStyles from './style';
//CUSTOM UI
import TextInputRounder from '../../customUi/TextInputRounder';
import ButtonFilterOption from '../../customUi/ButtonFilterOption';
import FilterIcon from '../../customIcons/FilterIcon';
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';

const FormSearchDoctor = () => {
	//STATE
	const [ timezone, setTimezone ] = useState('Eastern Time');
	const [ nameZone, setNameZone ] = useState('New York, United States');
	const [ filterDialogOpen, setFilterDialogOpen ] = useState(false);
	const [ filterType, setFilterType ] = useState('');
	const [ filterState, setFilterState ] = useState({
		gender: 3,
		time: 'all',
		minPrice: 70,
		maxPrice: 150,
		rating: 0.1,
		date: '',
		typeOfHCP: 'Certified diabetes educator'
		// timeZoneValue: '+300'
	});
	const classes = useStyles();

	const allSpecialty = [
		'General care physician',
		'Endocrinologist',
		'Dietitian',
		'Certified diabetes educator',
		'Podiatrist',
		'Nephrologist',
		'Ophthalmologist',
		'Physical trainer',
		'Dentist',
		'Any'
	];

	useEffect(() => {
		const today = new Date();
		const todayFormatted = formatFormDate(today);
		// console.log(todayFormatted);
		const dateAsString = today.toString();
		const timezone = dateAsString.match(/\(([^\)]+)\)$/)[1];
		const nameTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		setTimezone(timezone);
		setNameZone(nameTimeZone);
		setFilterState({ ...filterState, date: todayFormatted });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={classes.root}>
			<form onSubmit={(e) => {}}>
				<Grid container className={classes.formContainer}>
					<Grid item xs={12} sm={7} md={5} lg={4} className={classes.input}>
						<TextInputRounder
							fullWidth
							id="Speciality"
							label="Speciality"
							select
							variant="outlined"
							value={filterState.typeOfHCP}
							onChange={(e) => setFilterState({ ...filterState, typeOfHCP: e.target.value })}
							InputLabelProps={{
								shrink: true
							}}
						>
							{allSpecialty !== 'undefined' ? (
								allSpecialty.map((el, i) => {
									return (
										<MenuItem key={i} value={el}>
											{el}
										</MenuItem>
									);
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
							value={filterState.date}
							onChange={(e) =>
								setFilterState({
									...filterState,
									date: formatFormDate(new Date(`${e.target.value}T00:00:00`))
								})}
							InputLabelProps={{
								shrink: true
							}}
						/>
					</Grid>
					<Grid item xs={3} sm={2} md={1} className={classes.input}>
						{/* <ButtonIcon className={classes.submit} type="submit">
							<SearchIcon />
						</ButtonIcon> */}
					</Grid>
				</Grid>
			</form>
			<Divider orientation="horizontal" />

			<PaperCustomShadow className={classes.timeZone}>
				<FormControl className={classes.timeZoneForm}>
					<Typography>
						We believe you are in - {timezone} ({nameZone}) -
					</Typography>
					{/* <FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="change-time-zone">CHANGE THE TIME ZONE</InputLabel>
						<Select
							labelId="change-time-zone"
							id="change-time-zone"
							value={+300}
							onChange={(e) => {
								setFilterState({ ...filterState, timeZoneValue: e.target.value });
								//   setTimezone( newTime ) // CHANGE TIMEZONE
								//   setNameZone(nameTimeZone)
							}}
							label="CHANGE THE TIME ZONE"
						/>
					</FormControl> */}
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
			<Typography variant="h5">{formatDateNoYear(new Date(`${filterState.date}T00:00:00`))}</Typography>
			<Grid container className={classes.content}>
				<Grid item md={9} className={classes.listContainer}>
					<DoctorList
						dateFormatted={formatDateNoYear(`${filterState.date}T00:00:00`)}
						filterState={filterState}
					/>
				</Grid>
			</Grid>
			<DialogFilter
				filterState={filterState}
				setFilterState={setFilterState}
				isOpen={filterDialogOpen}
				close={() => setFilterDialogOpen(false)}
				type={filterType}
			/>
		</div>
	);
};

export default FormSearchDoctor;
