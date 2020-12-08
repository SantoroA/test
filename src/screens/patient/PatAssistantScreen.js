import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
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
				<div>
					<Navbar />
					<FormWhoIsPatient
						step
						nextStep={nextStep}
						previousStep={previousStep}
						isMainPatient={isMainPatient}
						setIsMainPatient={setIsMainPatient}
					/>
				</div>
			);
		case 2:
			return (
				<div>
					<Navbar />
					<FormUserInsurance
						step
						nextStep={nextStep}
						previousStep={previousStep}
						insuranceType={insuranceType}
						setInsuranceType={setInsuranceType}
					/>
				</div>
			);
		case 3:
			return (
				<div>
					<Navbar />
					<FormUserReason
						step
						nextStep={nextStep}
						previousStep={previousStep}
						reasonForVisit={reasonForVisit}
						setReasonForVisit={setReasonForVisit}
					/>
				</div>
			);
		case 4:
			return (
				<div>
					<Navbar />
					<FormUserRecommendation step nextStep={nextStep} previousStep={previousStep} />
				</div>
			);

		default:
			return (
				<div>
					<Navbar />
					<FormUserRecommendation />
				</div>
			);
	}
};

export default PatAssistantScreen;
