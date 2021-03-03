import { gql } from '@apollo/client';

const DOCUMENTS_QUERY = gql`
	query GetAppointments($idPatient: ID!, $cursor: String, $limit: Int) {
		patientDocuments(idPatient: $idPatient, cursor: $cursor, limit: $limit) {
			edges {
				profileHCPid {
					_id
					firstName
					lastName
				}
				_id
				appointmentTimeStart
				appointmentTimeEnd
				profilePatientid
				accountHCPid {
					profilePicture
				}
				amount
				patientDoc {
					name
					document
				}
			}
			pageInfo {
				endCursor
				hasNextPage
			}
			totalCount
		}
	}
`;

const MYAPPOINTMENTS_QUERY = gql`
	query GetAppointments($id: ID!) {
		patientAppointmentsForUpload(id: $id) {
			_id
			appointmentTimeStart
			profileHCPid {
				firstName
				lastName
			}
			accountHCPid {
				profilePicture
			}
		}
	}
`;

const LASTAPPOINTMENT_DOCTOR_QUERY = gql`
	query GetAppointments($id: ID!, $cursor: String, $limit: Int) {
		lastAppointmentsDoctor(id: $id, cursor: $cursor, limit: $limit) {
			edges {
				profileHCPid
				_id
				appointmentTimeStart
				appointmentTimeEnd
				amount
				reasonForVisit
				profilePatientid {
					_id
					firstName
					lastName
				}
				accountPatientid {
					_id
					profilePicture
					username
				}
			}
			pageInfo {
				endCursor
				hasNextPage
			}
			totalCount
		}
	}
`;

const LASTAPPOINTMENT_PATIENT_QUERY = gql`
	query GetAppointments($id: ID!, $cursor: String, $limit: Int) {
		lastAppointmentsPatient(id: $id, cursor: $cursor, limit: $limit) {
			edges {
				profilePatientid
				_id
				appointmentTimeStart
				appointmentTimeEnd
				amount
				reasonForVisit
				profileHCPid {
					_id
					firstName
					lastName
					rating {
						averageRating
						receivedRating
					}
				}
				accountHCPid {
					_id
					profilePicture
					username
				}
			}
			pageInfo {
				endCursor
				hasNextPage
			}
			totalCount
		}
	}
`;

const APPOINTMENTS_QUERY_TESTDIALOG = gql`
	query GetAppointments($idHCP: ID!, $idPatient: ID!) {
		appointmentDocUploadLabTest(idHCP: $idHCP, idPatient: $idPatient) {
			accountPatientid {
				profilePicture
				username
			}
			_id
			appointmentTimeEnd
			appointmentTimeStart
			profilePatientid {
				_id
				firstName
				lastName
				phoneNumber
			}
			amount
		}
	}
`;

const APPOINTMENTS_QUERY_PRESCDIALOG = gql`
	query GetAppointments($idHCP: ID!, $idPatient: ID!) {
		appointmentDocAndPatient(idHCP: $idHCP, idPatient: $idPatient) {
			accountPatientid {
				profilePicture
				username
			}
			_id
			appointmentTimeEnd
			appointmentTimeStart
			profilePatientid {
				_id
				firstName
				lastName
				phoneNumber
			}
			amount
		}
	}
`;

const APPOINTMENTS_QUERY_DOCLIST = gql`
	query GetAppointments(
		$date: String!
		$typeOfHCP: String!
		$maxPrice: Float!
		$minPrice: Float!
		$rating: Float!
		$gender: Int!
		$time: String!
		$limit: Int
		$cursor: ID
	) {
		searchAppointments(
			date: $date
			typeOfHCP: $typeOfHCP
			minPrice: $minPrice
			maxPrice: $maxPrice
			gender: $gender
			rating: $rating
			time: $time
			limit: $limit
			cursor: $cursor
		) {
			edges {
				firstname
				lastname
				image
				profileInfo
				rating {
					averageRating
					receivedRating
				}
				id
				minPrice
				appointments {
					amount
					idApt
					start
					end
					id
				}
			}
			totalCount
			pageInfo {
				endCursor
				hasNextPage
			}
		}
	}
`;

const REVIEW_QUERY = gql`
	query GetReview($id: ID!) {
		doctorReviewCard(id: $id) {
			profileHCPid {
				rating {
					averageRating
					receivedRating
				}
			}
			amount
		}
	}
`;

