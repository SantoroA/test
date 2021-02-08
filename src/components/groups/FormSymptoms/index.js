import React from 'react';
import useStyles from './style';
//CUSTOM UI
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

const FormSymptoms = ({ symptoms, handleChange }) => {
	const classes = useStyles();

	// difficultySleeping: true,
	// fatigue: true,
	// fever: false,
	// lossOfAppetite: false,
	// moodChanges: false,
	// nightSweats: false,
	// weightChange: false,
	// congestion: false,
	// difficultySwallowing: false,
	// earDrainage: true,
	// earPain: false,
	// eyeRedness: true,
	// noseBleed: false,
	// soreThroat: true,
	// headache: false,
	// hearingLoss: true,
	// nasalDischarge: false,
	// chestPain: false,
	// cough: true,
	// decreasedExerciseTolerance: false,
	// palpitations: true,
	// shortnessOfBreath: true,
	// phlegn: true,
	// wheezing: true,
	// abdominalPain: true,
	// bloodInStool: false,
	// constipation: true,
	// diarrhea: true,
	// heartburn: true,
	// nausea: false,
	// bloodInUrine: true,
	// discomfortUrination: false,
	// frequentUrination: true,
	// irregularPeriods: false,
	// vaginalBleeding: false,
	// vaginalDischarge: false,
	// dizzy: true,
	// lossOfConsciousness: false,
	// memoryLoss: true,
	// numbness: true,
	// tremors: false,
	// visionChanges: false,
	// bites: false,
	// bleeding: true,
	// bruising: true,
	// itching: false,
	// skinRashes: false,
	// sores: true,
	// swelling: false,
	// backPain: true,
	// jointStiffness: false,
	// limitedMobility: true,
	// musclePain: false,
	// muscleWeakness: true,
	// swelling: true

	return (
		<Grid container className={classes.root}>
			<Grid item>
				<PaperCustomShadow className={classes.symptomSection}>
					<Typography className={classes.sub} variant="h6">
						General Symptoms
					</Typography>
					<Grid container>
						<Grid sm={6} className={classes.column} item>
							<FormControl component="fieldset">
								<FormGroup>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.difficultySleeping}
												onChange={handleChange}
												name="difficultySleeping"
											/>
										}
										className={classes.label}
										label="Difficulty sleeping"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.fatigue}
												onChange={handleChange}
												name="fatigue"
											/>
										}
										className={classes.label}
										label="Fatigue / weakness"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.fever}
												onChange={handleChange}
												name="fever"
											/>
										}
										className={classes.label}
										label="Fever"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.lossOfAppetite}
												onChange={handleChange}
												name="lossOfAppetite"
											/>
										}
										className={classes.label}
										label="Loss of appetite"
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
												checked={symptoms.moodChanges}
												onChange={handleChange}
												name="moodChanges"
											/>
										}
										className={classes.label}
										label="Mood changes"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.nightSweats}
												onChange={handleChange}
												name="nightSweats"
											/>
										}
										className={classes.label}
										label="Night sweats"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.weightChange}
												onChange={handleChange}
												name="weightChange"
											/>
										}
										className={classes.label}
										label="Weight loss / gain"
									/>
								</FormGroup>
							</FormControl>
						</Grid>
					</Grid>
				</PaperCustomShadow>
			</Grid>
			<Grid item>
				<PaperCustomShadow className={classes.symptomSection}>
					<Typography className={classes.sub} variant="h6">
						Head / Neck
					</Typography>
					<Grid container>
						<Grid sm={6} className={classes.column} item>
							<FormControl component="fieldset">
								<FormGroup>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.congestion}
												onChange={handleChange}
												name="congestion"
											/>
										}
										className={classes.label}
										label="Congestion / sinus problem"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.difficultySwallowing}
												onChange={handleChange}
												name="difficultySwallowing"
											/>
										}
										className={classes.label}
										label="Difficulty / pain swallowing"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.earDrainage}
												onChange={handleChange}
												name="earDrainage"
											/>
										}
										className={classes.label}
										label="Ear drainage"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.earPain}
												onChange={handleChange}
												name="earPain"
											/>
										}
										className={classes.label}
										label="Ear pain"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.eyeRedness}
												onChange={handleChange}
												name="eyeRedness"
											/>
										}
										className={classes.label}
										label="Eye redness / discharge"
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
												checked={symptoms.headache}
												onChange={handleChange}
												name="headache"
											/>
										}
										className={classes.label}
										label="Headache"
									/>

									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.hearingLoss}
												onChange={handleChange}
												name="hearingLoss"
											/>
										}
										className={classes.label}
										label="Hearing loss / ringing"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.nasalDischarge}
												onChange={handleChange}
												name="nasalDischarge"
											/>
										}
										className={classes.label}
										label="Nasal discharge"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.noseBleed}
												onChange={handleChange}
												name="noseBleed"
											/>
										}
										className={classes.label}
										label="Nose bleeds"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.soreThroat}
												onChange={handleChange}
												name="soreThroat"
											/>
										}
										className={classes.label}
										label="Sore throat"
									/>
								</FormGroup>
							</FormControl>
						</Grid>
					</Grid>
				</PaperCustomShadow>
			</Grid>
			<Grid item>
				<PaperCustomShadow className={classes.symptomSection}>
					<Typography className={classes.sub} variant="h6">
						Chest
					</Typography>
					<Grid container>
						<Grid sm={6} className={classes.column} item>
							<FormControl component="fieldset">
								<FormGroup>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.chestiPain}
												onChange={handleChange}
												name="chestiPain"
											/>
										}
										className={classes.label}
										label="Chest pressure / pain"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.cough}
												onChange={handleChange}
												name="cough"
											/>
										}
										className={classes.label}
										label="Cough"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.decreasedExerciseTolerance}
												onChange={handleChange}
												name="decreasedExerciseTolerance"
											/>
										}
										className={classes.label}
										label="Decreased exercise tolerance"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.wheezing}
												onChange={handleChange}
												name="wheezing"
											/>
										}
										className={classes.label}
										label="Wheezing"
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
												checked={symptoms.shortnessOfBreath}
												onChange={handleChange}
												name="shortnessOfBreath"
											/>
										}
										className={classes.label}
										label="Shortness of breath"
									/>

									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.phlegm}
												onChange={handleChange}
												name="phlegm"
											/>
										}
										className={classes.label}
										label="Sputum / productive cough / phlegm"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.nasalDischarge}
												onChange={handleChange}
												name="nasalDischarge"
											/>
										}
										className={classes.label}
										label="Nasal discharge"
									/>
								</FormGroup>
							</FormControl>
						</Grid>
					</Grid>
				</PaperCustomShadow>
			</Grid>
			<Grid item>
				<PaperCustomShadow className={classes.symptomSection}>
					<Typography className={classes.sub} variant="h6">
						Gastrointestinal
					</Typography>
					<Grid container>
						<Grid sm={6} className={classes.column} item>
							<FormControl component="fieldset">
								<FormGroup>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.abdominalPain}
												onChange={handleChange}
												name="abdominalPain"
											/>
										}
										className={classes.label}
										label="Abdominal pain / discomfort"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.bloofInStool}
												onChange={handleChange}
												name="bloofInStool"
											/>
										}
										className={classes.label}
										label="Blood in stool"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.constipation}
												onChange={handleChange}
												name="constipation"
											/>
										}
										className={classes.label}
										label="Constipation"
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
												checked={symptoms.diarrhea}
												onChange={handleChange}
												name="diarrhea"
											/>
										}
										className={classes.label}
										label="Diarrhea"
									/>

									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.heartburn}
												onChange={handleChange}
												name="heartburn"
											/>
										}
										className={classes.label}
										label="Heartburn / reflux"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.nausea}
												onChange={handleChange}
												name="nausea"
											/>
										}
										className={classes.label}
										label="Nausea / vomiting"
									/>
								</FormGroup>
							</FormControl>
						</Grid>
					</Grid>
				</PaperCustomShadow>
			</Grid>
			<Grid item>
				<PaperCustomShadow className={classes.symptomSection}>
					<Typography className={classes.sub} variant="h6">
						Genitourinary
					</Typography>

					<Grid container>
						<Grid sm={6} className={classes.column} item>
							<FormControl component="fieldset">
								<FormGroup>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.bloodInUrine}
												onChange={handleChange}
												name="bloodInUrine"
											/>
										}
										className={classes.label}
										label="Blood in urine"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.discomfortUrination}
												onChange={handleChange}
												name="discomfortUrination"
											/>
										}
										className={classes.label}
										label="Discomfort / burning with urination"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.frequentUrination}
												onChange={handleChange}
												name="frequentUrination"
											/>
										}
										className={classes.label}
										label="Frequent urination"
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
												checked={symptoms.irregularPeriods}
												onChange={handleChange}
												name="irregularPeriods"
											/>
										}
										className={classes.label}
										label="Irregular periods"
									/>

									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.vaginalBleeding}
												onChange={handleChange}
												name="vaginalBleeding"
											/>
										}
										className={classes.label}
										label="Vaginal bleeding"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.vaginalDischarge}
												onChange={handleChange}
												name="vaginalDischarge"
											/>
										}
										className={classes.label}
										label="Vaginal discharge"
									/>
								</FormGroup>
							</FormControl>
						</Grid>
					</Grid>
				</PaperCustomShadow>
			</Grid>
			<Grid item>
				<PaperCustomShadow className={classes.symptomSection}>
					<Typography className={classes.sub} variant="h6">
						Neurological
					</Typography>

					<Grid container>
						<Grid sm={6} className={classes.column} item>
							<FormControl component="fieldset">
								<FormGroup>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.dizzy}
												onChange={handleChange}
												name="dizzy"
											/>
										}
										className={classes.label}
										label="Dizzy / lightheaded"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.lossOfConsciousness}
												onChange={handleChange}
												name="lossOfConsciousness"
											/>
										}
										className={classes.label}
										label="Loss of consciousness"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.memoryLoss}
												onChange={handleChange}
												name="memoryLoss"
											/>
										}
										className={classes.label}
										label="Memory Loss"
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
												checked={symptoms.numbness}
												onChange={handleChange}
												name="numbness"
											/>
										}
										className={classes.label}
										label="Numbness / tingling"
									/>

									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.tremors}
												onChange={handleChange}
												name="tremors"
											/>
										}
										className={classes.label}
										label="Tremors"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.visionChanges}
												onChange={handleChange}
												name="visionChanges"
											/>
										}
										className={classes.label}
										label="Visions changes"
									/>
								</FormGroup>
							</FormControl>
						</Grid>
					</Grid>
				</PaperCustomShadow>
			</Grid>
			<Grid item>
				<PaperCustomShadow className={classes.symptomSection}>
					<Typography className={classes.sub} variant="h6">
						Skin
					</Typography>

					<Grid container>
						<Grid sm={6} className={classes.column} item>
							<FormControl component="fieldset">
								<FormGroup>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.bites}
												onChange={handleChange}
												name="bites"
											/>
										}
										className={classes.label}
										label="Bites"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.bleeding}
												onChange={handleChange}
												name="bleeding"
											/>
										}
										className={classes.label}
										label="Bleeding"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.bruising}
												onChange={handleChange}
												name="bruising"
											/>
										}
										className={classes.label}
										label="Bruising / discoloration"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.itching}
												onChange={handleChange}
												name="itching"
											/>
										}
										className={classes.label}
										label="Itching"
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
												checked={symptoms.skinRashes}
												onChange={handleChange}
												name="skinRashes"
											/>
										}
										className={classes.label}
										label="Skin rashes / bumps"
									/>

									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.sores}
												onChange={handleChange}
												name="sores"
											/>
										}
										className={classes.label}
										label="Sores"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.swelling}
												onChange={handleChange}
												name="swelling"
											/>
										}
										className={classes.label}
										label="Swelling"
									/>
								</FormGroup>
							</FormControl>
						</Grid>
					</Grid>
				</PaperCustomShadow>
			</Grid>
			<Grid item>
				<PaperCustomShadow className={classes.symptomSection}>
					<Typography className={classes.sub} variant="h6">
						Musculskeletal
					</Typography>

					<Grid container>
						<Grid sm={6} className={classes.column} item>
							<FormControl component="fieldset">
								<FormGroup>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.backPain}
												onChange={handleChange}
												name="backPain"
											/>
										}
										className={classes.label}
										label="Back Pain"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.jointStiffness}
												onChange={handleChange}
												name="jointStiffness"
											/>
										}
										className={classes.label}
										label="Joint stiffness"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.limitedMobility}
												onChange={handleChange}
												name="limitedMobility"
											/>
										}
										className={classes.label}
										label="Limited motion / mobility"
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
												checked={symptoms.musclePain}
												onChange={handleChange}
												name="musclePain"
											/>
										}
										className={classes.label}
										label="Muscle pain"
									/>

									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.muscleWeakness}
												onChange={handleChange}
												name="muscleWeakness"
											/>
										}
										className={classes.label}
										label="Muscle weakness"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={symptoms.muscleSwelling}
												onChange={handleChange}
												name="muscleSwelling"
											/>
										}
										className={classes.label}
										label="Swelling"
									/>
								</FormGroup>
							</FormControl>
						</Grid>
					</Grid>
				</PaperCustomShadow>
			</Grid>
		</Grid>
	);
};

export default FormSymptoms;
