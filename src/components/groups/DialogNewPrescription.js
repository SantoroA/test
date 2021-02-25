import React, { useState, useContext } from 'react';
import { convertTime, formatDateShort } from '../../helpers/dateHelper';
import { Context as DocProfileContext } from '../../context/DocProfileContext';
import { Context as AuthContext } from '../../context/AuthContext';
import { useQuery, gql } from '@apollo/client';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import dianurseApi from '../../api/dianurseApi';
import ErrorMessage from './ErrorMessage';
//CUSTOM UI
import ButtonFilled from '../customUi/ButtonFilled';
import PaperCustomShadow from '../customUi/PaperCustomShadow';
//MATERIAL UI
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
	title: {
		fontWeight: 'bold',
		marginBottom: '1.5rem',
		minWidth: '20rem'
	},
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
		padding: '1rem'
	},
	input: {
		padding: '0.5rem'
	},
	divider: {
		marginBottom: '1rem'
	},
	closeButton: {
		alignSelf: 'flex-end'
	},
	section: {
		padding: '0.5rem'
	},
	selector: {
		marginBottom: '1rem',
		overflowY: 'scroll',
		maxHeight: '13rem'
	},
	emptyState: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '20rem',
		flexDirection: 'column',
		textAlign: 'center'
	},

	radioLabel: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	avatar: {
		marginRight: '1rem'
	},
	docName: {
		marginRight: '1rem',
		fontWeight: 'bold'
	},
	documentInput: {
		display: 'none'
	},
	documentInputLabel: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: '0.8rem',
		'&:hover': {
			cursor: 'pointer'
		}
	},
	group: {
		display: 'flex',
		flexDirection: 'row'
	},
	name: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	item: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: '0.5rem'
	},
	addIcon: {
		marginRight: '0.5rem',
		marginLeft: '0.5rem'
	},
	titleWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: '1rem'
	}
});

//QUERY OS APPOINTMENTS QUE COM O ID DO DOCTOR E DO PACIENTE

