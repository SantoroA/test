import React from 'react';
import Navbar from '../../components/layout/Navbar';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';
import Search from '../../components/groups/FormFindDoctor'


const PatDoctorSearchScreen = () => {
	const [selectedDate, setSelectedDate] = React.useState(new Date());
	
	return (
		<div>
			<Navbar />
			<Typography variant="h4">Find your health professional now.</Typography>
			<Typography variant="h6">Without any Location Barrier</Typography>
			<Search/>

			
			Calendar
			Card
		</div>
	);
};

export default PatDoctorSearchScreen;




     
