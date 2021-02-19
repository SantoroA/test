import React, { useState, useContext } from 'react';
import { formatDateShort } from '../../helpers/dateHelper';
import { Context as AuthContext } from '../../context/AuthContext';
import { useQuery, gql } from '@apollo/client';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import dianurseApi from '../../api/dianurseApi';
import ErrorMessage from './ErrorMessage';
//CUSTOM UI
import ButtonFilled from '../customUi/ButtonFilled';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Container from '@material-ui/core/Container';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
		justifycontent: 'center',
		alignItems: 'center',
		padding: '1rem',
		textAlign: 'flex-start'
	},
	title: {
		fontWeight: 'bold'
	},
	divider: {
		marginTop: '1rem',
		marginBottom: '1rem'
	},
	closeButton: {
		alignSelf: 'flex-end'
	},
	section: {
		paddingBottom: '1rem'
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
	root: {
		padding: '1rem'
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
	}
});

const MYAPPOINTMENTS_QUERY = gql`
	query GetAppointments($id: ID!) {
		patientAppointmentsForUpload(id: $id) {
			_id
			appointmentTimeStart
			profileHCPid {
				firstName
			}
			accountHCPid {
				profilePicture
			}
		}
	}
`;

const DialogUploadDoc = ({ isOpen, close, title }) => {
	const { state: { userId } } = useContext(AuthContext);
	const [ documentSelected, setDocumentSelected ] = useState('');
	const [ hasError, setHasError ] = useState(false);
	const [ documentName, setDocumentName ] = useState('');
	const [ appointmentSelectedId, setAppointmentSelectedId ] = useState('');
	const { loading, error, data } = useQuery(MYAPPOINTMENTS_QUERY, {
		variables: { id: userId, cursor: null }
	});
	console.log(userId)
	// const data = [
	// 	{
	// 		_id: '60196388539b8sdf800272f3a36',
	// 		appointmentTimeStart: new Date(),
	// 		profileHCPid: {
	// 			lastName: 'Green'
	// 		},
	// 		accountHCPid: {
	// 			profilePicture:
	// 				'https://images.pexels.com/photos/6204377/pexels-photo-6204377.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
	// 		}
	// 	},
	// 	{
	// 		_id: '60196388539bsdf88002sdc72f3a36',
	// 		appointmentTimeStart: new Date(),
	// 		profileHCPid: {
	// 			lastName: 'Blue'
	// 		},
	// 		accountHCPid: {
	// 			profilePicture:
	// 				'https://images.pexels.com/photos/4484145/pexels-photo-4484145.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
	// 		}
	// 	},
	// 	{
	// 		_id: '6019638qw8539bdsv8800272f3a36',
	// 		appointmentTimeStart: new Date(),
	// 		profileHCPid: {
	// 			lastName: 'Red'
	// 		},
	// 		accountHCPid: {
	// 			profilePicture:
	// 				'https://images.pexels.com/photos/704977/pexels-photo-704977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
	// 		}
	// 	},
	// 	{
	// 		_id: '6019ffe63885rg39bdsv8800272f3a36',
	// 		appointmentTimeStart: new Date(),
	// 		profileHCPid: {
	// 			lastName: 'Purple'
	// 		},
	// 		accountHCPid: {
	// 			profilePicture:
	// 				'https://images.pexels.com/photos/6496035/pexels-photo-6496035.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
	// 		}
	// 	},
	// 	{
	// 		_id: '601963885qwefg39bdsv8800272f3a36',
	// 		appointmentTimeStart: new Date(),
	// 		profileHCPid: {
	// 			lastName: 'Orange'
	// 		},
	// 		accountHCPid: {
	// 			profilePicture:
	// 				'https://images.pexels.com/photos/6033988/pexels-photo-6033988.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
	// 		}
	// 	},
	// 	{
	// 		_id: '60196388539bdsawv8800272f3a36',
	// 		appointmentTimeStart: new Date(),
	// 		profileHCPid: {
	// 			lastName: 'Yellow'
	// 		},
	// 		accountHCPid: {
	// 			profilePicture:
	// 				'https://images.pexels.com/photos/6641336/pexels-photo-6641336.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
	// 		}
	// 	}
	// ];

	console.log(data)

	const classes = useStyles();

	const handleChange = (event) => {
		setAppointmentSelectedId(event.target.value);
	};

	const onFileChange = (e) => {
		let file = e.target.files[0];
		let reader = new FileReader();
		reader.onloadend = () => {
			setDocumentSelected(file);
		};
		reader.readAsDataURL(file);
	};

	const onFileUpload = async (file) => {
		let document = new FormData();
		document.append('document', file);
		document.append('documentName', documentName);
		let aptId = appointmentSelectedId
		console.log(aptId)
		try {
			await dianurseApi.post(`download/documents/${aptId}`, document);
			close();
		} catch (error) {
			console.log(error);
			setHasError(true);
		}
	};

	return (
		<Dialog
			open={isOpen}
			className={classes.root}
			onClose={close}
			aria-labelledby="upload-document"
			aria-describedby="upload-document"
		>
			<Grid className={classes.wrapper}>
				<IconButton className={classes.closeButton} onClick={close} color="primary">
					<CloseIcon />
				</IconButton>
			</Grid>
			{loading && (
				<Container className={classes.emptyState}>
					<Loader type="TailSpin" color="primary" height={80} width={80} />
				</Container>
			)}
			{(error || hasError) && <ErrorMessage />}
			{data && (
				<div>
					<Typography className={classes.title}>{title}</Typography>
					<Divider variant="middle" className={classes.divider} />
					<DialogContent>
						<form
							className={classes.wrapper}
							onSubmit={(e) => {
								e.preventDefault();
								onFileUpload(documentSelected);
							}}
						>
							<Grid container>
								<Grid className={classes.section} item xs={12}>
									<TextField
										fullWidth
										type="text"
										required
										value={documentName}
										onChange={(e) => setDocumentName(e.target.value)}
										label="Document Name"
										variant="outlined"
									/>
								</Grid>
								<Grid className={classes.section} item xs={12}>
									<input required type="file" onChange={onFileChange} />
								</Grid>
								<Grid item xs={12}>
									<FormControl fullWidth className={classes.selector} required>
										<FormLabel component="legend">Select an appointment</FormLabel>
										<RadioGroup
											aria-label="appointment"
											name="appointment"
											value={appointmentSelectedId}
											onChange={handleChange}
										>
											{data.patientAppointmentsForUpload.map((apt) => {
												return (
													<FormControlLabel
														value={apt._id}
														key={apt._id}
														control={<Radio />}
														label={
															<div className={classes.radioLabel}>
																<Avatar
																	className={classes.avatar}
																	alt={apt.profileHCPid.lastName}
																	src={
																		apt.accountHCPid.profilePicture.includes(
																			'http'
																		) ? (
																			apt.accountHCPid.profilePicture
																		) : (
																			`url(http://localhost:10101/dianurse/v1/profile/static/images/${apt
																				.accountHCPid.profilePicture})`
																		)
																	}
																/>
																<Typography className={classes.docName}>
																	Dr. {apt.profileHCPid.lastName}
																</Typography>
																<Typography>
																	{formatDateShort(apt.appointmentTimeStart)}
																</Typography>
															</div>
														}
													/>
												);
											})}
										</RadioGroup>
									</FormControl>
								</Grid>
								<Grid className={classes.section} item xs={12}>
									<ButtonFilled fullWidth type="submit">
										Upload
									</ButtonFilled>
								</Grid>
							</Grid>
						</form>
					</DialogContent>
				</div>
			)}
		</Dialog>
	);
};

export default DialogUploadDoc;