const DialogNewPrescription = ({ isOpen, close, idHCP, idPatient }) => {
	const [ step, setStep ] = useState(1);
	const { state: { lastName, image } } = useContext(DocProfileContext);
	const [ diagnosis, setDiagnosis ] = useState('');
	const [ recommendation, setRecommendation ] = useState('');
	const [ hasError, setHasError ] = useState(false);
	const [ medication, setMedication ] = useState({
		quantity: '',
		name: '',
		directions: ''
	});
	const [ prescriptionName, setPrescriptionName ] = useState('');
	const [ appointmentSelectedId, setAppointmentSelectedId ] = useState('');
	const [ aptSelected, setAptSelected ] = useState('');
	console.log(aptSelected);
	const nextStep = () => {
		setStep(step + 1);
	};

	const previousStep = () => {
		setStep(step - 1);
	};

	const appointments = [
		{
			_id: '60196388539b8thrtsdf800272f3a36',
			appointmentTimeStart: new Date(),
			appointmentTimeEnd: new Date()
		},
		{
			_id: '601963885rtmhj39b8sdf800272f3a36',
			appointmentTimeStart: new Date(),
			appointmentTimeEnd: new Date()
		},
		{
			_id: '60196388539b8sdf800272f3a36',
			appointmentTimeStart: new Date(),
			appointmentTimeEnd: new Date()
		}
	];

	const classes = useStyles();

	const handleChange = (event) => {
		setAppointmentSelectedId(event.target.value);
	};

	switch (step) {
		case 1:
			return (
				<Dialog
					open={isOpen}
					onClose={() => {
						close();
					}}
					aria-labelledby="new-prescription"
					aria-describedby="new-prescription"
				>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							nextStep();
							setAptSelected(appointments.filter((apt) => apt._id === appointmentSelectedId));
						}}
					>
						<Grid container className={classes.wrapper}>
							<Grid item>
								<Typography className={classes.title}>New Prescpription</Typography>
							</Grid>
							<Divider className={classes.divider} />

							<Grid className={classes.section} item>
								<TextField
									fullWidth
									type="text"
									required
									value={prescriptionName}
									onChange={(e) => setPrescriptionName(e.target.value)}
									label="Prescription Name"
									variant="outlined"
								/>
							</Grid>
							<Grid className={classes.section} item>
								<FormControl fullWidth>
									<InputLabel id="apt-select-label">Select Appoitment</InputLabel>
									<Select
										labelId="apt-select-label"
										value={appointmentSelectedId}
										onChange={(e) => setAppointmentSelectedId(e.target.value)}
										variant="outlined"
										label="Select Appointment"
									>
										{appointments.map((apt, i) => {
											return (
												<MenuItem key={i} value={apt._id}>
													{formatDateShort(apt.appointmentTimeStart)} -{' '}
													{convertTime(apt.appointmentTimeStart)}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</Grid>
							<Grid className={classes.section} item>
								<ButtonFilled fullWidth type="submit">
									Next
								</ButtonFilled>
							</Grid>
						</Grid>
					</form>
				</Dialog>
			);
		case 2:
			return (
				<Dialog
					open={isOpen}
					onClose={() => {
						close();
					}}
					fullWidth
					maxWidth={false}
					aria-labelledby="new-prescription"
					aria-describedby="new-prescription"
				>
					<Grid container className={classes.titleWrapper}>
						<Grid item sm={3} xs={6}>
							<div className={classes.name}>
								<Avatar
									className={classes.avatar}
									alt={lastName}
									src={
										image.includes('http') ? (
											image
										) : (
											`url(http://localhost:10101/dianurse/v1/profile/static/images/${image})`
										)
									}
								/>
								Dr. {lastName}
							</div>
						</Grid>
						<Grid item sm={3} xs={6}>
							{formatDateShort(aptSelected[0].appointmentTimeStart)}
						</Grid>
						<Grid item sm={3} xs={6}>
							{convertTime(aptSelected[0].appointmentTimeStart)} -{' '}
							{convertTime(aptSelected[0].appointmentTimeEnd)}
						</Grid>
						<Grid item sm={3} xs={6}>
							{prescriptionName}
						</Grid>
					</Grid>
					<Divider />
					<form
						onSubmit={(e) => {
							e.preventDefault();
							nextStep();
						}}
					>
						<Grid container className={classes.wrapper}>
							<Grid className={classes.section} item>
								<TextField
									fullWidth
									type="text"
									required
									value={diagnosis}
									onChange={(e) => setDiagnosis(e.target.value)}
									label="Medical Diagnosis"
									variant="outlined"
								/>
							</Grid>
							<Grid item className={classes.section}>
								<PaperCustomShadow className={classes.item}>
									<Grid container>
										<Grid item xs={12} sm={6} md={3} className={classes.input}>
											<TextField
												type="text"
												fullWidth
												value={medication.quantity}
												onChange={(e) =>
													setMedication({ ...medication, quantity: e.target.value })}
												label="Quantity"
												variant="outlined"
											/>
										</Grid>
										<Grid item xs={12} sm={6} md={4} className={classes.input}>
											<TextField
												type="text"
												fullWidth
												value={medication.name}
												onChange={(e) => setMedication({ ...medication, name: e.target.value })}
												label="Medication name"
												variant="outlined"
											/>
										</Grid>
										<Grid item xs={12} sm={12} md={5} className={classes.input}>
											<TextField
												type="text"
												fullWidth
												value={medication.directions}
												onChange={(e) =>
													setMedication({ ...medication, directions: e.target.value })}
												label="Directions for use"
												variant="outlined"
											/>
										</Grid>
									</Grid>
									<AddIcon className={classes.addIcon} />
								</PaperCustomShadow>
							</Grid>
							<Grid className={classes.section} item>
								<TextField
									fullWidth
									multiline
									rows={4}
									type="text"
									value={recommendation}
									onChange={(e) => setRecommendation(e.target.value)}
									label="Health recommendations"
									variant="outlined"
								/>
							</Grid>
							<Grid className={classes.section} item>
								<ButtonFilled fullWidth type="submit">
									Preview
								</ButtonFilled>
							</Grid>
						</Grid>
					</form>
				</Dialog>
			);
	}
};

export default DialogNewPrescription;
