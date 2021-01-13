import React, { useState } from 'react';
import PatLayoutContainer from '../../components/layout/PatLayoutContainer';

import FormUserReason from '../../components/groups/FormUserReason';
import FormUserInsurance from '../../components/groups/FormUserInsurance';
import FormWhoIsPatient from '../../components/groups/FormWhoIsPatient';
import FormUserRecommendation from '../../components/groups/FormUserRecommendation';

const PatAssistantScreen = () => {
	const [ step, setStep ] = useState(1);
	const [ isMainPatient, setIsMainPatient ] = useState(true);
	const [ insuranceType, setInsuranceType ] = useState('');
	const [ reasonForVisit, setReasonForVisit ] = useState('');

	const nextStep = () => {
		setStep(step + 1);
	};

	const previousStep = () => {
		setStep(step - 1);
	};

	switch (step) {
		case 1:
			return (
				<PatLayoutContainer>
					<FormWhoIsPatient
						step
						nextStep={nextStep}
						previousStep={previousStep}
						isMainPatient={isMainPatient}
						setIsMainPatient={setIsMainPatient}
					/>
				</PatLayoutContainer>
			);
		case 2:
			return (
				<PatLayoutContainer>
					<FormUserInsurance
						step
						nextStep={nextStep}
						previousStep={previousStep}
						insuranceType={insuranceType}
						setInsuranceType={setInsuranceType}
					/>
				</PatLayoutContainer>
			);
		case 3:
			return (
				<PatLayoutContainer>
					<FormUserReason
						step
						nextStep={nextStep}
						previousStep={previousStep}
						reasonForVisit={reasonForVisit}
						setReasonForVisit={setReasonForVisit}
					/>
				</PatLayoutContainer>
			);
		case 4:
			return (
				<PatLayoutContainer>
					<FormUserRecommendation step nextStep={nextStep} previousStep={previousStep} />
				</PatLayoutContainer>
			);

		default:
			return (
				<PatLayoutContainer>
					<FormUserRecommendation />
				</PatLayoutContainer>
			);
	}
};

export default PatAssistantScreen;
