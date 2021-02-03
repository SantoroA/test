import React, { useState } from 'react';
import SmartTable from '../groups/SmartTable';
//CUSTOM UI
import TextInputRounder from '../customUi/TextInputRounder';
import ButtonIcon from '../customUi/ButtonIcon';
//MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		flexDirection: 'column'
	},
	section: {
		marginTop: '2em'
	},
	title: {
		fontWeight: 'bold',
		marginBottom: '1rem'
	},
	submit: {
		width: '100%',
		height: '2.6rem',
		borderRadius: '1.3rem'
	},
	searchContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	tableContainer: {
		marginTop: '2rem'
	}
});

const TabMyPatients = () => {
	const classes = useStyles();
	const [ patientName, setPatientName ] = useState('');
	const doctorsPatients = [
		{
			profilePatientid: {
				lastName: 'White',
				firstName: 'Mrs.',
				profilePicture:
					'https://images.pexels.com/photos/4511649/pexels-photo-4511649.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
				_id: '6011887772a95e0028bcbaasdcd8'
			},
			reasonForVisit: 'headache',
			idApt: '6019638853gre9b8800272f3a35',
			end: '2021-02-10T07:30:00.000Z',
			start: '2021-02-10T07:00:00.000Z',

			amount: '$45.56'
		},
		{
			profilePatientid: {
				lastName: 'Scarlet',
				firstName: 'Miss',
				profilePicture:
					'https://images.pexels.com/photos/3727219/pexels-photo-3727219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
				_id: '6011887772a95e0saa028bcbcd8'
			},
			reasonForVisit: 'covid',
			idApt: '60196388539asdb8800272f3a35',
			end: '2021-02-05T07:30:00.000Z',
			start: '2021-02-05T07:00:00.000Z',

			amount: '$45.56'
		},
		{
			profilePatientid: {
				lastName: 'Peacock',
				firstName: 'Mrs.',
				profilePicture:
					'https://images.pexels.com/photos/4407897/pexels-photo-4407897.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
				_id: '6011887772ass95e0028bcbcd8'
			},
			reasonForVisit: 'allergies',
			idApt: '60196388gf539b8800272f3a35',
			end: '2021-02-04T07:30:00.000Z',
			start: '2021-02-04T07:00:00.000Z',

			amount: '$45.56'
		},
		{
			profilePatientid: {
				lastName: 'Mustard',
				firstName: 'Col.',
				profilePicture:
					'https://images.pexels.com/photos/34534/people-peoples-homeless-male.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
				_id: '6011887772a95e0028abcbcd8'
			},
			reasonForVisit: 'cold',
			idApt: '601963rgw88539b8800272f3a35',
			end: '2021-02-09T07:30:00.000Z',
			start: '2021-02-09T07:00:00.000Z',

			amount: '$45.56'
		},
		{
			profilePatientid: {
				lastName: 'Green',
				firstName: 'Mr.',
				profilePicture:
					'https://images.pexels.com/photos/1250426/pexels-photo-1250426.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
				_id: '6011887a772a95e0028abcbcd8'
			},
			reasonForVisit: 'cardiac palpitations',
			idApt: '60196388539rgbaa8800272f3a35',
			end: '2021-02-01T07:30:00.000Z',
			start: '2021-02-01T07:00:00.000Z',

			amount: '$45.56'
		},
		{
			profilePatientid: {
				lastName: 'Plum',
				firstName: 'Prof.',
				profilePicture:
					'https://images.pexels.com/photos/25758/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
				_id: '6011as887a772a95e0028abcbcd8'
			},
			reasonForVisit: 'neck pain',
			idApt: '601963gr8s8539baa8800272f3a35',
			end: '2021-02-01T07:30:00.000Z',
			start: '2021-02-01T07:00:00.000Z',

			amount: '$45.56'
		},
		{
			profilePatientid: {
				lastName: 'Nintendo',
				firstName: 'Luigi',
				profilePicture:
					'https://images.pexels.com/photos/316680/pexels-photo-316680.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
				_id: '6011as887a772a95e0028abcbcd8'
			},
			reasonForVisit: 'nausea',
			idApt: '60196ff38s8539baa8800272f3a35',
			end: '2021-02-01T07:30:00.000Z',
			start: '2021-02-01T07:00:00.000Z',

			amount: '$45.56'
		},
		{
			profilePatientid: {
				lastName: 'Nintendo',
				firstName: 'Bowser',
				profilePicture:
					'https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
				_id: '6011as887a772a95e0028abcbcd8'
			},
			reasonForVisit: 'acne',
			idApt: '601963asd8s8539baa8800272f3a35',
			end: '2021-02-01T07:30:00.000Z',
			start: '2021-02-01T07:00:00.000Z',

			amount: '$45.55'
		}
	];
	return (
		<Grid className={classes.root} container>
			<Grid container>
				<Grid item xs={12} sm={6} md={7}>
					<Typography className={classes.title} variant="h5">
						My Patients
					</Typography>
				</Grid>
				<Grid item xs={12} sm={6} md={5}>
					<form>
						<Grid container className={classes.searchContainer}>
							<Grid item xs={9}>
								<TextInputRounder
									type="search"
									fullWidth
									id="search-patient"
									label="Patient Name"
									variant="outlined"
									value={patientName}
									onChange={(e) => setPatientName(e.target.value)}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<SearchIcon />
											</InputAdornment>
										)
									}}
								/>
							</Grid>
							<Grid item xs={2}>
								<ButtonIcon className={classes.submit} type="submit">
									<SearchIcon />
								</ButtonIcon>
							</Grid>
						</Grid>
					</form>
				</Grid>
				<Grid className={classes.tableContainer} item xs={12}>
					<SmartTable
						data={doctorsPatients}
						buttonText="More"
						tableTitles={[
							{ name: 'Name' },
							{ name: 'Date' },
							{ name: 'Appointment Time' },
							{ name: 'Conditions' },
							{ name: 'Amount paid' },
							{ name: '' }
						]}
					/>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default TabMyPatients;
