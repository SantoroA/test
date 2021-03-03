import React, { useState, useContext } from 'react';
import { formatDateShort } from '../../helpers/dateHelper';
import { Context as AuthContext } from '../../context/AuthContext';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { DOCUMENTS_QUERY, MYAPPOINTMENTS_QUERY } from '../../context/GraphQl/graphQlQuery';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import dianurseApi from '../../api/dianurseApi';
import ErrorMessage from './ErrorMessage';
//CUSTOM UI
import ButtonFilled from '../customUi/ButtonFilled';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import AttachFileIcon from '@material-ui/icons/AttachFile';

const useStyles = makeStyles({
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
		padding: '1rem'
	},

	divider: {
		marginTop: '1rem',
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
	header: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	title: {
		fontWeight: 'bold',
		minWidth: '20rem'
	}
});

// const MYAPPOINTMENTS_QUERY = gql`
// 	query GetAppointments($id: ID!) {
// 		patientAppointmentsForUpload(id: $id) {
// 			_id
// 			appointmentTimeStart
// 			profileHCPid {
// 				firstName
// 				lastName
// 			}
// 			accountHCPid {
// 				profilePicture
// 			}
// 		}
// 	}
// `;

const DialogUploadDoc = ({ isOpen, close, title, updateDoc }) => {
	const { state: { userId } } = useContext(AuthContext);
	const [ documentSelected, setDocumentSelected ] = useState('');
	const [ hasError, setHasError ] = useState(false);
	const [ fileName, setFileName ] = useState('');
	const [ documentName, setDocumentName ] = useState('');
	const [ appointmentSelectedId, setAppointmentSelectedId ] = useState('');
	const { loading, error, data, refetch } = useQuery(MYAPPOINTMENTS_QUERY, {
		variables: { id: userId, cursor: null }
	});
	// const { refetch } = useQuery(DOCUMENTS_QUERY, {
	// 	variables: {idPatient: userId}
	// })

	// update query appointment and docs

	console.log(userId);
	// const data = {
	// 	patientAppointmentsForUpload: [
	// 		{
	// 			_id: '60196388539b8sdf800272f3a36',
	// 			appointmentTimeStart: new Date(),
	// 			profileHCPid: {
	// 				lastName: 'Green'
	// 			},
	// 			accountHCPid: {
	// 				profilePicture:
	// 					'https://images.pexels.com/photos/6204377/pexels-photo-6204377.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
	// 			}
	// 		},
	// 		{
	// 			_id: '60196388539bsdf88002sdc72f3a36',
	// 			appointmentTimeStart: new Date(),
	// 			profileHCPid: {
	// 				lastName: 'Blue'
	// 			},
	// 			accountHCPid: {
	// 				profilePicture:
	// 					'https://images.pexels.com/photos/4484145/pexels-photo-4484145.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
	// 			}
	// 		},
	// 		{
	// 			_id: '6019638qw8539bdsv8800272f3a36',
	// 			appointmentTimeStart: new Date(),
	// 			profileHCPid: {
	// 				lastName: 'Red'
	// 			},
	// 			accountHCPid: {
	// 				profilePicture:
	// 					'https://images.pexels.com/photos/704977/pexels-photo-704977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
	// 			}
	// 		},
	// 		{
	// 			_id: '6019ffe63885rg39bdsv8800272f3a36',
	// 			appointmentTimeStart: new Date(),
	// 			profileHCPid: {
	// 				lastName: 'Purple'
	// 			},
	// 			accountHCPid: {
	// 				profilePicture:
	// 					'https://images.pexels.com/photos/6496035/pexels-photo-6496035.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
	// 			}
	// 		},
	// 		{
	// 			_id: '601963885qwefg39bdsv8800272f3a36',
	// 			appointmentTimeStart: new Date(),
	// 			profileHCPid: {
	// 				lastName: 'Orange'
	// 			},
	// 			accountHCPid: {
	// 				profilePicture:
	// 					'https://images.pexels.com/photos/6033988/pexels-photo-6033988.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
	// 			}
	// 		},
	// 		{
	// 			_id: '60196388539bdsawv8800272f3a36',
	// 			appointmentTimeStart: new Date(),
	// 			profileHCPid: {
	// 				lastName: 'Yellow'
	// 			},
	// 			accountHCPid: {
	// 				profilePicture:
	// 					'https://images.pexels.com/photos/6641336/pexels-photo-6641336.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
	// 			}
	// 		}
	// 	]
	// };

	const classes = useStyles();

	const handleChange = (event) => {
		setAppointmentSelectedId(event.target.value);
	};

	const onFileChange = (e) => {
		let file = e.target.files[0];
		let reader = new FileReader();
		reader.onloadend = () => {
			setDocumentSelected(file);
			setFileName(file.name);
		};
		reader.readAsDataURL(file);
	};

	const onFileUpload = async (file) => {
		let document = new FormData();
		document.append('document', file);
		document.append('documentName', documentName);
		let aptId = appointmentSelectedId;
		console.log(aptId);
		try {
			await dianurseApi.put(`download/documents/${aptId}`, document);
			// await refetch({variable: {idPatient: userId}});
			refetch();
			updateDoc();
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
			onClose={() => {
				close();
				setHasError(false);
				setFileName('');
				setDocumentSelected('');
			}}
			aria-labelledby="upload-document"
			aria-describedby="upload-document"
		>
			<div>
				<form
					className={classes.wrapper}
					onSubmit={(e) => {
						e.preventDefault();
						onFileUpload(documentSelected);
					}}
				>
					<Grid container className={classes.wrapper}>
						<Grid item className={classes.header}>
							<Typography className={classes.title}>Upload Document</Typography>
							<IconButton
								onClick={() => {
									close();
									setHasError(false);
									setFileName('');
									setDocumentSelected('');
								}}
								color="primary"
							>
								<CloseIcon />
							</IconButton>
						</Grid>
						<Divider className={classes.divider} />
						{loading && (
							<Container className={classes.emptyState}>
								<Loader type="TailSpin" color="primary" height={80} width={80} />
							</Container>
						)}
						{(error || hasError) && <ErrorMessage />}
						{data && (
							<div>
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

								<Grid item className={classes.section} xs={12}>
									<FormControl variant="outlined" fullWidth required>
										<InputLabel id="apt-select-label">Select Appoitment</InputLabel>
										<Select
											labelId="apt-select-label"
											value={appointmentSelectedId}
											onChange={(e) => setAppointmentSelectedId(e.target.value)}
											label="Select Appointment"
										>
											{data.patientAppointmentsForUpload.map((apt, i) => {
												return (
													<MenuItem key={i} value={apt._id}>
														<Avatar
															className={classes.avatar}
															alt={apt.profileHCPid.lastName}
															src={apt.accountHCPid.profilePicture}
														/>
														<Typography className={classes.docName}>
															Dr. {apt.profileHCPid.lastName}
														</Typography>
														<Typography>
															{formatDateShort(apt.appointmentTimeStart)}
														</Typography>
													</MenuItem>
												);
											})}
										</Select>
									</FormControl>
								</Grid>
								<Grid className={classes.section} item xs={12}>
									<label className={classes.documentInputLabel} htmlFor="document-select">
										<AttachFileIcon color="primary" />
										<Typography variant="body1" color="primary">
											Browse files
										</Typography>
									</label>
									<Typography variant="body2" color="textSecondary">
										{fileName}
									</Typography>
									<input
										className={classes.documentInput}
										required
										id="document-select"
										type="file"
										onChange={onFileChange}
									/>
								</Grid>
								<Grid className={classes.section} item xs={12}>
									<ButtonFilled fullWidth type="submit">
										Upload
									</ButtonFilled>
								</Grid>
							</div>
						)}
					</Grid>
				</form>
			</div>
		</Dialog>
	);
};

export default DialogUploadDoc;
