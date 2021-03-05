import React, { useState, useContext, createRef } from 'react';
import { convertTime, formatDateShort } from '../../../helpers/dateHelper';
import { Context as DocProfileContext } from '../../../context/DocProfileContext';
import b64ToBlob from 'b64-to-blob';
import { useQuery } from '@apollo/client';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import ErrorMessage from '../ErrorMessage';
import SuccessMessage from '../SuccessMessage';
import useStyles from './style';
import { useScreenshot } from 'use-react-screenshot';
import { APPOINTMENTS_QUERY_PRESCDIALOG } from '../../../context/GraphQl/graphQlQuery';
import Preview from './preview';
import dianurseApi from '../../../api/dianurseApi';
//CUSTOM UI
import ButtonFilled from '../../customUi/ButtonFilled';
import ButtonOutlined from '../../customUi/ButtonOutlined';
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import Tooltip from '@material-ui/core/Tooltip';
import Container from '@material-ui/core/Container';
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

const DialogNewPrescription = ({ isOpen, close, idHCP, idPatient, reload }) => {
	const [ step, setStep ] = useState(1);
	const ref = createRef(null);
	const [ image, takeScreenShot ] = useScreenshot();
	const { state } = useContext(DocProfileContext);
	const [ diagnosis, setDiagnosis ] = useState('');
	const [ recommendation, setRecommendation ] = useState('');
	const [ hasError, setHasError ] = useState(false);
	const [ medication, setMedication ] = useState({
		quantity: '',
		name: '',
		directions: ''
	});
	const [ medicineList, setMedicineList ] = useState([]);
	const { loading, error, data, refetch } = useQuery(APPOINTMENTS_QUERY_PRESCDIALOG, {
		variables: { idPatient, idHCP }
	});

	// const data = {
	// 	appointmentDocAndPatient: [
	// 		{
	// 			_id: '60196388539b8thrtsdf800272f3a36',
	// 			appointmentTimeStart: new Date(),
	// 			appointmentTimeEnd: new Date(),
	// 			profilePatientid: {
	// 				firstName: 'Peach',
	// 				lastName: 'Nintendo',
	// 				phoneNumber: '2424545432'
	// 			},
	// 			accountPatientid: {
	// 				username: 'peach@nintendo.com'
	// 			}
	// 		},
	// 		{
	// 			_id: '601963885rtmhj39b8sdf800272f3a36',
	// 			appointmentTimeStart: new Date(),
	// 			appointmentTimeEnd: new Date(),
	// 			profilePatientid: {
	// 				firstName: 'Peach',
	// 				lastName: 'Nintendo',
	// 				phoneNumber: '2424545432'
	// 			},
	// 			accountPatientid: {
	// 				username: 'peach@nintendo.com'
	// 			}
	// 		},
	// 		{
	// 			_id: '60196388539b8sdf800272f3a36',
	// 			appointmentTimeStart: new Date(),
	// 			appointmentTimeEnd: new Date(),
	// 			profilePatientid: {
	// 				firstName: 'Peach',
	// 				lastName: 'Nintendo',
	// 				phoneNumber: '2424545432'
	// 			},
	// 			accountPatientid: {
	// 				username: 'peach@nintendo.com'
	// 			}
	// 		}
	// 	]
	// };

	const [ prescriptionName, setPrescriptionName ] = useState('');
	const [ appointmentSelectedId, setAppointmentSelectedId ] = useState('');
	const [ aptSelected, setAptSelected ] = useState('');
	const nextStep = () => {
		setStep(step + 1);
	};
	// console.log(idPatient);
	// console.log('dataPrescription', data);

	const onCancel = () => {
		close();
		setPrescriptionName('');
		setAppointmentSelectedId('');
		setDiagnosis('');
		setRecommendation('');
		setMedication({
			quantity: '',
			name: '',
			directions: ''
		});
		setMedicineList([]);
		setStep(1);
	};

	const previousStep = () => {
		setStep(step - 1);
	};

	const onFileUpload = async () => {
		await takeScreenShot(ref.current);
		let file = image.split(';base64,').pop();
		let newFile = b64ToBlob(file, 'image/png');
		console.log(newFile);
		let prescription = new FormData();
		prescription.append('prescription', newFile);
		prescription.append('name', prescriptionName);
		prescription.append('idHCP', idHCP);
		prescription.append('idPatient', idPatient);
		let aptId = appointmentSelectedId;
		console.log(prescription);

		// console.log(aptId);
		try {
			await dianurseApi.put(`download/prescription/${aptId}`, prescription);
			await refetch();
			await reload();
			nextStep();
		} catch (error) {
			console.log(error);
			setHasError(true);
			nextStep();
		}
	};

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
					<div>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								nextStep();
								setAptSelected(
									data.appointmentDocAndPatient.filter((apt) => apt._id === appointmentSelectedId)
								);
							}}
						>
							<Grid container className={classes.wrapper}>
								<Grid item className={classes.header}>
									<Typography className={classes.title}>New Prescpription</Typography>
									<IconButton onClick={onCancel} color="primary">
										<CloseIcon />
									</IconButton>
								</Grid>
								<Divider className={classes.divider} />
								{loading && (
									<Container className={classes.emptyState}>
										<Loader type="TailSpin" color="primary" height={80} width={80} />
									</Container>
								)}
								{error && <ErrorMessage />}
								{data && (
									<div>
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
											<FormControl variant="outlined" fullWidth required>
												<InputLabel id="apt-select-label">Select Appoitment</InputLabel>
												<Select
													labelId="apt-select-label"
													value={appointmentSelectedId}
													onChange={(e) => setAppointmentSelectedId(e.target.value)}
													label="Select Appointment"
												>
													{data.appointmentDocAndPatient.map((apt, i) => {
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
									</div>
								)}
							</Grid>
						</form>
					</div>
				</Dialog>
			);
		case 2:
			return (
				<Dialog open={isOpen} onClose={onCancel} fullWidth maxWidth={false}>
					<Grid container className={classes.titleWrapper}>
						<Grid item>
							<div className={classes.name}>
								<Avatar className={classes.avatar} alt={state.lastName} src={state.image} />
								Dr. {state.lastName}
							</div>
						</Grid>
						<Grid item>{formatDateShort(aptSelected[0].appointmentTimeStart)}</Grid>
						<Grid item>
							{convertTime(aptSelected[0].appointmentTimeStart)} -{' '}
							{convertTime(aptSelected[0].appointmentTimeEnd)}
						</Grid>
						<Grid item>{prescriptionName}</Grid>
						<IconButton onClick={onCancel} color="primary">
							<CloseIcon />
						</IconButton>
					</Grid>
					<Divider />
					<form
						onSubmit={(e) => {
							e.preventDefault();
							setMedicineList([
								...medicineList,
								{
									name: medication.name,
									quantity: medication.quantity,
									directions: medication.directions
								}
							]);
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
												InputProps={{
													endAdornment: (
														<InputAdornment position="end">
															<EditIcon className={classes.inputIcon} />
														</InputAdornment>
													)
												}}
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
												InputProps={{
													endAdornment: (
														<InputAdornment position="end">
															<EditIcon className={classes.inputIcon} />
														</InputAdornment>
													)
												}}
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
												InputProps={{
													endAdornment: (
														<InputAdornment position="end">
															<EditIcon className={classes.inputIcon} />
														</InputAdornment>
													)
												}}
												value={medication.directions}
												onChange={(e) =>
													setMedication({ ...medication, directions: e.target.value })}
												label="Directions for use"
												variant="outlined"
											/>
										</Grid>
									</Grid>
									<Tooltip title="Add another medication">
										<IconButton
											onClick={() => {
												setMedicineList([
													...medicineList,
													{
														name: medication.name,
														quantity: medication.quantity,
														directions: medication.directions
													}
												]);
												setMedication({
													name: '',
													quantity: '',
													directions: ''
												});
											}}
										>
											<AddIcon className={classes.addIcon} />
										</IconButton>
									</Tooltip>
								</PaperCustomShadow>
							</Grid>
							<Grid item xs={12}>
								{medicineList.length > 0 && (
									<div className={classes.section}>
										<PaperCustomShadow className={classes.listTitle}>
											<Grid container>
												<Grid item xs={4} sm={3}>
													<Typography color="textSecondary" className={classes.medInfo}>
														Quantity
													</Typography>
												</Grid>
												<Grid item xs={8} sm={3}>
													<Typography className={classes.medInfo}>Medication Name</Typography>
												</Grid>
												<Grid item xs={12} sm={6}>
													<Typography color="textSecondary">Directions for use</Typography>
												</Grid>
											</Grid>
										</PaperCustomShadow>
										{medicineList.map((item, i) => {
											return (
												<Grid container key={i} className={classes.medicineCard}>
													<Grid item xs={4} sm={3}>
														<Typography color="textSecondary" className={classes.medInfo}>
															{item.quantity}
														</Typography>
													</Grid>
													<Grid item xs={8} sm={3}>
														<Typography className={classes.medInfo}>{item.name}</Typography>
													</Grid>
													<Grid item xs={12} sm={6}>
														<Typography color="textSecondary">{item.directions}</Typography>
													</Grid>
												</Grid>
											);
										})}
									</div>
								)}
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
				<Dialog open={isOpen} onClose={onCancel} fullWidth maxWidth={false}>
					<Grid container className={classes.titleWrapper}>
						<Grid item>
							<div className={classes.name}>
								<Avatar className={classes.avatar} alt={state.lastName} src={state.image} />
								Dr. {state.lastName}
							</div>
						</Grid>
						<Grid item>{formatDateShort(aptSelected[0].appointmentTimeStart)}</Grid>
						<Grid item>
							{convertTime(aptSelected[0].appointmentTimeStart)} -{' '}
							{convertTime(aptSelected[0].appointmentTimeEnd)}
						</Grid>
						<Grid item>{prescriptionName}</Grid>
						<IconButton onClick={onCancel} color="primary">
							<CloseIcon />
						</IconButton>
					</Grid>
					<Divider />
					<form
						onSubmit={(e) => {
							e.preventDefault();
							onFileUpload();
						}}
					>
						{/* {console.log(aptSelected[0])} */}
						<Grid container className={classes.wrapper}>
							<div ref={ref}>
								<Preview
									prescriptionName={prescriptionName}
									medicineList={medicineList}
									diagnosis={diagnosis}
									idHCP={idHCP}
									idPatient={idPatient}
									patientInfo={aptSelected[0]}
									recommendation={recommendation}
								/>
							</div>
							{/* <img width={900} src={image} alt={'Screenshot'} /> */}
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
			return (
				<Dialog
					open={isOpen}
					onClose={onCancel}
					fullWidth
					maxWidth={false}
					aria-labelledby="new-prescription"
					aria-describedby="new-prescription"
				>
					<Grid container className={classes.titleWrapper}>
						<IconButton onClick={onCancel} color="primary">
							<CloseIcon />
						</IconButton>
					</Grid>
					{hasError ? <ErrorMessage /> : <SuccessMessage />}
				</Dialog>
			);
	}
};

export default DialogNewPrescription;
