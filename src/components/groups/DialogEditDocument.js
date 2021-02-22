import React, { useState } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import dianurseApi from '../../api/dianurseApi';
import ErrorMessage from './ErrorMessage';
//CUSTOM UI
import ButtonFilled from '../customUi/ButtonFilled';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
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

const DialogEditDocument = ({ isOpen, close, title, documentTitle, aptId, documentLink }) => {
	const [ documentSelected, setDocumentSelected ] = useState('');
	const [ fileName, setFileName ] = useState('');
	const [ hasError, setHasError ] = useState(false);
	const [ documentName, setDocumentName ] = useState(documentTitle);
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
		let document = new FormData();
		document.append('document', file);
		document.append('documentName', documentName);
		try {
			await dianurseApi.put(`download/documents/${aptId}`, document);
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
				setFileName('');
				setHasError(false);
				setDocumentSelected('');
			}}
			aria-labelledby="upload-document"
			aria-describedby="upload-document"
		>
			<Grid className={classes.wrapper}>
				<IconButton
					className={classes.closeButton}
					onClick={() => {
						close();
						setFileName('');
						setHasError(false);
						setDocumentSelected(false);
					}}
					color="primary"
				>
					<CloseIcon />
				</IconButton>

				<Typography className={classes.title}>{title}</Typography>
			</Grid>
			<Divider variant="middle" className={classes.divider} />
			<DialogContent>
				{hasError ? (
					<ErrorMessage />
				) : (
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
				)}
			</DialogContent>
		</Dialog>
	);
};

export default DialogEditDocument;
