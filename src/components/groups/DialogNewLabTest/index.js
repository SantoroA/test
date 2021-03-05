import React, { useState, createRef } from 'react';
import { convertTime, formatDateShort } from '../../../helpers/dateHelper';
import { Context as DocProfileContext } from '../../../context/DocProfileContext';
import { useQuery, gql } from '@apollo/client';
import { APPOINTMENTS_QUERY_TESTDIALOG } from '../../../context/GraphQl/graphQlQuery';
import Loader from 'react-loader-spinner';
import b64ToBlob from 'b64-to-blob'
import { useScreenshot } from 'use-react-screenshot';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import ErrorMessage from '../ErrorMessage';
import useStyles from './style';
import Preview from './preview';
//CUSTOM UI
import ButtonFilled from '../../customUi/ButtonFilled';
import ButtonOutlined from '../../customUi/ButtonOutlined';
//MATERIAL UI
import Select from '@material-ui/core/Select';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import dianurseApi from '../../../api/dianurseApi';

//QUERY OS APPOINTMENTS QUE COM O ID DO DOCTOR E DO PACIENTE

const DialogNewLabTest = ({ isOpen, close, idHCP, idPatient, reload }) => {
	const [ step, setStep ] = useState(1);
	// const { state: { lastName, image } } = useContext(DocProfileContext);
	const [ diagnosis, setDiagnosis ] = useState('');
	const [ exams, setExams ] = useState('');
	const [ image, takeScreenShot ] = useScreenshot();
	const ref = createRef(null);
	const [ hasError, setHasError ] = useState(false);
	const [ testName, setTestName ] = useState('');
	const [ appointmentSelectedId, setAppointmentSelectedId ] = useState('');
	const [ aptSelected, setAptSelected ] = useState('');
	const { loading, error, data, refetch } = useQuery(APPOINTMENTS_QUERY_TESTDIALOG, {
		variables: { idPatient, idHCP }
	});
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


	const onFileUpload = async () => {
		let oldFile = image
		console.log(image)
		let file = oldFile.split(';base64,').pop();

		let newFile = b64ToBlob(file, 'image/png');
		let labTest = new FormData();
		
		labTest.append('labTest', newFile);
		labTest.append('name', testName);

		let aptId = appointmentSelectedId;
		console.log(aptId);
		try {
			await dianurseApi.put(`download/uploadLabTest/${aptId}`, labTest);
			await refetch();
			await reload();
			// updateDoc();
			close();
		} catch (error) {
			console.log(error);
			setHasError(true);
		}
	};

	const getImage = () => takeScreenShot(ref.current);

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
					{loading && (
						<Container className={classes.emptyState}>
							<Loader type="TailSpin" color="primary" height={80} width={80} />
						</Container>
					)}
					{error && <ErrorMessage />}
					{data && (
						<div>
							<form
								onSubmit={(e) => {
									e.preventDefault();
									nextStep();
									setAptSelected(
										data.appointmentDocUploadLabTest.filter(
											(apt) => apt._id === appointmentSelectedId
										)
									);
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
												{data.appointmentDocUploadLabTest.map((apt, i) => {
													{
														/* {appointments.map((apt, i) => { */
													}
													// console.log(apt._id);
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
						</div>
					)}
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
						{/* <Grid item>
							<div className={classes.name}>
								<Avatar className={classes.avatar} alt={lastName} src={image} />
								Dr. {lastName}
							</div>
						</Grid> */}
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
						{/* <Grid item>
							<div className={classes.name}>
								<Avatar className={classes.avatar} alt={lastName} src={image} />
								Dr. {lastName}
							</div>
						</Grid> */}
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
						onSubmit={async(e) => {
							e.preventDefault();
							await getImage();
							try {
								await onFileUpload();
							}catch(err){
								console.log(err)
							}
							
						}}
					>
						<Grid container className={classes.wrapper}>
							<div ref={ref}>
								<Preview
									diagnosis={diagnosis}
									idHCP={idHCP}
									idPatient={idPatient}
									exams={exams}
									patientInfo={aptSelected[0]}
								/>
							</div>
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
		default:
	}
};

export default DialogNewLabTest;
