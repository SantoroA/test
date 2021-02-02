import React, { useState, useContext } from 'react';
import { Context as DocProfileContext } from '../../../context/DocProfileContext';
import { Context as AuthContext } from '../../../context/AuthContext';
import useStyles from './style';
//CUSTOM UI
import ButtonFilled from '../../customUi/ButtonFilled';
import ButtonOutlined from '../../customUi/ButtonOutlined';
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';

const FormEducation = () => {
	const { updateEducation, state } = useContext(DocProfileContext);
	// const userId = '5fe8b0c48bef090026e253b7';
	const { state: { userId } } = useContext(AuthContext);
	const [ education, setEducation ] = useState(state.education);
	const [ isDisabled, setIsDisabled ] = useState(true);
	const classes = useStyles();

	const handleSubmit = () => {
		updateEducation({
			id: userId,
			education
		});
	};

	return (
		<Container className={classes.container}>
			<PaperCustomShadow className={classes.paper}>
				<Grid container className={classes.gridContainer}>
					<Grid item className={classes.title}>
						<Typography variant="h6">Education</Typography>
						<IconButton onClick={() => setIsDisabled(false)}>
							<EditIcon />
						</IconButton>
					</Grid>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit();
							setIsDisabled(true);
						}}
						className={classes.form}
					>
						<Grid container className={classes.input}>
							<TextField
								fullWidth
								disabled={isDisabled}
								type="number"
								value={education}
								onChange={(e) => setEducation(e.target.value)}
								placeholder="Add information about your studies"
								variant="outlined"
								multiline
								rows={6}
							/>
						</Grid>

						{isDisabled ? null : (
							<Grid container className={classes.buttons}>
								<Grid item xs={6} className={classes.button}>
									<ButtonOutlined
										onClick={() => {
											setIsDisabled(true);
											setEducation(state.education);
										}}
										fullWidth
										variant="outlined"
									>
										Cancel
									</ButtonOutlined>
								</Grid>
								<Grid item xs={6} className={classes.button}>
									<ButtonFilled type="submit" variant="contained" color="primary" fullWidth>
										Update
									</ButtonFilled>
								</Grid>
							</Grid>
						)}
					</form>
				</Grid>
			</PaperCustomShadow>
		</Container>
	);
};

export default FormEducation;
