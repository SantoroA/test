import React, { useState, useContext, useEffect, createRef } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import logo from '../../assets/dianurse-logo.png';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
//CUSTOM UI
import ButtonFilled from '../customUi/ButtonFilled';
import ButtonOutlined from '../customUi/ButtonOutlined';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
	layout: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
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
		justifyContent: 'center',
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
        justifyContent: 'center'
    }
});

export default function DialogPicture({ isDialogOpen, setIsDialogOpen }) {
	const { updateImage, state: { image, userId } } = useContext(AuthContext);
	const [ imageChange, setImageChange ] = useState(image);
	const inputFileRef = createRef(null);
	const classes = useStyles();
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('submit');
		updateImage({
			id: userId,
			image: imageChange
		});
		setIsDialogOpen(false);
	};
	const handleClose = () => {
		setIsDialogOpen(false);
		setImageChange(image);
	};
	console.log(imageChange);
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
							<Grid item xs={12} justifyContent="center" className={classes.imageContainer}>
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
								<label htmlFor="upload-photo">
									<TextField
										fullWidth
										type="file"
										id="upload-photo"
										name="upload-photo"
										style={{ display: 'none' }}
										ref={inputFileRef}
										onChange={(e) => {
											let newImage = e.target?.files?.[0];
											newImage = newImage ? setImageChange(URL.createObjectURL(newImage)) : null;
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
