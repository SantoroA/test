import React from 'react';
import useStyles from './style';
import { animateScroll as scroll } from 'react-scroll';
//CUSTOM UI
import ButtonFilled from '../../customUi/ButtonFilled';
import ToggleYesNoButton from '../../customUi/ToggleYesNoButton';
import ButtonNoBorder from '../../customUi/ButtonNoBorder';
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const FormHealthProfile = ({
	onSubmitForm,
	isTakingMeds,
	setIsTakingMeds,
	hasDrugAllergies,
	setHasDrugAllergies,
	submitText,
	medConditions,
	handleChangeMedCondition
}) => {
	const classes = useStyles();
	return (
		<Container maxWidth="sm">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					onSubmitForm();
					scroll.scrollToTop();
				}}
			>
				<PaperCustomShadow className={classes.paper}>
					<Grid container className={classes.yesNoButtons}>
						<Grid item xs={12}>
							<Typography className={classes.sub} variant="h6">
								Are you currently taking any medications?
							</Typography>
						</Grid>
						<Grid className={classes.buttonOutlined} item xs={5} sm={4}>
							<ToggleYesNoButton
								selected={isTakingMeds}
								value="is-taking-meds"
								onClick={() => setIsTakingMeds(!isTakingMeds)}
							>
								Yes
							</ToggleYesNoButton>
						</Grid>
						<Grid item className={classes.buttonOutlined} xs={5} sm={4}>
							<ToggleYesNoButton
								selected={!isTakingMeds}
								value="is-not-taking-meds"
								onClick={() => setIsTakingMeds(!isTakingMeds)}
							>
								No
							</ToggleYesNoButton>
						</Grid>
					</Grid>
				</PaperCustomShadow>
				<PaperCustomShadow className={classes.paper}>
					<Grid container className={classes.yesNoButtons}>
						<Grid item xs={12}>
							<Typography className={classes.sub} variant="h6">
								Do you have any known drug allergies?
							</Typography>
						</Grid>
						<Grid className={classes.buttonOutlined} item xs={5} sm={4}>
							<ToggleYesNoButton
								value="has-drug-alergies"
								selected={hasDrugAllergies}
								onClick={() => setHasDrugAllergies(!hasDrugAllergies)}
							>
								Yes
							</ToggleYesNoButton>
						</Grid>
						<Grid item className={classes.buttonOutlined} xs={5} sm={4}>
							<ToggleYesNoButton
								value="doesnt-have-drug-alergies"
								selected={!hasDrugAllergies}
								onClick={() => setHasDrugAllergies(!hasDrugAllergies)}
							>
								No
							</ToggleYesNoButton>
						</Grid>
					</Grid>
				</PaperCustomShadow>
				<Grid container className={classes.root}>
					<Grid item>
						<PaperCustomShadow className={classes.medConditionSection}>
							<Typography className={classes.sub} variant="h6">
								Do you have any medical conditions?
							</Typography>
							<Grid container>
								<Grid sm={6} className={classes.column} item>
									<FormControl component="fieldset">
										<FormGroup>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.abnormalThyroid}
														onChange={handleChangeMedCondition}
														name="abnormalThyroid"
													/>
												}
												className={classes.label}
												label="Abnormal Thyroid"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.anxiety}
														onChange={handleChangeMedCondition}
														name="anxiety"
													/>
												}
												className={classes.label}
												label="Anxiety"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.arthritis}
														onChange={handleChangeMedCondition}
														name="arthritis"
													/>
												}
												className={classes.label}
												label="Arthritis"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.asthma}
														onChange={handleChangeMedCondition}
														name="asthma"
													/>
												}
												className={classes.label}
												label="Asthma"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.cronicKidneyDisease}
														onChange={handleChangeMedCondition}
														name="cronicKidneyDisease"
													/>
												}
												className={classes.label}
												label="Chronic Kidney Disease"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.chronicPain}
														onChange={handleChangeMedCondition}
														name="chronicPain"
													/>
												}
												className={classes.label}
												label="Chronic Pain"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.COPD}
														onChange={handleChangeMedCondition}
														name="COPD"
													/>
												}
												className={classes.label}
												label="COPD"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.depression}
														onChange={handleChangeMedCondition}
														name="depression"
													/>
												}
												className={classes.label}
												label="Depression"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.diabetes}
														onChange={handleChangeMedCondition}
														name="diabetes"
													/>
												}
												className={classes.label}
												label="Diabetes"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.foreignTravel}
														onChange={handleChangeMedCondition}
														name="foreignTravel"
													/>
												}
												className={classes.label}
												label="Foreign Travel (past month)"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.heartDisease}
														onChange={handleChangeMedCondition}
														name="heartDisease"
													/>
												}
												className={classes.label}
												label="Heart Disease"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.hemophilia}
														onChange={handleChangeMedCondition}
														name="hemophilia"
													/>
												}
												className={classes.label}
												label="Hemophilia"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.highBloodPressure}
														onChange={handleChangeMedCondition}
														name="highBloodPressure"
													/>
												}
												className={classes.label}
												label="High blood pressure"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.highCholesterol}
														onChange={handleChangeMedCondition}
														name="highCholesterol"
													/>
												}
												className={classes.label}
												label="High cholesterol"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.historyOfFainting}
														onChange={handleChangeMedCondition}
														name="historyOfFainting"
													/>
												}
												className={classes.label}
												label="History of fainting/seizure"
											/>
										</FormGroup>
									</FormControl>
								</Grid>
								<Grid sm={6} className={classes.column} item>
									<FormControl component="fieldset">
										<FormGroup>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.historyOfFalls}
														onChange={handleChangeMedCondition}
														name="historyOfFalls"
													/>
												}
												className={classes.label}
												label="Histoy of falls"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.historyOfSkinCancer}
														onChange={handleChangeMedCondition}
														name="historyOfSkinCancer"
													/>
												}
												className={classes.label}
												label="History of skin cancer"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.historyOfSTD}
														onChange={handleChangeMedCondition}
														name="historyOfSTD"
													/>
												}
												className={classes.label}
												label="History of STD"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.historyOfStroke}
														onChange={handleChangeMedCondition}
														name="historyOfStroke"
													/>
												}
												className={classes.label}
												label="History of stroke"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.hospitalized}
														onChange={handleChangeMedCondition}
														name="hospitalized"
													/>
												}
												className={classes.label}
												label="Hospitalized (past six months)"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.insomnia}
														onChange={handleChangeMedCondition}
														name="insomnia"
													/>
												}
												className={classes.label}
												label="Insomnia"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.ironDeficiency}
														onChange={handleChangeMedCondition}
														name="ironDeficiency"
													/>
												}
												className={classes.label}
												label="Iron deficiency"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.jointReplacement}
														onChange={handleChangeMedCondition}
														name="jointReplacement"
													/>
												}
												className={classes.label}
												label="Joint replacement"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.nicotineDependance}
														onChange={handleChangeMedCondition}
														name="nicotineDependance"
													/>
												}
												className={classes.label}
												label="Nicotine dependance"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.obesity}
														onChange={handleChangeMedCondition}
														name="obesity"
													/>
												}
												className={classes.label}
												label="Obesity"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.prediabetes}
														onChange={handleChangeMedCondition}
														name="prediabetes"
													/>
												}
												className={classes.label}
												label="Prediabetes"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.pregnant}
														onChange={handleChangeMedCondition}
														name="pregnant"
													/>
												}
												className={classes.label}
												label="Pregnant"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.rheumatoidArthritis}
														onChange={handleChangeMedCondition}
														name="rheumatoidArthritis"
													/>
												}
												className={classes.label}
												label="Rheumatoid arthritis"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.seasonalAllergies}
														onChange={handleChangeMedCondition}
														name="seasonalAllergies"
													/>
												}
												className={classes.label}
												label="Seasonal allergies / allergic rhinitis"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={medConditions.substanceAbuse}
														onChange={handleChangeMedCondition}
														name="substanceAbuse"
													/>
												}
												className={classes.label}
												label="Substance abuse"
											/>
										</FormGroup>
									</FormControl>
								</Grid>
							</Grid>
						</PaperCustomShadow>
					</Grid>
				</Grid>
				<Grid container className={classes.buttonWrapper}>
					<Grid item xs={5} sm={3}>
						<ButtonNoBorder
							className={classes.skipButton}
							onClick={() => {
								scroll.scrollToTop();
								onSubmitForm();
							}}
						>
							<Typography>Skip question</Typography>
						</ButtonNoBorder>
					</Grid>
					<Grid item xs={5} sm={3}>
						<ButtonFilled fullWidth className={classes.nextButton} type="submit">
							{submitText}
						</ButtonFilled>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
};

export default FormHealthProfile;
