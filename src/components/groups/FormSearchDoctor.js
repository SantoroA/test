import React, { useEffect, useState } from 'react';
import DialogFilter from './DialogFilter';
import DoctorList from './DoctorList';
import dianurseApi from '../../api/dianurseApi';
//CUSTOM UI
import TextInputRounder from '../customUi/TextInputRounder';
import ButtonIcon from '../customUi/ButtonIcon';
import ButtonFilterOption from '../customUi/ButtonFilterOption';
import FilterIcon from '../customIcons/FilterIcon';
import PaperCustomShadow from '../customUi/PaperCustomShadow';
import Calendar from '../../components/customUi/Calendar';
//MATERIAL UI
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

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
		typeOfHCP: 'Certified diabetes educator'
	});
	const classes = useStyles();

	let dateChoose = new Date(filterState.date).toDateString().split(' ');
	let formatDateDisplay = `${dateChoose[0]}, ${dateChoose[2]} ${new Date(filterState.date).toLocaleString('default', {
		month: 'long'
	})}`;
	console.log(filterState.date);
	console.log(dateChoose);

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
	const formatDate = (date) => {
		const year = date.getFullYear();
		const month = '' + date.getMonth() + 1;
		const day = '' + date.getDate();
		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		return [ year, month, day ].join('-');
	};
	useEffect(() => {
		const today = new Date();
		const todayFormatted = formatDate(today);
		const dateAsString = today.toString();
		const timezone = dateAsString.match(/\(([^\)]+)\)$/)[1];
		const nameTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		setTimezone(timezone);
		setNameZone(nameTimeZone);
		setFilterState({ ...filterState, date: todayFormatted });
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
			<Typography variant="h5">{formatDateDisplay}</Typography>
			<Grid container className={classes.content}>
				<Grid item md={9} className={classes.listContainer}>
					<DoctorList formatDate={formatDate} filterState={filterState} />
				</Grid>
				<Grid item md={3}>
					<Calendar />
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
