import React, { useState, useContext, useEffect, createRef } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as DocProfileContext } from '../../context/DocProfileContext';
import logo from '../../assets/dianurse-logo.png';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

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
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
	layout: {
		display: 'flex',
		flexDirection: 'column',
		justifycontent: 'center',
		alignItems: 'center',
		padding: '2rem',

		textAlign: 'center'
	},
	logo: {
		width: '8rem',
		marginBottom: '2rem'
	},
	divider: {
		marginTop: '1rem',
		marginBottom: '1rem'
	},
	closeButton: {
		alignSelf: 'flex-end'
	},
	media: {
		borderRadius: '50%',
		justifycontent: 'center',
		width: '14rem',
		height: '14rem',
		marginTop: '1rem',
		marginBottom: '1rem',
		boxShadow: '0px 6px 12px 0px rgba(16, 30, 115, 0.06)',
		backgroundColor: 'rgba(232, 232, 232, 1)',
		color: 'rgba(160, 164, 168, 1)'
	},
	imageContainer: {
		display: 'flex',
		justifycontent: 'center'
	}
});

export default function DialogPicture({ isDialogOpen, setIsDialogOpen }) {
	const { updateImage, state: { userId, userAmIHCP } } = useContext(AuthContext);
	const { state: { image } } = useContext(DocProfileContext);
	const [ imageChange, setImageChange ] = useState(image);
	const inputFileRef = createRef(null);
	const classes = useStyles();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('submit');
		updateImage({
			id: userId,
			userAmIHCP,
			image: imageChange
		});
		setIsDialogOpen(false);
	};

	const handleClose = () => {
		setIsDialogOpen(false);
		setImageChange(image);
	};
	console.log(imageChange);
	console.log(image);
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
					<form onSubmit={handleSubmit}>
						<Typography>Edit your picture</Typography>
						<Grid container>
							<Grid item xs={12} justifycontent="center" className={classes.imageContainer}>
								{imageChange !== null ? (
									<Paper
										style={{
											backgroundImage: `url(${imageChange})`,
											backgroundSize: 'contain',
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
								<label htmlFor="uploadphoto">
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
								</label>
							</Grid>
							<Grid item xs={6}>
								<IconButton type="submit">
									<SaveAltIcon color="primary" />
								</IconButton>
								<Typography variant="body1" color="primary">
									Save
								</Typography>
							</Grid>
						</Grid>
					</form>
				</DialogContent>
				<DialogActions />
			</Grid>
		</Dialog>
	);
}
