import React, { useState, useContext } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import dianurseApi from '../../api/dianurseApi';
//CUSTOM UI
import ButtonFilled from '../customUi/ButtonFilled';
//CUSTOM ICONS
import ErrorIcon from '../customIcons/ErrorIcon';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import AttachFileIcon from '@material-ui/icons/AttachFile';

const useStyles = makeStyles({
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
		justifycontent: 'center',
		alignItems: 'center',
		paddingRight: '1rem',
		paddingLeft: '1rem',
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
	},
	layout: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '3rem',
		textAlign: 'center'
	},

	icon: {
		fontSize: '5rem',
		marginTop: '1rem',
		marginBottom: '2rem'
	},
	text: {
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
	}
});

const DialogLabTestResult = ({ isOpen, close, docName, aptId, setDialogErrorOpen, requestName }) => {
	const { state: { userId } } = useContext(AuthContext);
	const [ documentSelected, setDocumentSelected ] = useState('');
	const [ fileName, setFileName ] = useState('');
	const [ hasError, setHasError ] = useState(false);
	const classes = useStyles();

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
		let labTest = new FormData();
		const files = documentSelected;
		labTest.append(`labTest`, files);
		labTest.append(`requestName`, requestName);

		try {
			await dianurseApi.put(`download/labTest/${aptId}`, labTest);
			close();
		} catch (error) {
			console.log('inside error');
			setHasError(true);
		}
	};

	return (
		<Dialog
			open={isOpen}
			className={classes.root}
			onClose={() => {
				close();
				setFileName('');
				setHasError(false);
				setDocumentSelected('');
			}}
			aria-labelledby="upload-document"
			aria-describedby="upload-document"
		>
			{hasError ? (
				<Grid className={classes.layout}>
					<IconButton
						className={classes.closeButton}
						onClick={() => {
							close();
							setFileName('');
							setHasError(false);
							setDocumentSelected('');
						}}
						color="secondary"
					>
						<CloseIcon />
					</IconButton>
					<ErrorIcon className={classes.icon} />
					<Typography className={classes.text} variant="body1">
						We're sorry but there was an unexpected error. Please try again later.
					</Typography>
				</Grid>
			) : (
				<div>
					<Grid className={classes.wrapper}>
						<IconButton className={classes.closeButton} onClick={close} color="primary">
							<CloseIcon />
						</IconButton>
						<Typography className={classes.title}>Upload Result for Dr. {docName}</Typography>
					</Grid>
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
									<label className={classes.documentInputLabel} for="document-select">
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
							</Grid>
						</form>
					</DialogContent>
				</div>
			)}
		</Dialog>
	);
};

export default DialogLabTestResult;
