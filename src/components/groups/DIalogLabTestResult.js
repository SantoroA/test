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
	}
});

const DialogLabTestResult = ({ isOpen, close, docName, aptId }) => {
	const { state: { userId } } = useContext(AuthContext);
	const [ documentSelected, setDocumentSelected ] = useState('');

	const classes = useStyles();

	const onFileChange = (e) => {
		let file = e.target.files;
		console.log(file);
		setDocumentSelected(file);
	};

	const onFileUpload = (file) => {
		console.log(file);
		let labTest = new FormData();
		const files = file;

		for (let i = 0; i < files.length; i++) {
			labTest.append(`labTest`, files[i]);
		}

		// labTest.append('labTest', file);
		try {
			dianurseApi.post(`download/labTest/${aptId}`, labTest);
		} catch (error) {
			console.log(error);
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
				<Typography className={classes.title}>Upload Result for Dr. {docName}</Typography>
			</Grid>
			<Divider variant="middle" className={classes.divider} />
			<DialogContent>
				<form
					className={classes.wrapper}
					onSubmit={(e) => {
						e.preventDefault();
						onFileUpload(documentSelected);
						close();
					}}
				>
					<Grid container>
						<Grid className={classes.section} item xs={12}>
							<input type="file" required onChange={onFileChange} multiple />
						</Grid>

						<Grid className={classes.section} item xs={12}>
							<ButtonFilled fullWidth type="submit">
								Upload
							</ButtonFilled>
						</Grid>
					</Grid>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default DialogLabTestResult;
