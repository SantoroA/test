import React from 'react';
import Search from '../../components/groups/FormFindDoctor'
import DoctorFilter from '../../components/groups/DoctorFilter'
import DoctorCard from '../../components/groups/DoctorCard'

const DoctorSearch = () => {
	
	return (
		<div>
			<Search/>
            <DoctorFilter/>
            <DoctorCard/>
		</div>
	);
};

export default DoctorSearch;
