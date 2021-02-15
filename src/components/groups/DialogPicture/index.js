import React, { useState, useContext, createRef } from 'react';
import { Context as AuthContext } from '../../../context/AuthContext';
import { Context as DocProfileContext } from '../../../context/DocProfileContext';
import { Context as PatProfileContext } from '../../../context/PatProfileContext';
import logo from '../../../assets/dianurse-logo.png';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import useStyles from './style';
import dianurseApi from '../../../api/dianurseApi';
import axios from 'axios';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';

export default function DialogPicture({ isDialogOpen, setIsDialogOpen }) {
	const { updateImage, state: { userId, userAmIHCP } } = useContext(AuthContext);
	// const { state: { image } } = useContext(userAmIHCP ? DocProfileContext : PatProfileContext);
	const [ imageSelected, setImageSelected ] = useState('');
	const [ imagePreview, setImagePreview ] = useState('');
	const classes = useStyles();

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	console.log('submit');
	// 	updateImage({
	// 		id: userId,
	// 		userAmIHCP,
	// 		image: imageSelected
	// 	});
	// 	setIsDialogOpen(false);
	// };

	const onFileUpload = (file) => {
		let formData = new FormData();
		console.log(formData);
		formData.append('image', 'test');
		console.log(file);
		try {
			dianurseApi.put(`profile/completeprofile/uploadImage/${userId}`, formData);
		} catch (error) {
			console.log(error);
		}
	};

	const handleClose = () => {
		setIsDialogOpen(false);
		// setImageSelected(image);
		// setImagePreview(image);
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
				<Divider className={classes.divider} />
				<DialogContent>
					{/* <form onSubmit={handleSubmit}> */}
					{/* <Typography>Edit your picture</Typography> */}
					<Grid container>
						<Grid item xs={12} justifycontent="center" className={classes.imageContainer}>
							{imageSelected !== null ? (
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
								<Paper className={classes.media} />
							)}
						</Grid>
						<Grid item xs={6}>
							<input type="file" onChange={onFileChange} />
							<button onClick={() => onFileUpload(imageSelected)}>Upload</button>
							{/* <label htmlFor="uploadphoto">
									<TextField
										fullWidth
										type="file"
										id="uploadphoto"
										name="uploadphoto"
										style={{ display: 'none' }}
										ref={inputFileRef}
										onChange={(e) => {
											let newImage = e.target?.files?.[0]; // this is for the DATABASE
											console.log('this is The NEwIMAGE', newImage);
											newImage = newImage ? setImageChange(URL.createObjectURL(newImage)) : null;
											console.log('this is The SECOND NEwIMAGE', newImage);
										}}
									/>
									<IconButton component="span">
										<EditIcon color="primary" />
									</IconButton>
									<Typography variant="body1" color="primary">
										Upload
									</Typography>
								</label> */}
						</Grid>
						{/* <Grid item xs={6}>
							<IconButton type="submit">
								<SaveAltIcon color="primary" />
							</IconButton>
							<Typography variant="body1" color="primary">
								Save
							</Typography>
						</Grid> */}
					</Grid>
					{/* </form> */}
				</DialogContent>
				<DialogActions />
			</Grid>
		</Dialog>
	);
}
