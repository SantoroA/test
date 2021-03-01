import React, { useState, useContext } from 'react';
import { convertTime, formatDateShort } from '../../../helpers/dateHelper';
import { Context as DocProfileContext } from '../../../context/DocProfileContext';
import { Context as AuthContext } from '../../../context/AuthContext';
import { useQuery, gql } from '@apollo/client';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import dianurseApi from '../../../api/dianurseApi';
import ErrorMessage from '../ErrorMessage';
import useStyles from './style';
import Preview from './preview';
//CUSTOM UI
import ButtonFilled from '../../customUi/ButtonFilled';
import ButtonOutlined from '../../customUi/ButtonOutlined';
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import Tooltip from '@material-ui/core/Tooltip';
import Select from '@material-ui/core/Select';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import EditIcon from '@material-ui/icons/Edit';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';

//QUERY OS APPOINTMENTS QUE COM O ID DO DOCTOR E DO PACIENTE

const DialogNewLabTest = ({ isOpen, close, idHCP, idPatient }) => {
	const [ step, setStep ] = useState(1);
	const { state: { lastName, image } } = useContext(DocProfileContext);
	const [ diagnosis, setDiagnosis ] = useState('');
	const [ exams, setExams ] = useState('');
	const [ hasError, setHasError ] = useState(false);
	const [ testName, setTestName ] = useState('');
	const [ appointmentSelectedId, setAppointmentSelectedId ] = useState('');
	const [ aptSelected, setAptSelected ] = useState('');
	const nextStep = () => {
		setStep(step + 1);
	};

	const onCancel = () => {
		close();
		setTestName('');
		setAppointmentSelectedId('');
		setDiagnosis('');
		setExams('');
		setStep(1);
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

	switch (step) {
		case 1:
			return (
				<Dialog
					open={isOpen}
					onClose={onCancel}
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
							<Grid item className={classes.header}>
								<Typography className={classes.title}>New Lab Test Request</Typography>
								<IconButton onClick={onCancel} color="primary">
									<CloseIcon />
								</IconButton>
							</Grid>
							<Divider className={classes.divider} />

							<Grid className={classes.section} item>
								<TextField
									fullWidth
									type="text"
									required
									value={testName}
									onChange={(e) => setTestName(e.target.value)}
									label="Test Name"
									variant="outlined"
								/>
							</Grid>
							<Grid className={classes.section} item>
								<FormControl variant="outlined" fullWidth required>
									<InputLabel id="apt-select-label">Select Appoitment</InputLabel>
									<Select
										labelId="apt-select-label"
										value={appointmentSelectedId}
										onChange={(e) => setAppointmentSelectedId(e.target.value)}
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
						<Grid item>
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
						<Grid item>{formatDateShort(aptSelected[0].appointmentTimeStart)}</Grid>
						<Grid item>
							{convertTime(aptSelected[0].appointmentTimeStart)} -{' '}
							{convertTime(aptSelected[0].appointmentTimeEnd)}
						</Grid>
						<Grid item>{testName}</Grid>
						<IconButton onClick={onCancel} color="primary">
							<CloseIcon />
						</IconButton>
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

							<Grid className={classes.section} item>
								<TextField
									fullWidth
									multiline
									rows={6}
									type="text"
									value={exams}
									onChange={(e) => setExams(e.target.value)}
									label="Exams"
									variant="outlined"
								/>
							</Grid>
							<Grid className={classes.buttonContainer} item>
								<ButtonOutlined fullWidth className={classes.backButton} onClick={previousStep}>
									Back
								</ButtonOutlined>
								<ButtonFilled fullWidth className={classes.previewButton} type="submit">
									Preview
								</ButtonFilled>
							</Grid>
						</Grid>
					</form>
				</Dialog>
			);
		case 3:
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
						<Grid item>
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
						<Grid item>{formatDateShort(aptSelected[0].appointmentTimeStart)}</Grid>
						<Grid item>
							{convertTime(aptSelected[0].appointmentTimeStart)} -{' '}
							{convertTime(aptSelected[0].appointmentTimeEnd)}
						</Grid>
						<Grid item>{testName}</Grid>
						<IconButton onClick={onCancel} color="primary">
							<CloseIcon />
						</IconButton>
					</Grid>
					<Divider />
					<form
						onSubmit={(e) => {
							e.preventDefault();
						}}
					>
						<Grid container className={classes.wrapper}>
							<Preview diagnosis={diagnosis} idHCP={idHCP} idPatient={idPatient} exams={exams} />
							<Grid className={classes.buttonContainer} item>
								<ButtonOutlined fullWidth className={classes.backButton} onClick={previousStep}>
									Back
								</ButtonOutlined>
								<ButtonFilled fullWidth className={classes.previewButton} type="submit">
									Save and send
								</ButtonFilled>
							</Grid>
						</Grid>
					</form>
				</Dialog>
			);
	}
};

export default DialogNewLabTest;
