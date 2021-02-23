import React, { useState, useContext } from 'react';
import { Context as AuthContext } from '../../../context/AuthContext';
import { Context as DocProfileContext } from '../../../context/DocProfileContext';
import { Context as PatProfileContext } from '../../../context/PatProfileContext';
import logo from '../../../assets/dianurse-logo.png';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import useStyles from './style';
import dianurseApi from '../../../api/dianurseApi';
import ErrorMessage from '../ErrorMessage';
import ButtonNoBorder from '../../customUi/ButtonNoBorder';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';

export default function DialogPicture({ isDialogOpen, setIsDialogOpen }) {
	const { state: { userId, userAmIHCP } } = useContext(AuthContext);
	const { state: { image } } = useContext(userAmIHCP ? DocProfileContext : PatProfileContext);
	const [ hasError, setHasError ] = useState(false);
	const [ imageSelected, setImageSelected ] = useState('');
	const [ imagePreview, setImagePreview ] = useState(image);
	const classes = useStyles();

	const onFileUpload = async (file) => {
		let profileImage = new FormData();
		profileImage.append('profileImage', file);
		let id = userId;
		try {
			await dianurseApi.put(`profile/completeprofile/uploadImage/${id}`, profileImage);
			setIsDialogOpen(false);
		} catch (error) {
			console.log(error);
			setHasError(true);
		}
	};

	const handleClose = () => {
		setIsDialogOpen(false);
		setImageSelected('');
		setImagePreview(image);
		setHasError(false);
	};

	const onFileChange = (e) => {
		let file = e.target.files[0];
		let reader = new FileReader();
		reader.onloadend = () => {
			setImageSelected(file);
			setImagePreview(reader.result);
		};
		reader.readAsDataURL(file);
	};

	console.log(imageSelected);
	// console.log(image);
	return (
		<Dialog
			open={isDialogOpen}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<Grid className={classes.layout}>
				<IconButton className={classes.closeButton} onClick={handleClose} color="primary">
					<CloseIcon />
				</IconButton>
				<img src={logo} alt="Logo" className={classes.logo} />
				<Typography>Upload a new picture</Typography>
			</Grid>
			<Divider variant="middle" className={classes.divider} />
			<DialogContent>
				<Grid className={classes.layout}>
					{hasError ? (
						<ErrorMessage />
					) : (
						<Grid container className={classes.dialogContent}>
							<Grid item>
								{imageSelected ? (
									<Paper
										style={{
											backgroundImage: `url(${imagePreview})`,

											backgroundSize: 'cover',
											backgroundRepeat: 'no-repeat',
											backgroundPosition: 'center'
										}}
										className={classes.media}
									/>
								) : (
									<Paper
										style={{
											backgroundImage: image.includes('http')
												? `url(${image})`
												: `url(http://localhost:10101/dianurse/v1/profile/static/images/${image})`,
											backgroundSize: 'cover',
											backgroundRepeat: 'no-repeat',
											backgroundPosition: 'center'
										}}
										className={classes.media}
									/>
								)}
								<Grid container className={classes.buttonContainer}>
									<Grid item>
										<label className={classes.imageInputLabel} for="image-select">
											<EditIcon color="primary" />
											<Typography variant="body1" color="primary">
												Select image
											</Typography>
										</label>
										<input
											className={classes.imageInput}
											id="image-select"
											type="file"
											onChange={onFileChange}
										/>
									</Grid>
									<Grid item>
										<ButtonNoBorder
											className={classes.saveButton}
											onClick={() => onFileUpload(imageSelected)}
										>
											<div className={classes.saveButton}>
												<SaveAltIcon color="primary" />
												<Typography variant="body1" color="primary">
													Save
												</Typography>
											</div>
										</ButtonNoBorder>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					)}
				</Grid>
			</DialogContent>
		</Dialog>
	);
}
