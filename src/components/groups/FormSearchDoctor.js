import React, { useEffect, useState } from 'react';
import DialogFilter from './DialogFilter';
import DoctorList from './DoctorList';
import { formatDateNoYear, formatFormDate } from '../../helpers/dateHelper';
//CUSTOM UI
import TextInputRounder from '../customUi/TextInputRounder';
import ButtonFilterOption from '../customUi/ButtonFilterOption';
import FilterIcon from '../customIcons/FilterIcon';
import PaperCustomShadow from '../customUi/PaperCustomShadow';
import CalendarApp from '../../components/customUi/CalendarApp';
//MATERIAL UI
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

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
		justifyContent: 'center',
		marginBottom: '2rem'
	},
	filterInput: {
		padding: '0.3rem'
	},
	content: {
		marginTop: '2rem'
	}
});

const FormSearchDoctor = () => {
	//STATE
	const [ timezone, setTimezone ] = useState('Eastern Time');
	const [ nameZone, setNameZone ] = useState('New York, United States');
	const [ filterDialogOpen, setFilterDialogOpen ] = useState(false);
	const [ filterType, setFilterType ] = useState('');
	const [ filterState, setFilterState ] = useState({
		gender: 3,
		time: 'all',
		insurance: 3,
		minPrice: 70,
		maxPrice: 150,
		rating: 0.1,
		date: '',
		typeOfHCP: 'Certified diabetes educator',
		timeZoneValue: +300
	});
	const classes = useStyles();

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	console.log('submit', typeOfHCP);
	// 	getDoctorList({ typeOfHCP, date });
	// };

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
		// const getdata = async () => {
		// 	const response = await fetch(`https://ipapi.co/json`)
		// 	const d = await response.json()
		// 	console.log(d.country_name)
		//   }
		//   getdata()

		const today = new Date();
		const todayFormatted = formatFormDate(today);
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
							onChange={(e) => setFilterState({ ...filterState, date: e.target.value })}
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
					<FormControl variant="outlined" className={classes.formControl}>
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
						>
							{/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
							{/* <MenuItem value={+60}>Horário Padrão da Europa Central Madrid (GMT+1)</MenuItem>
          <MenuItem value={0}>Horário do Meridiano de Greenwich Londres (GMT)</MenuItem>
          <MenuItem value={+60}>Horário Padrão da Europa Central Paris (GMT+1)</MenuItem>
		  <MenuItem value={+60}>Horário Padrão da Europa Central Rome (GMT+1)</MenuItem>
          <MenuItem value={+120}>Horário Padrão da Europa Oriental Bucareste (GMT+2)</MenuItem>
          <MenuItem value={+180}>Horário Padrão de Moscou Minsk (GMT+3)</MenuItem>
		  <MenuItem value={-120}>Horário Padrão de Fernando de Noronha Ilha Fernando de Noronha (GMT-2)</MenuItem>
		  <MenuItem value={-180}>Horário Padrão de Brasília Belém (GMT-3)</MenuItem>
          <MenuItem value={-240}>Horário Padrão do Amazonas Manaus - AM, Brasil (GMT-4)</MenuItem>
          <MenuItem value={-300}>Horário Padrão do Acre Rio Branco (GMT-5)</MenuItem> */}
						</Select>
					</FormControl>

					{/* <MenuItem value={+60}>Horário Padrão da Europa Central Madrid (GMT+1)</MenuItem>
							<MenuItem value={0}>Horário do Meridiano de Greenwich Londres (GMT)</MenuItem>
							<MenuItem value={+60}>Horário Padrão da Europa Central Paris (GMT+1)</MenuItem>
							<MenuItem value={+60}>Horário Padrão da Europa Central Rome (GMT+1)</MenuItem>
							<MenuItem value={+120}>Horário Padrão da Europa Oriental Bucareste (GMT+2)</MenuItem>
							<MenuItem value={+180}>Horário Padrão de Moscou Minsk (GMT+3)</MenuItem>
							<MenuItem value={-120}>
								Horário Padrão de Fernando de Noronha Ilha Fernando de Noronha (GMT-2)
							</MenuItem>
							<MenuItem value={-180}>Horário Padrão de Brasília Belém (GMT-3)</MenuItem>
							<MenuItem value={-240}>Horário Padrão do Amazonas Manaus - AM, Brasil (GMT-4)</MenuItem>
							<MenuItem value={-300}>Horário Padrão do Acre Rio Branco (GMT-5)</MenuItem> */}
					{/* </Select>*/}
				</FormControl>
				{/* </FormControl> */}
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
			<Typography variant="h5">{formatDateNoYear(filterState.date)}</Typography>
			<Grid container className={classes.content}>
				<Grid item md={9} className={classes.listContainer}>
					<DoctorList dateFormatted={formatDateNoYear(filterState.date)} filterState={filterState} />
				</Grid>
				<Grid item md={3}>
					<CalendarApp />
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