const SURVEY_QUERY = gql`
	query GetAppointments($idHCP: ID!, $idPatient: ID!) {
		doctorSurvey(idHCP: $idHCP, idPatient: $idPatient) {
			profileHCPid,
			_id,
			appointmentTimeStart,
			appointmentTimeEnd,
			amount,
			reasonForVisit,
			profilePatientid {
				firstName
				lastName
			},
			accountPatientid {
				profilePicture
			},
			survey {
				_id
				selected {
					reason,
					healthProfile,
					oxygen,
					symptoms,
					temperature
				},
				results {
					reasonForVisit,
					symptomTime,
					symptomTimeUnit,
					isTakingMeds,
					hasDrugAllergies,
					oxygenSaturation,
					temperature,
					tempUnit,
					otherInfo,
					symptoms {
						difficultySleeping,
						fatigue,
						fever,
						lossOfAppetite,
						moodChanges,
						nightSweats,
						weightChange,
						congestion,
						difficultySwallowing,
						earDrainage,
						earPain,
						eyeRedness,
						noseBleed,
						soreThroat,
						headache,
						hearingLoss,
						nasalDischarge,
						chestPain,
						cough,
						decreasedExerciseTolerance,
						palpitations,
						shortnessOfBreath,
						phlegm,
						wheezing,
						abdominalPain,
						bloodInStool,
						constipation,
						diarrhea,
						heartburn,
						nausea,
						bloodInUrine,
						discomfortUrination,
						frequentUrination,
						irregularPeriods,
						vaginalBleeding,
						vaginalDischarge,
						dizzy,
						lossOfConsciousness,
						memoryLoss,
						numbness,
						tremors,
						visionChanges,
						bites,
						bleeding,
						bruising,
						itching,
						skinRashes,
						sores,
						swelling,
						backPain,
						jointStiffness,
						limitedMobility,
						musclePain,
						muscleWeakness,
						muscleSwelling
					},
					medConditions {
						abnormalThyroid,
						anxiety,
						arthritis,
						asthma,
						cancer,
						cronicKidneyDisease,
						chronicPain,
						COPD,
						depression,
						diabetes,
						foreignTravel,
						heartDisease,
						hemophilia,
						highBloodPressure,
						highCholesterol,
						historyOfFainting,
						historyOfFalls,
						historyOfSkinCancer,
						historyOfSTD,
						historyOfStroke,
						hospitalized,
						insomnia,
						ironDeficiency,
						jointReplacement,
						nicotineDependance,
						obesity,
						prediabetes,
						pregnant,
						rheumatoidArthritis,
						seasonalAllergies,
						substanceAbuse
					}
				},
				hasResult,
				isNewForDoctor
			}
		}
	}
`;
const SURVEYPATIENT_QUERY = gql`
	query GetAppointments($idPatient: ID!) {
		patientSurvey(idPatient: $idPatient) {
			profilePatientid,
			_id,
			appointmentTimeStart,
			appointmentTimeEnd,
			amount,
			reasonForVisit,
			profileHCPid {
				firstName
				lastName
			},
			accountHCPid {
				profilePicture
			},
			survey {
				_id
				selected {
					reason,
					healthProfile,
					oxygen,
					symptoms,
					temperature
				},
				results {
					reasonForVisit,
					symptomTime,
					symptomTimeUnit,
					isTakingMeds,
					hasDrugAllergies,
					oxygenSaturation,
					temperature,
					tempUnit,
					otherInfo,
					symptoms {
						difficultySleeping,
						fatigue,
						fever,
						lossOfAppetite,
						moodChanges,
						nightSweats,
						weightChange,
						congestion,
						difficultySwallowing,
						earDrainage,
						earPain,
						eyeRedness,
						noseBleed,
						soreThroat,
						headache,
						hearingLoss,
						nasalDischarge,
						chestPain,
						cough,
						decreasedExerciseTolerance,
						palpitations,
						shortnessOfBreath,
						phlegm,
						wheezing,
						abdominalPain,
						bloodInStool,
						constipation,
						diarrhea,
						heartburn,
						nausea,
						bloodInUrine,
						discomfortUrination,
						frequentUrination,
						irregularPeriods,
						vaginalBleeding,
						vaginalDischarge,
						dizzy,
						lossOfConsciousness,
						memoryLoss,
						numbness,
						tremors,
						visionChanges,
						bites,
						bleeding,
						bruising,
						itching,
						skinRashes,
						sores,
						swelling,
						backPain,
						jointStiffness,
						limitedMobility,
						musclePain,
						muscleWeakness,
						muscleSwelling
					},
					medConditions {
						abnormalThyroid,
						anxiety,
						arthritis,
						asthma,
						cancer,
						cronicKidneyDisease,
						chronicPain,
						COPD,
						depression,
						diabetes,
						foreignTravel,
						heartDisease,
						hemophilia,
						highBloodPressure,
						highCholesterol,
						historyOfFainting,
						historyOfFalls,
						historyOfSkinCancer,
						historyOfSTD,
						historyOfStroke,
						hospitalized,
						insomnia,
						ironDeficiency,
						jointReplacement,
						nicotineDependance,
						obesity,
						prediabetes,
						pregnant,
						rheumatoidArthritis,
						seasonalAllergies,
						substanceAbuse
					}
				},
				hasResult,
				isNewForDoctor
			}
		}
	}
`;

export {
	LASTAPPOINTMENT_DOCTOR_QUERY,
	MYAPPOINTMENTS_QUERY,
	DOCUMENTS_QUERY,
	LASTAPPOINTMENT_PATIENT_QUERY,
	APPOINTMENTS_QUERY_TESTDIALOG,
	APPOINTMENTS_QUERY_PRESCDIALOG,
	APPOINTMENTS_QUERY_DOCLIST,
	REVIEW_QUERY,
	SURVEY_QUERY,
	SURVEYPATIENT_QUERY
};
