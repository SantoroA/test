import React, { useState, useContext } from 'react';
import useStyles from './style';
import EmptySurveyState from './emptyState';
import { convertTime, formatDateShort } from '../../../helpers/dateHelper';
import { useTranslation } from 'react-i18next';
import DialogCompleteSurvey from '../../groups/DialogCompleteSurvey';
import { useQuery } from '@apollo/client';
import { SURVEYPATIENT_QUERY } from '../../../context/GraphQl/graphQlQuery';
import { Context as AuthContext } from '../../../context/AuthContext';
import ErrorMessage from '../../groups/ErrorMessage';
import Loader from 'react-loader-spinner';
//CUSTOM UI
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
import ButtonNoBorder from '../../customUi/ButtonNoBorder';
//MATERIAL UI
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const TabSurveys = () => {
	const [ isDialogCompleteOpen, setIsDialogCompleteOpen ] = useState(false);
	const [ selectedSurvey, setSelectedSurvey ] = useState({});
	const [ idApt, setIdApt ] = useState();
	const { state: { userId } } = useContext(AuthContext);
	const { loading, error, data, refetch, fetchMore } = useQuery(SURVEYPATIENT_QUERY, {
		variables: {
			idPatient: userId,
			cursor: null,
			limit: 2
		}
	});

	// const data = {
	// 	patientSurvey: {
	// 		edges: [
	// 			{
	// 				surveys: [
	// 					{
	// 						selected: {
	// 							reason: true,
	// 							healthProfile: true,
	// 							oxygen: true,
	// 							symptoms: true,
	// 							temperature: true
	// 						},
	// 						results: {
	// 							reasonForVisit: '',
	// 							symptomTime: '',
	// 							symptomTimeUnit: '',
	// 							isTakingMeds: '',
	// 							hasDrugAllergies: '',
	// 							oxygenSaturation: '',
	// 							temperature: '',
	// 							tempUnit: '',
	// 							otherInfo: '',
	// 							symptoms: [],
	// 							medConditions: []
	// 						},
	// 						hasResult: false,
	// 						id: 'sadas',
	// 						isNewForDoctor: false
	// 					},
	// 					{
	// 						selected: {
	// 							reason: false,
	// 							healthProfile: false,
	// 							oxygen: false,
	// 							symptoms: true,
	// 							temperature: true
	// 						},
	// 						results: {
	// 							reasonForVisit: '',
	// 							symptomTime: '',
	// 							symptomTimeUnit: '',
	// 							isTakingMeds: '',
	// 							hasDrugAllergies: '',
	// 							oxygenSaturation: '',
	// 							temperature: '',
	// 							tempUnit: '',
	// 							otherInfo: '',
	// 							symptoms: [],
	// 							medConditions: []
	// 						},
	// 						hasResult: true,
	// 						id: 'sadasdfg',
	// 						isNewForDoctor: false
	// 					}
	// 				],
	// 				appointmentTimeStart: '2021-02-01T06:30:00.000Z',
	// 				profileHCPid: {
	// 					firstName: 'Peach',
	// 					lastName: 'Pizza'
	// 				},
	// 				accountHCPid: {
	// 					profilePicture:
	// 						'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
	// 				},
	// 				appointmentTimeEnd: '2021-02-01T07:00:00.000Z',
	// 				status: ''
	// 			},
	// 			{
	// 				surveys: [
	// 					{
	// 						selected: {
	// 							reason: true,
	// 							healthProfile: true,
	// 							oxygen: true,
	// 							symptoms: true,
	// 							temperature: true
	// 						},
	// 						results: {
	// 							reasonForVisit: '',
	// 							symptomTime: '',
	// 							symptomTimeUnit: '',
	// 							isTakingMeds: '',
	// 							hasDrugAllergies: '',
	// 							oxygenSaturation: '',
	// 							temperature: '',
	// 							tempUnit: '',
	// 							otherInfo: '',
	// 							symptoms: [],
	// 							medConditions: []
	// 						},
	// 						hasResult: false,
	// 						id: 'sadas',
	// 						isNewForDoctor: false
	// 					},
	// 					{
	// 						selected: {
	// 							reason: false,
	// 							healthProfile: false,
	// 							oxygen: false,
	// 							symptoms: true,
	// 							temperature: true
	// 						},
	// 						results: {
	// 							reasonForVisit: '',
	// 							symptomTime: '',
	// 							symptomTimeUnit: '',
	// 							isTakingMeds: '',
	// 							hasDrugAllergies: '',
	// 							oxygenSaturation: '',
	// 							temperature: '',
	// 							tempUnit: '',
	// 							otherInfo: '',
	// 							symptoms: [],
	// 							medConditions: []
	// 						},
	// 						hasResult: true,
	// 						id: 'sadasdfg',
	// 						isNewForDoctor: false
	// 					}
	// 				],
	// 				appointmentTimeStart: '2021-02-01T06:30:00.000Z',
	// 				profileHCPid: {
	// 					firstName: 'Peach',
	// 					lastName: 'Pizza'
	// 				},
	// 				accountHCPid: {
	// 					profilePicture:
	// 						'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
	// 				},
	// 				appointmentTimeEnd: '2021-02-01T07:00:00.000Z',
	// 				status: ''
	// 			},
	// 			{
	// 				surveys: [
	// 					{
	// 						selected: {
	// 							reason: false,
	// 							healthProfile: true,
	// 							oxygen: false,
	// 							symptoms: false,
	// 							temperature: false
	// 						},
	// 						results: {
	// 							reasonForVisit: '',
	// 							symptomTime: '',
	// 							symptomTimeUnit: '',
	// 							isTakingMeds: '',
	// 							hasDrugAllergies: '',
	// 							oxygenSaturation: '',
	// 							temperature: '',
	// 							tempUnit: '',
	// 							otherInfo: '',
	// 							symptoms: [],
	// 							medConditions: []
	// 						},
	// 						hasResult: false,
	// 						id: 'sasadas',
	// 						isNewForDoctor: false
	// 					}
	// 				],
	// 				appointmentTimeStart: '2021-02-08T06:30:00.000Z',
	// 				profileHCPid: {
	// 					firstName: 'Pear',
	// 					lastName: 'Fruit'
	// 				},
	// 				accountHCPid: {
	// 					profilePicture:
	// 						'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
	// 				},
	// 				appointmentTimeEnd: '2021-02-08T07:00:00.000Z',
	// 				status: ''
	// 			}
	// 		]
	// 	}
	// };
	console.log('data', data);
	const classes = useStyles();
	const { t } = useTranslation();

	return (
		<Grid className={classes.root} container>
			<Grid item className={classes.header}>
				<Typography className={classes.title} variant="h5">
					{t('SURVEYS.1')}
				</Typography>
			</Grid>
			{loading && (
				<Container className={classes.emptyState}>
					<Loader type="TailSpin" color="primary" height={80} width={80} />
				</Container>
			)}
			{error && <ErrorMessage />}

			{/* IF DATA */}
			{data ? (
				<div>
					{data.patientSurvey.edges.map((apt) => {
						return apt.surveys.map((survey, i) => {
							return (
								<PaperCustomShadow
									style={{ backgroundColor: `${!survey.hasResult && '#D7FEF1'}` }}
									className={classes.paper}
									key={i}
								>
									<Grid container className={classes.wrapper}>
										<Grid item md={3} sm={4} xs={12}>
											<div className={classes.name}>
												<Avatar
													className={classes.avatar}
													alt={apt.profileHCPid.lastName}
													src={apt.accountHCPid.profilePicture}
												/>
												Dr. {apt.profileHCPid.lastName}
											</div>
										</Grid>
										<Grid item md={2} sm={4} xs={6}>
											{formatDateShort(apt.appointmentTimeStart)}
										</Grid>
										<Grid item md={2} sm={4} xs={6}>
											{convertTime(apt.appointmentTimeStart)} -{' '}
											{convertTime(apt.appointmentTimeEnd)}
										</Grid>
										<Grid item md={3} sm={6} xs={6}>
											<Typography>
												{survey.selected.reason && 'Reason for visit'}{' '}
												{survey.selected.symptoms && 'Symptoms'}{' '}
												{survey.selected.healthProfile && 'Health Profile'}{' '}
												{survey.selected.oxygen && 'Oxygen'}{' '}
												{survey.selected.temperature && 'Temperature'}
											</Typography>
										</Grid>
										<Grid item md={2} sm={6} xs={6} className={classes.iconsWrapper}>
											{survey.hasResult ? (
												<Tooltip title="You already answered this survey">
													<span>
														<IconButton disabled>
															<EditIcon />
														</IconButton>
													</span>
												</Tooltip>
											) : (
												<Tooltip title="Answer survey">
													<IconButton
														onClick={() => {
															setIsDialogCompleteOpen(true);
															setSelectedSurvey(survey);
															setIdApt(apt._id);
														}}
														target="_blank"
														color="primary"
													>
														<EditIcon />
													</IconButton>
												</Tooltip>
											)}
											{survey.hasResult ? (
												<Tooltip title="Result sent">
													<CheckCircleOutlineIcon
														color="primary"
														className={classes.checkIcon}
													/>
												</Tooltip>
											) : (
												<Tooltip title="Please answer this survey">
													<ErrorOutlineIcon className={classes.errorIcon} />
												</Tooltip>
											)}
										</Grid>
									</Grid>
								</PaperCustomShadow>
							);
						});
					})}
					<DialogCompleteSurvey
						isOpen={isDialogCompleteOpen}
						refetch={refetch}
						selectedSurvey={selectedSurvey}
						idApt={idApt}
						close={() => {
							setIsDialogCompleteOpen(false);
							setSelectedSurvey({});
						}}
					/>
					{data.patientSurvey.pageInfo.hasNextPage && (
						<ButtonNoBorder
							className={classes.buttonLoadMore}
							onClick={() => {
								const { endCursor } = data.patientSurvey.pageInfo;
								fetchMore({
									variables: {
										id: userId,
										limit: 2,
										cursor: endCursor
									},
									updateQuery: (prevResult, { fetchMoreResult }) => {
										console.log('prev', prevResult);
										console.log('fetch', fetchMoreResult);
										fetchMoreResult.patientSurvey.edges = [
											...prevResult.patientSurvey.edges,
											...fetchMoreResult.patientSurvey.edges
										];
										return fetchMoreResult;
									}
								});
							}}
						>
							Load More <ExpandMoreIcon />
						</ButtonNoBorder>
					)}
				</div>
			) : (
				<EmptySurveyState />
			)}
		</Grid>
	);
};

export default TabSurveys;
